const { TaskStorageService } = require('./taskStorageService');

class TaskExecutionService {
  constructor() {
    this.taskStorageService = new TaskStorageService();
  }

  async executeTask(task) {
    task.status = 'executed';
    task.executedAt = new Date().toISOString();

    await this.taskStorageService.updateTask(task);
  }
}

module.exports = { TaskExecutionService };
