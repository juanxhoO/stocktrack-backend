import { Category } from '../../categories/domain/category';
import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

const idType = String;

export class Product {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Category Name',
  })
  name: string | null;

  @ApiProperty({
    type: () => Category,
  })
  categories?: Category[];

  @ApiProperty({
    type: Number,
    example: 10.99,
  })
  price: number;

  @ApiProperty({
    type: String,
    example: 'Brand Name',
  })
  brand: string | null;

  @ApiProperty({
    type: String,
    example: 'SKU',
  })
  sku: string | null;

  @ApiProperty({
    type: String,
    example: 'Category Description',
  })
  description: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
