import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCategoryDto, SortCategoryDto } from './dto/query-category.dto';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { Category } from './domain/category';
import { FilesService } from '../files/files.service';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { Status } from '../statuses/domain/status';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoryRepository,
    private readonly filesService: FilesService,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Do not remove comment below.
    // <creating-property />

    let parent: Category | null = null;
    if (createCategoryDto.parent !== undefined && createCategoryDto.parent !== null) {
      parent = await this.categoriesRepository.findById(createCategoryDto.parent);
      if (!parent) {
        throw new BadRequestException('Parent Category does not exist');
      }
    }

    let slug: string | null = null;

    if (createCategoryDto.slug) {
      const categoryObject = await this.categoriesRepository.findBySlug(
        createCategoryDto.slug,
      );
      if (categoryObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
      slug = createCategoryDto.slug;
    }

    let photo: FileType | null | undefined = undefined;

    if (createCategoryDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        createCategoryDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (createCategoryDto.photo === null) {
      photo = null;
    }

    let status: Status | undefined = undefined;

    if (createCategoryDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createCategoryDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createCategoryDto.status.id,
      };
    }

    return this.categoriesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      slug: slug,
      parent: parent,
      photo: photo,
      status: status,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    return this.categoriesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Category['id']): Promise<NullableType<Category>> {
    return this.categoriesRepository.findById(id);
  }

  findByIds(ids: Category['id'][]): Promise<Category[]> {
    return this.categoriesRepository.findByIds(ids);
  }

  findBySlug(slug: Category['slug']): Promise<NullableType<Category>> {
    return this.categoriesRepository.findBySlug(slug);
  }

  async update(
    id: Category['id'],
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    // Do not remove comment below.
    // <updating-property />

    let slug: string | null | undefined = undefined;

    if (updateCategoryDto.slug) {
      const categoryObject = await this.categoriesRepository.findBySlug(
        updateCategoryDto.slug,
      );

      if (categoryObject && categoryObject.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }

      slug = updateCategoryDto.slug;
    } else if (updateCategoryDto.slug === null) {
      slug = null;
    }

    let parent: Category | null = null;
    parent = await this.categoriesRepository.findById(updateCategoryDto.parent);
    if (!parent) {
      throw new BadRequestException('Parent Category does not exist');
    }

    let photo: FileType | null | undefined = undefined;

    if (updateCategoryDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        updateCategoryDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (updateCategoryDto.photo === null) {
      photo = null;
    }

    let status: Status | undefined = undefined;

    if (updateCategoryDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateCategoryDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: updateCategoryDto.status.id,
      };
    }

    return this.categoriesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateCategoryDto.name,
      parent: parent,
      slug: slug,
      photo,
      status,
    });
  }

  async remove(id: Category['id']): Promise<void> {
    await this.categoriesRepository.remove(id);
  }
}
