import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CannotFindColumnException } from '../../../column/domain/exceptions/cannot-find-column.exceptions';
import { CreateTaskRequestBodyDto } from '../../app/use-cases/create-task/create-task.request.body.dto';
import { CreateTaskUseCase } from '../../app/use-cases/create-task/create-task.use-case';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({
    type: undefined,
    description: 'Task created successfully',
  })
  @ApiNotFoundResponse({
    type: CannotFindColumnException,
    description: 'Can not find column by provided `columnId`',
  })
  @Post('')
  createTask(@Body() task: CreateTaskRequestBodyDto) {
    return this.createTaskUseCase.execute(task);
  }
}
