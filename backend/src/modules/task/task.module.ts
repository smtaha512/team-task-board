import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnModule } from '../column/column.module';
import { TaskController } from './adapters/controllers/task.controller';
import { TaskTypeOrmEntity } from './adapters/persistence/task.typeorm.entity';
import { TaskTypeOrmRepository } from './adapters/persistence/task.typeorm.repository';
import { CreateTaskUseCase } from './app/use-cases/create-task/create-task.use-case';
import { TaskRepository } from './domain/task.repository';

const repositories: Provider[] = [
  { provide: TaskRepository, useClass: TaskTypeOrmRepository },
];
const useCases: Provider[] = [CreateTaskUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeOrmEntity]), ColumnModule],
  providers: [...repositories, ...useCases],
  controllers: [TaskController],
})
export class TaskModule {}
