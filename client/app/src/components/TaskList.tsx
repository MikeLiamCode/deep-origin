import React from 'react';
import { Task } from '../types';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>Scheduled Tasks</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <div className={styles.taskDetails}>
              <span className={styles.taskLabel}>Task ID:</span> {task.id}
            </div>
            <div className={styles.taskDetails}>
              <span className={styles.taskLabel}>Status:</span> {task.status}
            </div>
            <div className={styles.taskDetails}>
              <span className={styles.taskLabel}>Scheduled Time:</span> {task.schedule}
            </div>
            <div className={styles.taskDetails}>
              <span className={styles.taskLabel}>Data:</span> {task.taskData}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
