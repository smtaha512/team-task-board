import { Module } from '@nestjs/common';
import { ColumnController } from './adapters/controllers/column/column.controller';
import { FetchColumnsUseCase } from './app/use-cases/fetch-columns.use-cae';

const useCases = [FetchColumnsUseCase];

@Module({ providers: [...useCases], controllers: [ColumnController] })
export class ColumnModule {}
