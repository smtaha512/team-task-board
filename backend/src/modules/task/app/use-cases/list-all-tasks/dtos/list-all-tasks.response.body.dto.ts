import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../../../domain/task';

export class ListAllTasksResponseBodyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  columnId: string;

  static create(task: Task): ListAllTasksResponseBodyDto {
    return {
      columnId: task.columnId,
      description: task.description,
      id: task.id,
      title: task.title,
    } satisfies ListAllTasksResponseBodyDto;
  }
}
