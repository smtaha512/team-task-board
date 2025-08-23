import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CannotFindTaskException extends NotFoundException {
  @ApiProperty({
    example:
      'Cannot find task with criteria: {"id":"col_33eeaa3a-8f9e-4ad4-bdf3-358dd289ff3f"}',
  })
  message: string;

  @ApiProperty({ default: 'Not Found', enum: ['Not Found'] })
  error: 'Not Found';

  @ApiProperty({ default: HttpStatus.NOT_FOUND, enum: [HttpStatus.NOT_FOUND] })
  statusCode: HttpStatus.NOT_FOUND;

  constructor(readonly criteria: Record<'id', string>) {
    super(`Cannot find task with criteria: ${JSON.stringify(criteria)}`);
  }
}
