import { Task } from './task';

export abstract class TaskRepository {
  abstract createTask(task: Task): Promise<Task>;
  abstract findTaskByIdOrFail(id: string): Promise<Task>;
  abstract updateTask(task: Task): Promise<Task>;
  abstract deleteTask(id: string): Promise<void>;
  abstract listAllTasks(): Promise<Task[]>;
}
