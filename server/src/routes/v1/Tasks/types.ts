import { TaskDocument } from './model';

export interface TaskReturn {
  tasks: TaskDocument[];
  totalTask: number;
}