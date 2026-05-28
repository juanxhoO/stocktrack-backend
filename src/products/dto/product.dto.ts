import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    type: String,
    example: 'productId',
  })
  @IsNotEmpty()
  id: string | number;

  @ApiProperty({
    type: String,
    example: 'productName',
  })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({
    type: String,
    example: 'productDescription',
  })
  @IsNotEmpty()
  description: string | null;

  @ApiProperty({
    type: String,
    example: 'productPrice',
  })
  @IsNotEmpty()
  price: number;
}
