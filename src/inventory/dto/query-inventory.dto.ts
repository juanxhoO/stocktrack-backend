import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Inventory } from '../domain/inventory';

export class FilterInventoryDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string | null;
}

export class SortInventoryDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Inventory;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryInventoryDto {
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
    value ? plainToInstance(FilterInventoryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterInventoryDto)
  filters?: FilterInventoryDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortInventoryDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortInventoryDto)
  sort?: SortInventoryDto[] | null;
}
