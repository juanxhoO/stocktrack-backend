import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Category } from '../domain/category';
import { RoleDto } from '../../roles/dto/role.dto';

export class FilterCategoryDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string | null;
}

export class SortCategoryDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Category;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCategoryDto {
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
    value ? plainToInstance(FilterCategoryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCategoryDto)
  filters?: FilterCategoryDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortCategoryDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCategoryDto)
  sort?: SortCategoryDto[] | null;
}
