import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParseIdPipe } from '../../../../shared/common/validation-pipes/parse-id.pipe';
import { CannotFindColumnException } from '../../../column/domain/exceptions/cannot-find-column.exceptions';
import { CreateTaskRequestBodyDto } from '../../app/use-cases/create-task/create-task.request.body.dto';
import { CreateTaskUseCase } from '../../app/use-cases/create-task/create-task.use-case';
import { UpdateTaskRequestBodyDto } from '../../app/use-cases/update-task/update-task.request.body.dto';
import { UpdateTaskUseCase } from '../../app/use-cases/update-task/update-task.use-case';
import { CannotFindTaskException } from '../../domain/exceptions/can-not-find-task.exception';
import { createTaskId } from '../../domain/task';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

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

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, example: createTaskId() })
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: undefined, description: 'Task updated successfully' })
  @ApiNotFoundResponse({
    type: CannotFindTaskException,
    description: 'Can not find task by provided `id`',
  })
  @Patch(':id')
  updateTask(
    @Param('id', ParseIdPipe) id: string,
    @Body() task: UpdateTaskRequestBodyDto,
  ): Promise<void> {
    return this.updateTaskUseCase.execute(id, task);
  }
}
