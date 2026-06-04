import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
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
  address?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: '+1 555-1234',
    description: 'Warehouse phone',
  })
  @IsString()
  @IsOptional()
  phone?: string | null;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
