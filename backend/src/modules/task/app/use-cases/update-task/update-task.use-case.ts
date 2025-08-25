import { Inject, Injectable } from '@nestjs/common';
import { ColumnRepository } from '../../../../column/domain/column.repository';
import { TaskRepository } from '../../../domain/task.repository';
import { UpdateTaskRequestBodyDto } from './dtos/update-task.request.body.dto';
import { UpdateTaskResponseBodyDto } from './dtos/update-task.response.body.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TaskRepository) private readonly repository: TaskRepository,
    @Inject(ColumnRepository)
    private readonly columnRepository: ColumnRepository,
  ) {}

  async execute(
    id: string,
    update: UpdateTaskRequestBodyDto,
  ): Promise<UpdateTaskResponseBodyDto> {
    const task = await this.repository.findTaskByIdOrFail(id);

    task.updateTitle(update.title);
    task.updateDescription(update.description);

    if (update.columnId) {
      const column = await this.columnRepository.findColumnByIdOrFail(
        update.columnId,
      );

      task.addToColumn(column);
    }

    const updatedTask = await this.repository.updateTask(task);

    return UpdateTaskResponseBodyDto.create(updatedTask);
  }
}
