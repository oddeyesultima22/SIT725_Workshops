let tasks = [];
let idCounter = 1;

module.exports = {
  getAllTasks: () => tasks,
  addTask: (taskText) => {
    const task = { id: idCounter++, text: taskText };
    tasks.push(task);
    return task;
  },
  deleteTask: (id) => {
    tasks = tasks.filter(task => task.id !== id);
  }
};
