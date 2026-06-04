import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Warehouse } from '../domain/warehouse';

export class FilterWarehouseDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string | null;
}

export class SortWarehouseDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Warehouse;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryWarehouseDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterWarehouseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterWarehouseDto)
  filters?: FilterWarehouseDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortWarehouseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortWarehouseDto)
  sort?: SortWarehouseDto[] | null;
}
