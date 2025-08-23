import { createId } from '../../../shared/utils/create-id';

export const createColumnId = createId('col');

export class Column {
  id: string;

  title: string;

  private constructor(column: Partial<Column>) {
    this.id = column.id ?? createColumnId();
    this.title = column.title ?? '';
  }

  static create(column: Partial<Column>) {
    return new Column({
      id: column.id,
      title: column.title,
    });
  }
}
