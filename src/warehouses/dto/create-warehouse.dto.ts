import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    type: String,
    example: 'Main Warehouse',
    description: 'Warehouse name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string | null;

  @ApiProperty({
    type: String,
    example: '+1 555-1234',
    description: 'Warehouse phone',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
