import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    type: String,
    example: 'Vendor',
    description: 'Supplier name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Vendor email',
    description: 'Supplier email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'Vendor contact person',
    description: 'Supplier contact person',
  })
  contactPerson: string | null;

  @ApiProperty({
    type: String,
    example: 'Vendor Address',
    description: 'Supplier address',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    type: String,
    example: 'Vendor Phone',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    example: 'Vendor Country',
  })
  @IsString()
  country: string;

  @ApiProperty({
    type: String,
    example: 'Vendor Tax ID',
    description: 'Supplier tax ID',
  })
  @IsString()
  taxId: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: 'Vendor State',
  })
  @IsString()

  state: string;

  @ApiProperty({
    type: String,
    example: 'Vendor City',
  })
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    example: 'Vendor zipcode',
  })
  @IsString()
  zipcode: string;

  @ApiProperty({
    type: String,
    example: 'Vendor observations',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations: string;
}
