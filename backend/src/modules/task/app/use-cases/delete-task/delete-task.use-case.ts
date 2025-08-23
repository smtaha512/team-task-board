import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(id: string) {
    await this.repository.deleteTask(id);
  }
}
