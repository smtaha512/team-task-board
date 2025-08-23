import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnController } from './adapters/controllers/column/column.controller';
import { ColumnTypeOrmEntity } from './adapters/persistence/column.typeorm.entity';
import { ColumnTypeOrmRepository } from './adapters/persistence/column.typeorm.repository';
import { FetchColumnsUseCase } from './app/use-cases/fetch-columns.use-case';
import { ColumnRepository } from './domain/column.repository';

const repositories: Provider[] = [
  { provide: ColumnRepository, useClass: ColumnTypeOrmRepository },
];
const useCases: Provider[] = [FetchColumnsUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([ColumnTypeOrmEntity])],
  providers: [...repositories, ...useCases],
  controllers: [ColumnController],
  exports: [ColumnRepository],
})
export class ColumnModule {}
