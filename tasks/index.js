import taskService from "./task-service.js";

const textInput = document.querySelector('.text-input');
const btnAdd = document.querySelector('.btn-add');
const containerNewTask = document.querySelector('.container-new-task');
const errorMessage = document.querySelector('.error-message');
const taskList = document.querySelector('.task-list');
const taskItemTemplate = document.getElementById('template-task-list');
const btnTotalTasks = document.querySelector('.total-tasks');
const btnCompleteTasks = document.querySelector('.complete-tasks');
const btnIncompleteTasks = document.querySelector('.incomplete-tasks');
let isValidTask = false;

const updateTaskCounters = (tasks) => {
    btnTotalTasks.textContent = `Total Tasks: ${tasks.length}`;
    const completedTasks = tasks.filter(task => task.completed).length;
    btnCompleteTasks.textContent = `Completed Tasks: ${completedTasks}`;
    btnIncompleteTasks.textContent = `Incomplete Tasks: ${tasks.length - completedTasks}`;
}

const renderTasks = (tasks) => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const clone = taskItemTemplate.content.cloneNode(true);
        const li = clone.querySelector('li');
        li.id = task.id;

        const taskText = li.querySelector('p');
        const checkBtn = li.querySelector('check');
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add('completed-task');
            checkBtn.classList.add('check');
        };
        taskList.append(li);
    });
    updateTaskCounters(tasks);
};

const handleStateInput = () => {
    if(isValidTask) {
        errorMessage.style.display = 'none';
        btnAdd.disabled = false;
    }else{
        errorMessage.style.display = 'inline-block';
        btnAdd.disabled = true;
    }
};

textInput.addEventListener('input', () => {
    isValidTask = textInput.value.trim() !== '';
    handleStateInput();
});

containerNewTask.addEventListener('submit', e => {
    e.preventDefault();
    if (!isValidTask) return;
    const tasks = taskService.addTask({text: textInput.value});
    renderTasks(tasks);
    textInput.value = ''; 
    isValidTask = false;
    handleStateInput();
});

taskList.addEventListener('click', e => {
    const deletedBtn = e.target.closest('.delete');
    const checkBtn = e.target.closest('.check');

    if (deletedBtn) {
        const li = deletedBtn.parentElement;
        const updatedTasks = taskService.removeTask(li.id);
        renderTasks(updatedTasks);
    }

    if (checkBtn) {
        const li = checkBtn.parentElement;
        const updatedTasks = taskService.checkTask(li.id);
        renderTasks(updatedTasks);
    }
});

window.onload = () => {
    const tasks = taskService.getTasksFromBrowser();
    renderTasks(tasks);
};
