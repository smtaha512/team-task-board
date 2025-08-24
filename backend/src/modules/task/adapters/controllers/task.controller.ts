import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { CreateTaskUseCase } from '../../app/use-cases/create-task/create-task.use-case';
import { CreateTaskRequestBodyDto } from '../../app/use-cases/create-task/dtos/create-task.request.body.dto';
import { CreateTaskResponseBodyDto } from '../../app/use-cases/create-task/dtos/create-task.response.body.dto';
import { DeleteTaskUseCase } from '../../app/use-cases/delete-task/delete-task.use-case';
import { ListAllTasksResponseBodyDto } from '../../app/use-cases/list-all-tasks/dtos/list-all-tasks.response.body.dto';
import { ListAllTasksUseCase } from '../../app/use-cases/list-all-tasks/list-all-tasks.use-case';
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
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly listAllTasksUseCase: ListAllTasksUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({
    type: CreateTaskResponseBodyDto,
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

  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: String, example: createTaskId() })
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

  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: String, example: createTaskId() })
  @ApiOkResponse({ type: undefined, description: 'Task deleted successfully' })
  @Delete(':id')
  deleteTask(@Param('id', ParseIdPipe) id: string): Promise<void> {
    return this.deleteTaskUseCase.execute(id);
  }

  @ApiOperation({ summary: 'List tasks' })
  @ApiOkResponse({
    type: ListAllTasksResponseBodyDto,
    isArray: true,
    description: 'Tasks listed successfully',
  })
  @Get('')
  listAllTasks(): Promise<ListAllTasksResponseBodyDto[]> {
    return this.listAllTasksUseCase.execute();
  }
}
