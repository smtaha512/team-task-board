import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/task.repository';
import { UpdateTaskRequestBodyDto } from './update-task.request.body.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TaskRepository) private readonly repository: TaskRepository,
  ) {}

  async execute(id: string, update: UpdateTaskRequestBodyDto) {
    const task = await this.repository.findTaskByIdOrFail(id);

    task.updateTitle(update.title);
    task.updateDescription(update.description);

    await this.repository.updateTask(task);
  }
}
