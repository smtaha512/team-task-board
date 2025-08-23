import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/task.repository';
import { ListAllTasksResponseBodyDto } from './dtos/list-all-tasks.response.body.dto';

@Injectable()
export class ListAllTasksUseCase {
  constructor(
    @Inject(TaskRepository) private readonly repository: TaskRepository,
  ) {}

  async execute() {
    const tasks = await this.repository.listAllTasks();

    return tasks.map((task) => ListAllTasksResponseBodyDto.create(task));
  }
}
