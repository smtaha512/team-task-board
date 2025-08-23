import { Inject, Injectable } from '@nestjs/common';
import { ColumnRepository } from '../../domain/column.repository';
import { FetchColumnsResponseBodyDto } from './dtos/fetch-columns.response.body.dto';

@Injectable()
export class FetchColumnsUseCase {
  constructor(
    @Inject(ColumnRepository)
    private readonly columnRepository: ColumnRepository,
  ) {}

  async execute(): Promise<FetchColumnsResponseBodyDto[]> {
    const columns = await this.columnRepository.findAllColumns();

    return columns.map((column) => FetchColumnsResponseBodyDto.create(column));
  }
}
