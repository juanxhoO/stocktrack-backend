import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { FileDto } from '../../files/dto/file.dto';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({ example: 'Doe', type: String })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
