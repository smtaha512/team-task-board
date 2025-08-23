import { ApiProperty } from '@nestjs/swagger';
import { Column } from '../../../../domain/column';

export class FetchColumnsResponseBodyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  static create({ id, title }: Column): FetchColumnsResponseBodyDto {
    return { id, title } satisfies FetchColumnsResponseBodyDto;
  }
}
