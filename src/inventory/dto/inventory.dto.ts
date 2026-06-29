import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    type: String,
    example: 'categoryId',
  })
  @IsNotEmpty()
  id: string | number;
}
