import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { CreateWarehouseDto } from './create-warehouse.dto';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @ApiPropertyOptional({
    type: String,
    example: 'Main Warehouse',
    description: 'The name of the warehouse',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    type: String,
    example: '+1 555-1234',
    description: 'Warehouse phone',
  })
  @IsString()
  @IsOptional()
  phone?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  zipcode?: string;

  @ApiPropertyOptional({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: String,
    example: 'Juan Perez',
    description: 'Warehouse manager name',
    required: false,
  })
  @IsString()
  @IsOptional()
  manager?: string;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    required: false,
  })
  @IsObject()
  @IsOptional()
  location?: {
    latitude: string;
    longitude: string;
  };
}
