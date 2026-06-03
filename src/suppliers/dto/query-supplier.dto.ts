import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Supplier } from '../domain/supplier';

export class FilterSupplierDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string | null;
}

export class SortSupplierDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Supplier;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QuerySupplierDto {
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
    value ? plainToInstance(FilterSupplierDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterSupplierDto)
  filters?: FilterSupplierDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortSupplierDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortSupplierDto)
  sort?: SortSupplierDto[] | null;
}
