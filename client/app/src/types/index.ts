export type TaskType = 'one-time' | 'recurring';

export interface Task {
  id: string;
  type: TaskType;
  schedule: string;
  taskData: string;
  status: string;
  executedAt?: string;
}
