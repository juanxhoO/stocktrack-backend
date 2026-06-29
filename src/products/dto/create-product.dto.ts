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

  @ApiProperty({ example: 'brand-name', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'SKU123', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: ['id1', 'id2'], type: [String] })
  @IsOptional()
  categories?: string[];

  @ApiPropertyOptional({ example: 'product-description', type: String })
  @IsOptional()
  description: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
