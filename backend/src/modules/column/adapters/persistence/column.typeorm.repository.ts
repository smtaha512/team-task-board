import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from '../../domain/column';
import { ColumnRepository } from '../../domain/column.repository';
import { CannotFindColumnException } from '../../domain/exceptions/cannot-find-column.exceptions';
import { ColumnTypeOrmEntity } from './column.typeorm.entity';

@Injectable()
export class ColumnTypeOrmRepository extends ColumnRepository {
  constructor(
    @InjectRepository(ColumnTypeOrmEntity)
    private readonly repository: Repository<ColumnTypeOrmEntity>,
  ) {
    super();
  }

  async findAllColumns(): Promise<Column[]> {
    const columns = await this.repository.find();

    return columns.map((column) => ColumnTypeOrmEntity.toDomain(column));
  }

  async findColumnByIdOrFail(id: string): Promise<Column> {
    const column = await this.repository.findOne({ where: { id } });

    if (!column) {
      throw new CannotFindColumnException({ id });
    }

    return ColumnTypeOrmEntity.toDomain(column);
  }
}
