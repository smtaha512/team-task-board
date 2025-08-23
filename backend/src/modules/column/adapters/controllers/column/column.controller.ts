import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FetchColumnsResponseBodyDto } from '../../../app/use-cases/dtos/fetch-columns.response.body.dto';
import { FetchColumnsUseCase } from '../../../app/use-cases/fetch-columns.use-case';

@ApiTags('columns')
@Controller('columns')
export class ColumnController {
  constructor(private readonly fetchColumnsUseCase: FetchColumnsUseCase) {}

  @ApiOperation({ summary: 'List tasks' })
  @ApiOkResponse({
    type: FetchColumnsResponseBodyDto,
    isArray: true,
    description: 'Tasks listed successfully',
  })
  @Get('')
  fetchColumns() {
    return this.fetchColumnsUseCase.execute();
  }
}
