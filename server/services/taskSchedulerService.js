const { CronJob } = require('cron')
const { v4: uuidv4 } = require('uuid')
const { TaskStorageService } = require('./taskStorageService')
const { TaskExecutionService } = require('./taskExecutionService')
const Task = require('../models/task')

class TaskSchedulerService {
  cronJobs = new Map()

  constructor () {
    this.taskStorageService = new TaskStorageService()
    this.taskExecutionService = new TaskExecutionService()
  }

  async registerTask (type, schedule, taskData) {
    const taskId = uuidv4()
    const task = new Task(taskId, type, schedule, taskData, 'scheduled')
    await this.taskStorageService.saveTask(task)

    if (type === 'one-time') {
      this.scheduleOneTimeTask(task)
    } else if (type === 'recurring') {
      this.scheduleRecurringTask(task)
    }
  }

  scheduleOneTimeTask (task) {
    const now = new Date()
    const [hours, minutes] = task.schedule.split(':').map(Number)
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    )

    if (scheduledTime < now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const delay = scheduledTime.getTime() - now.getTime()

    setTimeout(async () => {
      await this.taskExecutionService.executeTask(task)
    }, delay)
  }

  scheduleRecurringTask (task) {
    try {
      const job = new CronJob(
        task.schedule,
        async () => { await this.taskExecutionService.executeTask(task) },
        null,
        true,
        'UTC'
      )

      job.start()
      this.cronJobs.set(task.id, job)
    } catch (error) {
      console.error(`Invalid cron expression for task ${task.id}:`, error)
    }
  }

  async runPendingTasks () {
    const tasks = await this.taskStorageService.getTasks()
    tasks.forEach(task => {
      if (task.status === 'scheduled') {
        if (task.type === 'one-time') {
          this.scheduleOneTimeTask(task)
        } else if (task.type === 'recurring') {
          this.scheduleRecurringTask(task)
        }
      }
    })
  }
}

module.exports = { TaskSchedulerService }
