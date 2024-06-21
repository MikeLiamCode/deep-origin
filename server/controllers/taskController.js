const { TaskSchedulerService } = require('../services/taskSchedulerService');
const { TaskStorageService } = require('../services/taskStorageService');

const taskSchedulerService = new TaskSchedulerService();
const taskStorageService = new TaskStorageService();

const registerTask = (req, res) => {
  const { type, schedule, taskData } = req.body;
  taskSchedulerService.registerTask(type, schedule, taskData);
  res.status(201).send('Task registered successfully');
};

const getTasks = async (req, res) => {
  const tasks = await taskStorageService.getTasks();
  res.status(200).json(tasks);
};

module.exports = { registerTask, getTasks };
