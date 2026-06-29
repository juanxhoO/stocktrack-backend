import { FileType } from '../../files/domain/file';
import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Category {
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
    type: String,
    example: 'Category Description',
  })
  description: string | null;

  @ApiProperty({
    type: String,
    example: 'category-slug',
  })
  slug: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
