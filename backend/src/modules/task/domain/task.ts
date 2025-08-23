import { createId } from '../../../shared/utils/create-id';
import { Column } from '../../column/domain/column';

export const createTaskId = createId('tsk');

export class Task {
  id: string;

  description: string;

  title: string;

  columnId: string;

  column: Column;

  private constructor(task: Partial<Task>) {
    this.id = task.id ?? createTaskId();
    this.title = task.title ?? '';
    this.description = task.description ?? '';
  }

  static create(task: Partial<Task>) {
    return new Task({
      id: task.id,
      description: task.description,
      title: task.title,
    });
  }

  addToColumn(column: Column) {
    this.column = column;
    this.columnId = column.id;
  }

  updateTitle(title: string) {
    if (title === undefined) {
      return;
    }

    this.title = title;
  }

  updateDescription(description: string) {
    if (description === undefined) {
      return;
    }

    this.description = description;
  }
}
