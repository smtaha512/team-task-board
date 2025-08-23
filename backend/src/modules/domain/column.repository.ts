import { Column } from './column';

export abstract class ColumnRepository {
  abstract findAllColumns(): Promise<Column[]>;
}
