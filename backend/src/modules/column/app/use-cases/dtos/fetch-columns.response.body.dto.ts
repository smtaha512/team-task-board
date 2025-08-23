import { ApiProperty } from '@nestjs/swagger';

export class FetchColumnsResponseBodyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  static create({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): FetchColumnsResponseBodyDto {
    return { id, title } satisfies FetchColumnsResponseBodyDto;
  }
}
