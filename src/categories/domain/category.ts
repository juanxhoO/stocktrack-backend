import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../files/domain/file';
import { Status } from '../../statuses/domain/status';

const idType = Number;

export class Category {
  @ApiProperty({
    type: idType,
  })
  id: number | null;

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

  @ApiProperty({
    type: () => Category,
    nullable: true,
  })
  parent: Category | null;

  @ApiProperty({
    type: () => [Category],
    required: false,
  })
  children?: Category[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
