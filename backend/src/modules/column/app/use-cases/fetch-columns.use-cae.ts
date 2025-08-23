import { Injectable } from '@nestjs/common';
import { FetchColumnsResponseBodyDto } from './dtos/fetch-columns.response.body.dto';

@Injectable()
export class FetchColumnsUseCase {
  constructor() {}

  execute() {
    return [...(new Array(3) as unknown[])].map((_, idx) =>
      FetchColumnsResponseBodyDto.create({
        id: idx.toString(),
        title: idx.toString(),
      }),
    );
  }
}
