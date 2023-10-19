let tasks = [];

const taskInput = document.getElementById("task-input");
const addTool = document.getElementById("add-tool");
const taskContent = document.querySelector(".task-content");
const tasksNum = document.querySelector(".tasks-num").children[0];
const tasksCompleted = document.querySelector(".tasks-completed").children[0];

// Check if tasks are stored in local storage and retrieve them
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    updateTasks();
}

// Set focus on the task input
window.onload = () => taskInput.focus();

addTool.onclick = function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        // Show a message if the task input is empty
        alert("You must create the task first, then click add.")
        displayMessage("You must create the task first, then click add.");
    } else {
        // Remove the "no task to show" message
        removeNoTaskMessage();

        // Add the task to the array and update local storage
        tasks.push({ text: taskText, completed: false });
        saveTasksToLocalStorage();
        updateTasks();

        // Clear the task input
        taskInput.value = "";

        // Set focus back on the input
        taskInput.focus();
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        deleteTask(e.target.parentElement.dataset.index);
    }

    if (e.target.classList.contains("task-text")) {
        toggleTaskCompletion(e.target.parentElement.dataset.index);
    }
});

function updateTasks() {
    taskContent.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskContent.appendChild(taskElement);
    });

    taskCount();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.index = index;

    if (task.completed) {
        taskElement.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('delete');

    const taskTextElement = document.createElement('p');
    taskTextElement.classList.add('task-text');
    taskTextElement.innerText = task.text;

    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(deleteBtn);

    return taskElement;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    updateTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    updateTasks();
}

function taskCount() {
    const completedTasks = tasks.filter(task => task.completed).length;
    tasksNum.innerText = tasks.length;
    tasksCompleted.innerText = completedTasks;
}

function displayMessage(message) {
    const popMsgEle = document.createElement("p");
    popMsgEle.innerHTML = message;
    popMsgEle.className = "pop-msg";
    taskContent.appendChild(popMsgEle);
    setTimeout(() => popMsgEle.remove(), 1500);
}

function removeNoTaskMessage() {
    const noTaskMessage = document.querySelector(".task-content .no-task-msg");
    if (noTaskMessage) {
        noTaskMessage.remove();
    }
}

function createNoTask() {
    const noTaskMessage = document.createElement("div");
    noTaskMessage.innerHTML = `No task to show`;
    noTaskMessage.classList.add("no-task-msg");
    taskContent.appendChild(noTaskMessage);
}