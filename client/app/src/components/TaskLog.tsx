import React from 'react';
import { Task } from '../types';
import styles from './TaskLog.module.css';

interface TaskLogProps {
  tasks: Task[];
}

const TaskLog: React.FC<TaskLogProps> = ({ tasks }) => {
  return (
    <div className={styles.taskLog}>
      <h2 className={styles.title}>Task Execution Log</h2>
      <ul className={styles.taskList}>
        {tasks
          .filter((task) => task.status === 'executed')
          .map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskDetails}>
                <span className={styles.taskLabel}>Task ID:</span> {task.id}
              </div>
              <div className={styles.taskDetails}>
                <span className={styles.taskLabel}>Executed At:</span> {task.executedAt}
              </div>
              <div className={styles.taskDetails}>
                <span className={styles.taskLabel}>Data:</span> {task.taskData}
              </div>
              <div className={styles.taskDetails}>
                <span className={styles.taskLabel}>Status:</span> {task.status}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskLog;
