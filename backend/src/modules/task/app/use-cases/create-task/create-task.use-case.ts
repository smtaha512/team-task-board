import { Inject, Injectable } from '@nestjs/common';
import { ColumnRepository } from '../../../../column/domain/column.repository';
import { TaskRepository } from '../../../domain/task.repository';
import { CreateTaskRequestBodyDto } from './dtos/create-task.request.body.dto';
import { CreateTaskResponseBodyDto } from './dtos/create-task.response.body.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TaskRepository) private readonly repository: TaskRepository,
    @Inject(ColumnRepository)
    private readonly columnRepository: ColumnRepository,
  ) {}

  async execute(
    dto: CreateTaskRequestBodyDto,
  ): Promise<CreateTaskResponseBodyDto> {
    const column = await this.columnRepository.findColumnByIdOrFail(
      dto.columnId,
    );

    const task = CreateTaskRequestBodyDto.toDomain(dto);

    task.addToColumn(column);

    const savedTask = await this.repository.createTask(task);

    return CreateTaskResponseBodyDto.create(savedTask);
  }
}
