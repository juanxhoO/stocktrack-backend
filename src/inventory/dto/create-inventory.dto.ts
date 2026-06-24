import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The ID of the product this inventory movement is for',
  })
  productId: number | string;

  @ApiProperty({
    type: String,
    example: 'IN',
    description: 'Type of movement (IN, OUT, ADJUSTMENT, RETURN)',
  })
  type: string;

  @ApiProperty({
    type: Number,
    example: 50,
    description:
      'Amount of stock moved. Positive for IN/ADJUSTMENT, negative for OUT',
  })
  quantity: number | null;

  @ApiProperty({
    type: String,
    example: 'PO-10023',
    description:
      'Optional reference number like a Purchase Order or Sales Order ID',
  })
  reference?: string | null;

  @ApiProperty({
    type: String,
    example: 'Received new stock from supplier',
  })
  notes?: string | null;
}
