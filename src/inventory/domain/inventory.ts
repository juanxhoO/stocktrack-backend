import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Inventory {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The ID of the product this inventory movement is for',
  })
  productId: number;

  @ApiProperty({
    type: String,
    example: 'IN',
    description: 'Type of movement (IN, OUT, ADJUSTMENT, RETURN)',
  })
  type: string;

  @ApiProperty({
    type: Number,
    example: 50,
    description: 'Amount of stock moved. Positive for IN/ADJUSTMENT, negative for OUT',
  })
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'PO-10023',
    description: 'Optional reference number like a Purchase Order or Sales Order ID',
    required: false,
  })
  reference?: string | null;

  @ApiProperty({
    type: String,
    example: 'Received new stock from supplier',
    required: false,
  })
  notes?: string | null;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID of the user who performed this inventory action',
    required: false,
  })
  userId?: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
