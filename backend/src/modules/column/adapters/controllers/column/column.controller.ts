import { Controller, Get } from '@nestjs/common';
import { FetchColumnsUseCase } from '../../../app/use-cases/fetch-columns.use-cae';

@Controller('/boards/columns')
export class ColumnController {
  constructor(private readonly fetchColumnsUseCase: FetchColumnsUseCase) {}
  @Get('')
  fetchColumns() {
    return this.fetchColumnsUseCase.execute();
  }
}
