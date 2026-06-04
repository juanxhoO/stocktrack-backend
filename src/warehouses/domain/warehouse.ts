import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Warehouse {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Main Warehouse',
    description: 'Warehouse name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  address?: string | null;

  @ApiProperty({
    type: String,
    example: '+1 555-1234',
    description: 'Warehouse phone',
    required: false,
  })
  phone?: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
  })
  isActive?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
