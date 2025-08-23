import { Task } from './task';

export abstract class TaskRepository {
  abstract createTask(task: Task): Promise<void>;
  abstract findTaskByIdOrFail(id: string): Promise<Task>;
  abstract updateTask(task: Task): Promise<void>;
}
