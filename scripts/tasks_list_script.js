// tasks_list_script.js
// the js for tasks_list part only

document.addEventListener('DOMContentLoaded', () => {
    let tasksListModule =  document.getElementById("tasks_list");

    let task = document.createElement('div');
    task.className = "task_element";
    task.textContent = "Finish the tasks list part.";
    tasksListModule.appendChild(task);
});