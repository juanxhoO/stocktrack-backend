import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

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
    type: Number,
    example: 10.99,
  })
  price: number;

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
