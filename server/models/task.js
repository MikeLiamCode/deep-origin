class Task {
  constructor(id, type, schedule, taskData, status, executedAt = null) {
    this.id = id;
    this.type = type;
    this.schedule = schedule;
    this.taskData = taskData;
    this.status = status;
    this.executedAt = executedAt;
  }
}

module.exports = Task;
