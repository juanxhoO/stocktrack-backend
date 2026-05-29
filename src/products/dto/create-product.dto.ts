import {
  // decorators here
  Transform,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'product-name', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 100, type: Number })
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({ example: 'product-description', type: String })
  @IsOptional()
  description: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
