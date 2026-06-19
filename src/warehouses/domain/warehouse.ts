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
    example: 'Warehouse City',
  })
  city: string;


  @ApiProperty({
    type: String,
    example: 'Warehouse State',
  })
  state: string;

  @ApiProperty({
    type: String,
    example: 'Warehouse Country',
  })
  country: string

  @ApiProperty({
    type: String,
    example: 'Warehouse Zipcode',
  })
  zipcode?: string | null;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  address?: string | null;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Warehouse capacity',
    required: false,
  })
  capacity?: number | null;

  @ApiProperty({
    type: String,
    example: 'Warehouse manager',
    required: false,
  })
  manager?: string | null;

  @ApiProperty({
    type: Boolean,
    description: 'Warehouse has climate control',
    required: false,
  })
  hasClimateControl?: boolean;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Warehouse capacity',
    required: false,
  })
  availableCapacity?: number | null;

  @ApiProperty({
    type: String,
    example: '+1 555-1234',
    description: 'Warehouse phone',
    required: false,
  })
  phone?: string | null;

  @ApiProperty({
    type: Object,
    example: {
      latitude: '34.0522',
      longitude: '-118.2437',
    },
    description: 'Warehouse location',
    required: false,
  })
  location?: { latitude: number; longitude: number } | null;


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
