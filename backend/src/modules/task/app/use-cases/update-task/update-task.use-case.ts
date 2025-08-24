import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/task.repository';
import { UpdateTaskResponseBodyDto } from './dtos/update-task.response.body.dto';
import { UpdateTaskRequestBodyDto } from './update-task.request.body.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TaskRepository) private readonly repository: TaskRepository,
  ) {}

  async execute(
    id: string,
    update: UpdateTaskRequestBodyDto,
  ): Promise<UpdateTaskResponseBodyDto> {
    const task = await this.repository.findTaskByIdOrFail(id);

    task.updateTitle(update.title);
    task.updateDescription(update.description);

    const updatedTask = await this.repository.updateTask(task);

    return UpdateTaskResponseBodyDto.create(updatedTask);
  }
}
