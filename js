/* General Body and Starry Sky Background */
body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #000; color: #e0e0e0; margin: 0; padding: 10px; overflow-x: hidden; }
#starry-sky { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: black; z-index: -1; }
@keyframes twinkle { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }

/* Header */
header { display: flex; justify-content: space-between; align-items: center; padding: 0 20px; margin-bottom: 15px; }
.logo { font-size: 2em; font-weight: bold; color: #fff; text-shadow: 0 0 10px #007bff, 0 0 20px #007bff; }
#current-time { font-size: 2em; font-weight: bold; color: #fff; text-shadow: 0 0 8px #ffc107, 0 0 15px #ffc107; }

/* Progress Bar */
#progress-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; gap: 8px; }
#progress-text { font-size: 2.5em; font-weight: bold; color: #28a745; text-shadow: 0 0 8px #28a745; }
#progress-bar { width: 80%; max-width: 500px; height: 25px; background-color: rgba(255, 255, 255, 0.1); border-radius: 15px; overflow: hidden; border: 1px solid #444; }
#progress-bar-fill { width: 0%; height: 100%; background: linear-gradient(90deg, #28a745, #a2ffbd); border-radius: 15px; transition: width 0.5s ease; }
#progress-detail { font-size: 0.9em; color: #ccc; }

/* Task Input */
.add-task-container { display: flex; justify-content: center; margin-bottom: 20px; }
#task-input { padding: 12px; border: 2px solid #555; background-color: rgba(255, 255, 255, 0.1); color: #e0e0e0; border-radius: 6px; font-size: 16px; width: 90%; max-width: 400px; transition: all 0.3s; }
#task-input:focus { border-color: #007bff; background-color: rgba(255, 255, 255, 0.2); outline: none; }

/* Task Board */
.task-board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; padding-bottom: 120px; }
.task-column { border: 1px solid #444; padding: 10px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.5); backdrop-filter: blur(5px); transition: background-color 0.3s; }
.task-column h2 { text-align: center; color: #ffffff; margin-top: 0; margin-bottom: 15px; font-size: 1.1em; }
.tasks { min-height: 300px; padding: 5px; border-radius: 6px; transition: background-color 0.2s; }

/* Column-specific backgrounds */
#todo-column { background-color: rgba(44, 44, 44, 0.8); }
#inprogress-column { background-color: rgba(0, 50, 100, 0.6); }
#pending-column { background-color: rgba(100, 80, 0, 0.6); }
#done-column { background-color: rgba(0, 80, 20, 0.6); }

/* Trash Can */
#trash-can { position: fixed; bottom: -100px; left: 50%; transform: translateX(-50%); width: 300px; height: 80px; background-color: rgba(220, 53, 69, 0.5); border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; justify-content: center; align-items: center; color: #fff; transition: all 0.3s ease-in-out; z-index: 100; }
#trash-can.visible { bottom: 0; }
#trash-can.hover { background-color: rgba(220, 53, 69, 0.8); transform: translateX(-50%) scale(1.1); }
#trash-can span { font-size: 2em; margin-right: 10px; }

/* Footer Quote */
#quote-container { position: fixed; bottom: 10px; width: 100%; text-align: center; color: #aaa; z-index: -1; }
#quote-text { font-style: italic; margin: 0; }
#quote-author { font-weight: bold; margin: 5px 0 0; }

/* Individual Task & Modal (omitted for brevity, same as before) */
.task { background-color: rgba(58, 58, 58, 0.9); padding: 15px; border-radius: 6px; margin-bottom: 12px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.3); transition: all 0.2s; border-left: 5px solid transparent; }
.task:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.4); }
.task.dragging { opacity: 0.5; cursor: grabbing; }
.task.done > span { text-decoration: line-through; color: #888; }
.task .due-date { font-size: 0.9em; color: #aaa; margin-top: 8px; }
.task .memo-indicator { font-size: 0.8em; color: #00aaff; margin-top: 5px; }
.task[data-priority="high"] { border-left-color: #ff4d4d; }
.task[data-priority="medium"] { border-left-color: #ffc107; }
.task[data-priority="low"] { border-left-color: #28a745; }
.modal { position: fixed; z-index: 200; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; }
.modal-content { background: #2c2c2c; padding: 30px; border-radius: 8px; width: 90%; max-width: 450px; box-shadow: 0 5px 15px rgba(0,0,0,0.5); position: relative; }
.close-btn { position: absolute; top: 15px; right: 15px; color: #aaa; font-size: 28px; font-weight: bold; cursor: pointer; }
.close-btn:hover { color: #fff; }
.modal-content h2 { margin-top: 0; }
.modal-content label { display: block; margin-top: 15px; margin-bottom: 5px; color: #ccc; }
.modal-content input, .modal-content textarea, .modal-content select, .modal-content button { width: 100%; padding: 12px; box-sizing: border-box; border-radius: 6px; border: 1px solid #555; background-color: #3a3a3a; color: #e0e0e0; font-size: 16px; }
#save-task-btn { background-color: #007bff; margin-top: 20px; }
#save-task-btn:hover { background-color: #0056b3; }

/* Responsive Design for Mobile */
@media (max-width: 768px) {
    body { padding: 5px; }
    header { padding: 0 10px; }
    .logo { font-size: 1.5em; }
    #current-time { font-size: 1.5em; }
    #progress-text { font-size: 2em; }

    .task-board {
        display: flex; /* Use flexbox for horizontal layout */
        overflow-x: auto; /* Enable horizontal scrolling */
        overflow-y: hidden; /* Hide vertical scrollbar for the board */
        padding-bottom: 20px; /* Add some padding at the bottom */
        scroll-snap-type: x mandatory; /* Snap to columns */
    }

    .task-column {
        flex: 0 0 80%; /* Each column takes up 80% of the screen width */
        max-width: 300px;
        scroll-snap-align: center; /* Center the column on snap */
    }

    .tasks { min-height: calc(100vh - 350px); } /* Adjust height for viewport */
}
