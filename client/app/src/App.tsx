import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskLog from './components/TaskLog'
import { Task } from './types'
import api from './services/api'
import styles from './App.module.css'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const latestTasks = useRef<Task[]>([])

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks')
      const newTasks = response.data

      newTasks.forEach((newTask: Task) => {
        const existingTask = latestTasks.current.find(
          task => task.id === newTask.id
        )
        if (
          newTask.status === 'executed' &&
          (!existingTask || existingTask.executedAt !== newTask.executedAt)
        ) {
          if (newTask.executedAt) {
            const executedDate = new Date(newTask.executedAt)
            const readableDate = executedDate.toLocaleString()
            toast(`Task ${newTask.id} executed at ${readableDate}`)
          } else {
            toast(`Task ${newTask.id} executed but no timestamp provided`)
          }
        }
      })

      latestTasks.current = newTasks
      setTasks(newTasks)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      toast.error('Failed to fetch task updates.')
    }
  }

  useEffect(() => {
    fetchTasks()
    const interval = setInterval(fetchTasks, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='App'>
      <h1 className={styles.mainTitle}>Distributed Task Scheduler</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <div className={styles.taskContainer}>
        <TaskList tasks={tasks.filter(task => task.status !== 'executed')} />
        <TaskLog tasks={tasks.filter(task => task.status === 'executed')} />
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
