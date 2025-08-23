import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';
import { TaskTypeOrmEntity } from './task.typeorm.entity';

@Injectable()
export class TaskTypeOrmRepository extends TaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrmEntity)
    private readonly repository: Repository<TaskTypeOrmEntity>,
  ) {
    super();
  }

  async createTask(task: Task): Promise<void> {
    await this.repository.save(task);
  }
}
