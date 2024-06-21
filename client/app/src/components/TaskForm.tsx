import React, { useState } from 'react'
import api from '../services/api'
import { TaskType } from '../types'
import { toast } from 'react-toastify'
import styles from './TaskForm.module.css'

interface TaskFormProps {
  fetchTasks: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ fetchTasks }) => {
  const [taskType, setTaskType] = useState<TaskType>('one-time')
  const [schedule, setSchedule] = useState('')
  const [taskData, setTaskData] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      taskType === 'recurring' &&
      !/^\s*(\*|([0-5]?\d))\s+(\*|1?\d|2[0-3])\s+(\*|([1-9]|[12]\d|3[01]))\s+(\*|(1[0-2]|0?[1-9]))\s+(\*|[0-6])\s*$/.test(
        schedule
      )
    ) {
      setError(
        'Invalid cron format. Please enter a valid cron syntax (min hr dom mon dow).'
      )
      return
    } else if (taskType === 'one-time' && !/^\d{1,2}:\d{2}$/.test(schedule)) {
      setError(
        'Invalid time format. Please enter a valid time (HH:MM) for one-time tasks.'
      )
      return
    }

    setError('')
    try {
      await api.post('/task', { type: taskType, schedule, taskData })
      fetchTasks()
      toast(`Task scheduled successfully!`)
    } catch (error) {
      setError('Failed to register task. Please try again.')
      toast.error(
        'Failed to schedule task. Please check the details and try again.'
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formGroup}>
        <label htmlFor='taskType' className={styles.label}>
          Task Type:
        </label>
        <select
          id='taskType'
          value={taskType}
          onChange={e => setTaskType(e.target.value as TaskType)}
          className={styles.select}
        >
          <option value='one-time'>One-Time</option>
          <option value='recurring'>Recurring</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='schedule' className={styles.label}>
          Schedule:
        </label>
        <input
          type='text'
          id='schedule'
          value={schedule}
          onChange={e => setSchedule(e.target.value)}
          placeholder={
            taskType === 'recurring'
              ? 'Enter cron (min hr dom mon dow)'
              : 'Enter time (HH:MM)'
          }
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='taskData' className={styles.label}>
          Task Data:
        </label>
        <input
          type='text'
          id='taskData'
          value={taskData}
          onChange={e => setTaskData(e.target.value)}
          placeholder='Enter task data'
          className={styles.input}
        />
      </div>
      <button type='submit' className={styles.button}>
        Register Task
      </button>
    </form>
  )
}

export default TaskForm
