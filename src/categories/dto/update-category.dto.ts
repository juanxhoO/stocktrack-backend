import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

import { Transform, Type } from 'class-transformer';
import { IsOptional, MinLength } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  slug?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(1)
  description?: string;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  name: string | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  @ApiPropertyOptional({
    type: Number,
    nullable: true,
  })
  @IsOptional()
  parent?: number | null;

  @ApiPropertyOptional({
    type: () => [String],
    required: false,
  })
  children?: string[];

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: () => RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;
}
