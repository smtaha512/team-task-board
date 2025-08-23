import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from '../../domain/column';
import { ColumnRepository } from '../../domain/column.repository';
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
}
