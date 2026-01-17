let taskList = [];

const saveInBrowser = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
};

const getTasksFromBrowser = () => {
    const tasksInJson = localStorage.getItem('taskList');
    taskList = JSON.parse(tasksInJson) ?? [];
    return taskList;
};

const addTask = (payload) => {
    const id = crypto.randomUUID();
    const newTask = {id, completed: false, ...payload};
    taskList = taskList.concat(newTask);
    saveInBrowser(); 
    return taskList;
};

const removeTask = (id) => {
    taskList = taskList.filter(task => task.id !== id);
    saveInBrowser(); 
    return taskList;
};

const checkTask = (id) => {
    taskList = taskList.map(task => {
        if (task.id === id) {
            return {...task, completed: !task.completed};
        }
            return task;
    });
    saveInBrowser();
    return taskList;
};

const taskService = {
    addTask,
    removeTask,
    checkTask,
    getTasksFromBrowser
};

export default taskService;