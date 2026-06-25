import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

import { IsOptional } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'The ID of the product this inventory movement is for',
  })
  @IsOptional()
  productId?: number;

  @ApiPropertyOptional({
    type: String,
    example: 'IN',
    description: 'Type of movement (IN, OUT, ADJUSTMENT, RETURN)',
  })
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    type: Number,
    example: 50,
    description:
      'Amount of stock moved. Positive for IN/ADJUSTMENT, negative for OUT',
  })
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    type: String,
    example: 'PO-10023',
    description:
      'Optional reference number like a Purchase Order or Sales Order ID',
  })
  @IsOptional()
  reference?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'Received new stock from supplier',
  })
  @IsOptional()
  notes?: string | null;
}
