import {
  Entity,
  JoinColumn,
  ManyToOne,
  Column as TypeOrmColumn,
} from 'typeorm';
import { BaseEntity } from '../../../../shared/database/base.entity';
import { ColumnTypeOrmEntity } from '../../../column/adapters/persistence/column.typeorm.entity';
import { Task } from '../../domain/task';

const tableName = 'task';

@Entity({ name: tableName })
export class TaskTypeOrmEntity extends BaseEntity(
  tableName,
)<TaskTypeOrmEntity> {
  @TypeOrmColumn({ nullable: false })
  title: string;

  @TypeOrmColumn({ nullable: true, type: 'text' })
  description: string;

  @TypeOrmColumn({ name: 'column_id' })
  columnId: string;

  @JoinColumn({
    name: 'column_id',
    foreignKeyConstraintName: 'FK_tasks_column',
  })
  @ManyToOne(() => ColumnTypeOrmEntity, (column) => column.tasks, {
    nullable: false,
  })
  column: ColumnTypeOrmEntity;

  static toDomain(task: TaskTypeOrmEntity): Task {
    return Task.create(task);
  }
}
