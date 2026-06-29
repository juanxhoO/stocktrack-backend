import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({
    type: String,
    example: 1,
    description: 'The ID of the product this inventory movement is for',
  })
  @IsString()
  product: string;

  @ApiProperty({
    type: String,
    example: 'IN',
    description: 'Type of movement (IN, OUT, ADJUSTMENT, RETURN)',
  })
  @IsString()
  type: string;

  @ApiProperty({
    type: Number,
    example: 50,
    description:
      'Amount of stock moved. Positive for IN/ADJUSTMENT, negative for OUT',
  })
  @IsNumber()
  quantity: number | null;

  @ApiProperty({
    type: String,
    example: 'PO-10023',
    description:
      'Optional reference number like a Purchase Order or Sales Order ID',
  })
  @IsString()
  reference?: string | null;

  @ApiProperty({
    type: String,
    example: 'Received new stock from supplier',
  })
  @IsString()
  @IsOptional()
  notes?: string | null;
}
