import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterCategoryDto,
  SortCategoryDto,
} from '../../../../dto/query-category.dto';
import { Category } from '../../../../domain/category';
import { CategoryRepository } from '../../category.repository';
import { CategoryMapper } from '../mappers/category.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CategoriesRelationalRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: Category): Promise<Category> {
    const persistenceModel = CategoryMapper.toPersistence(data);
    const newEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(persistenceModel),
    );
    return CategoryMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    const where: FindOptionsWhere<CategoryEntity> = {};
    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }

    const entities = await this.categoriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((category) => CategoryMapper.toDomain(category));
  }

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    const entity = await this.categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Category['id'][]): Promise<Category[]> {
    const entities = await this.categoriesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((category) => CategoryMapper.toDomain(category));
  }

  async findBySlug(slug: Category['slug']): Promise<NullableType<Category>> {
    if (!slug) return null;

    const entity = await this.categoriesRepository.findOne({
      where: { slug },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async update(
    id: Category['id'],
    payload: Partial<Category>,
  ): Promise<Category> {
    const entity = await this.categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Category not found');
    }

    const updatedEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(
        CategoryMapper.toPersistence({
          ...CategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CategoryMapper.toDomain(updatedEntity);
  }

  async remove(id: Category['id']): Promise<void> {
    if (id === null) {
      throw new Error('Category id cannot be null');
    }
    await this.categoriesRepository.softDelete(id);
  }
}
