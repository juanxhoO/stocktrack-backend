import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';

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
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  country: string;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  city: string;


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
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  @IsOptional()
  zipcode?: string | null;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
    required: false,
  })
  @IsString()
  state: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;


  @ApiProperty({
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
