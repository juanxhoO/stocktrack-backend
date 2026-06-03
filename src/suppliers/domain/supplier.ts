import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Supplier {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Vendor',
    description: 'Supplier name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Vendor email',
    description: 'Supplier email',
  })
  email?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Address',
    description: 'Supplier address',
  })
  address?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Phone',
  })
  phone?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Country',
  })
  country?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Tax ID',
    description: 'Supplier tax ID',
  })
  taxId?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Currency',
    description: 'Supplier currency',
  })
  currency?: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive?: boolean;

  @ApiProperty({
    type: String,
    example: 'Vendor City',
  })
  city?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor State',
  })
  state?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Zipcode',
  })
  zipcode?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor observations',
    required: false,
  })
  observations?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
