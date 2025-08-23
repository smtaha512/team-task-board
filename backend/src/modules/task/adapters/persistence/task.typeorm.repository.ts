import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CannotFindTaskException } from '../../domain/exceptions/can-not-find-task.exception';
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

  async findTaskByIdOrFail(id: string): Promise<Task> {
    const task = await this.repository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!task) {
      throw new CannotFindTaskException({ id });
    }

    return TaskTypeOrmEntity.toDomain(task);
  }

  async updateTask(task: Task): Promise<void> {
    await this.repository.update({ id: task.id }, task);
  }
}
