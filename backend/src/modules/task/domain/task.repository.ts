import { Task } from './task';

export abstract class TaskRepository {
  abstract createTask(task: Task): Promise<void>;
}
