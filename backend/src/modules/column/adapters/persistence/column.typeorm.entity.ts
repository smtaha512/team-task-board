import { Entity, Column as TypeOrmColumn } from 'typeorm';
import { BaseEntity } from '../../../../shared/database/base.entity';
import { Column } from '../../domain/column';

const tableName = 'column';

@Entity({ name: tableName })
export class ColumnTypeOrmEntity extends BaseEntity(
  tableName,
)<ColumnTypeOrmEntity> {
  @TypeOrmColumn({ nullable: false })
  title: string;

  static toDomain(column: ColumnTypeOrmEntity): Column {
    return Column.create(column);
  }
}
