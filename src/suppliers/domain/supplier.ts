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
    example: 'Vendor contact person',
    description: 'Supplier contact person',
  })
  contactPerson: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor email',
    description: 'Supplier email',
  })
  email: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Address',
    description: 'Supplier address',
  })
  address: string | null;

  @ApiProperty({
    type: String,
    example: '0999876654',
  })
  phone: string | null;

  @ApiProperty({
    type: String,
    example: 'Ecuador',
  })
  country: string | null;

  @ApiProperty({
    type: String,
    example: '24799812734',
    description: 'Supplier tax ID',
  })
  taxId: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: 'Guayaquil',
  })
  city: string | null;

  @ApiProperty({
    type: String,
    example: 'Guayas',
  })
  state: string | null;

  @ApiProperty({
    type: String,
    example: '090505',
  })
  zipcode: string | null;

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
