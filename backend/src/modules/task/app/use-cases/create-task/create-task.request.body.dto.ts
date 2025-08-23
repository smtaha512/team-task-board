import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsId } from '../../../../../shared/common/class-validators/is-id.validator';
import { createColumnId } from '../../../../column/domain/column';
import { Task } from '../../../domain/task';

export class CreateTaskRequestBodyDto {
  @ApiProperty({ example: 'custom task title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Porro odit cumque vitae dolore? 
    Libero repudiandae quos maiores impedit ex. 
    Quam nobis amet commodi iure tempore doloremque quidem ex consectetur at.`,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: createColumnId() })
  @IsId()
  @IsNotEmpty()
  columnId: string;

  static toDomain(dto: CreateTaskRequestBodyDto): Task {
    return Task.create(dto);
  }
}
