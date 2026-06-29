import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category-slug', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  slug: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  name: string | null;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  description: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;
}
