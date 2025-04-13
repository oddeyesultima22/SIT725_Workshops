const TaskModel = require('../models/taskModel');

exports.getTasks = (req, res) => {
  res.json(TaskModel.getAllTasks());
};

exports.addTask = (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = TaskModel.addTask(task);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: 'Task content required' });
  }
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  TaskModel.deleteTask(id);
  res.status(204).end();
};
