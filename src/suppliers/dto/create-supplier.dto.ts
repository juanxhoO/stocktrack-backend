import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
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
  email: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Address',
    description: 'Supplier address',
  })
  address: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Phone',
  })
  phone: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Country',
  })
  country: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Tax ID',
    description: 'Supplier tax ID',
  })
  taxId: string | null;

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
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: 'Vendor City',
  })
  city: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor zipcode',
  })
  @IsString()
  @IsOptional()
  zipcode?: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor observations',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string | null;
}
