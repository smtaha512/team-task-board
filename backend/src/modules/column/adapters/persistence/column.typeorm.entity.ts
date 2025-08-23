import { Entity, OneToMany, Column as TypeOrmColumn } from 'typeorm';
import { BaseEntity } from '../../../../shared/database/base.entity';
import { TaskTypeOrmEntity } from '../../../task/adapters/persistence/task.typeorm.entity';
import { Column } from '../../domain/column';

const tableName = 'column';

@Entity({ name: tableName })
export class ColumnTypeOrmEntity extends BaseEntity(
  tableName,
)<ColumnTypeOrmEntity> {
  @TypeOrmColumn({ nullable: false })
  title: string;

  @OneToMany(() => TaskTypeOrmEntity, (tasks) => tasks.column)
  tasks: TaskTypeOrmEntity[];

  static toDomain(column: ColumnTypeOrmEntity): Column {
    return Column.create(column);
  }
}
