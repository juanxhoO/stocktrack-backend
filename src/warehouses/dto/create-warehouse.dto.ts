import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsObject,
  IsArray,
} from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    type: String,
    example: 'Main Warehouse',
    description: 'Warehouse name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Array,
    example: ['sdsd2323-dsd1123-dsdsd'],
    description: 'Warehouse inventories ids to asssign',
    required: false,
  })
  @IsArray()
  @IsOptional()
  inventories: string[];

  @ApiProperty({
    type: String,
    example: '123456789',
    description: 'Warehouse manager id',
    required: false,
  })
  @IsString()
  @IsOptional()
  manager: string;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
  })
  @IsString()
  address: string;

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
  })
  @IsString()
  phone: string | null;

  @ApiProperty({
    type: String,
    example: '123 Warehouse St.',
    description: 'Warehouse address',
  })
  @IsString()
  zipcode: string;

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
  })
  @IsBoolean()
  isActive: boolean;

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
