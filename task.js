document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const taskInput = document.getElementById('task-input');
    const todoTasks = document.getElementById('todo-tasks');
    const columns = Array.from(document.querySelectorAll('.tasks'));
    const trashCan = document.getElementById('trash-can');
    const timeDisplay = document.getElementById('current-time');
    const progressText = document.getElementById('progress-text');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressDetail = document.getElementById('progress-detail');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    // --- Modal Elements ---
    const editModal = document.getElementById('edit-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const saveTaskBtn = document.getElementById('save-task-btn');
    const editTaskTitle = document.getElementById('edit-task-title');
    const editMemo = document.getElementById('edit-memo');
    const editDueDate = document.getElementById('edit-due-date');
    const editPriority = document.getElementById('edit-priority');
    let currentEditingTask = null;
    let draggedItem = null;

    // --- Inspirational Quotes ---
    const quotes = [
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
    ];
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = `"${quotes[randomIndex].text}"`;
        quoteAuthor.textContent = `- ${quotes[randomIndex].author}`;
    }

    // --- Starry Sky & Time ---
    function createStars() { /* ... */ }
    function updateTime() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    }
    createStars();
    setInterval(updateTime, 1000);
    updateTime();

    // --- Progress Calculation ---
    function updateProgress() {
        const doneTasks = document.querySelectorAll('#done-tasks .task').length;
        const totalTasks = document.querySelectorAll('.task').length - document.querySelectorAll('#pending-column .task').length;
        const percentage = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
        progressText.textContent = `${percentage}%`;
        progressBarFill.style.width = `${percentage}%`;
        progressDetail.textContent = `(完了: ${doneTasks} / 対象: ${totalTasks})`;
    }

    // --- Task Creation ---
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                const task = createTaskElement(taskText);
                todoTasks.appendChild(task);
                taskInput.value = '';
                updateProgress();
            }
        }
    });

    function createTaskElement(title, memo = '', dueDate = '', priority = 'low') {
        const task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('draggable', 'true');
        task.setAttribute('data-title', title);
        task.setAttribute('data-memo', memo);
        task.setAttribute('data-due-date', dueDate);
        task.setAttribute('data-priority', priority);
        updateTaskDisplay(task);
        addEventListeners(task);
        return task;
    }

    function updateTaskDisplay(task) {
        const title = task.getAttribute('data-title');
        const memo = task.getAttribute('data-memo');
        const dueDate = task.getAttribute('data-due-date');
        const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' }) : '期日未設定';
        task.innerHTML = `<span>${title}</span><div class="due-date">${formattedDueDate}</div>${memo ? `<div class="memo-indicator">📝 メモあり</div>` : ''}`;
    }

    // --- Event Listeners (Unified for Mouse and Touch) ---
    function addEventListeners(task) {
        task.addEventListener('click', () => openEditModal(task));

        // Mouse Events
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragend', handleDragEnd);

        // Touch Events
        task.addEventListener('touchstart', handleTouchStart, { passive: false });
        task.addEventListener('touchmove', handleTouchMove, { passive: false });
        task.addEventListener('touchend', handleTouchEnd);
    }

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        trashCan.classList.add('visible');
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        trashCan.classList.remove('visible');
        draggedItem = null;
        updateProgress();
    }

    let touchStartX, touchStartY;
    function handleTouchStart(e) {
        e.preventDefault();
        draggedItem = this;
        this.classList.add('dragging');
        trashCan.classList.add('visible');
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }

    function handleTouchMove(e) {
        if (!draggedItem) return;
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        draggedItem.style.transform = `translate(${x - touchStartX}px, ${y - touchStartY}px)`;

        const targetColumn = getColumnFromPoint(x, y);
        if (targetColumn && targetColumn !== draggedItem.parentElement) {
            const afterElement = getDragAfterElement(targetColumn, y);
            targetColumn.insertBefore(draggedItem, afterElement);
        }
    }

    function handleTouchEnd() {
        if (!draggedItem) return;
        draggedItem.style.transform = 'translate(0, 0)';
        this.classList.remove('dragging');
        trashCan.classList.remove('visible');
        
        const touch = event.changedTouches[0];
        const dropTarget = getColumnFromPoint(touch.clientX, touch.clientY);
        if (isOverTrash(touch.clientX, touch.clientY)) {
            draggedItem.remove();
        } else if (dropTarget) {
            draggedItem.classList.toggle('done', dropTarget.id === 'done-tasks');
        }
        draggedItem = null;
        updateProgress();
    }

    function getColumnFromPoint(x, y) {
        return columns.find(column => {
            const rect = column.getBoundingClientRect();
            return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        });
    }
    
    function isOverTrash(x, y) {
        const rect = trashCan.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    // --- Drag Over Logic for Columns ---
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            if (!draggedItem || draggedItem.parentElement === column) return;
            const afterElement = getDragAfterElement(column, e.clientY);
            column.insertBefore(draggedItem, afterElement);
            draggedItem.classList.toggle('done', column.id === 'done-tasks');
        });
    });

    // --- Trash Can Drop Logic ---
    trashCan.addEventListener('dragover', e => { e.preventDefault(); trashCan.classList.add('hover'); });
    trashCan.addEventListener('dragleave', () => trashCan.classList.remove('hover'));
    trashCan.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedItem) {
            draggedItem.remove();
            updateProgress();
        }
        trashCan.classList.remove('hover');
    });

    // --- Modal, Helpers, and Initial Load ---
    function openEditModal(task) { /* ... */ }
    function closeEditModal() { /* ... */ }
    function saveTaskChanges() { /* ... */ }
    function checkDueDate(task) { /* ... */ }
    function getDragAfterElement(column, y) { /* ... */ }
    function createStars() { /* ... */ }

    // Initial Load
    document.querySelectorAll('.task').forEach(addEventListeners);
    showRandomQuote();
    updateProgress();
});

// --- Standalone helper functions ---
// (These are simplified here for brevity but would be fully implemented as before)
function openEditModal(task) {
    // ... (implementation from previous step)
}
function closeEditModal() {
    // ... (implementation from previous step)
}
function saveTaskChanges() {
    // ... (implementation from previous step)
}
function checkDueDate(task) {
    // ... (implementation from previous step)
}
function getDragAfterElement(column, y) {
    const draggableElements = [...column.querySelectorAll('.task:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
        else return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
function createStars() {
    const sky = document.getElementById('starry-sky');
    if (!sky) return;
    const numStars = 200;
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'white';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animation = `twinkle ${Math.random() * 5 + 2}s linear infinite`;
        sky.appendChild(star);
    }
}