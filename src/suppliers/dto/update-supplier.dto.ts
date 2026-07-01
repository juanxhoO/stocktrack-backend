import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @ApiPropertyOptional({
    type: String,
    example: 1,
    description: 'The name of the supplier',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor contact person',
    description: 'Supplier contact person',
  })
  @IsString()
  @IsOptional()
  contactPerson?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'vendor@email.com',
    description: 'Supplier email',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    example: '555-555-5555',
    description: 'Supplier phone',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor Country',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor City',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor State',
  })
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor Zipcode',
  })
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor Tax ID',
  })
  @IsOptional()
  taxId?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Vendor Currency',
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
