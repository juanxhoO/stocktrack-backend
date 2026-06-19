import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SupplierDto {
  @ApiProperty({
    type: String,
    example: 'supplierId',
  })
  @IsNotEmpty()
  id: string | number;
}
