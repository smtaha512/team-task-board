import { Column } from './column';

export abstract class ColumnRepository {
  abstract findAllColumns(): Promise<Column[]>;
  abstract findColumnByIdOrFail(id: string): Promise<Column>;
}
