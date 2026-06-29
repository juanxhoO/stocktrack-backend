import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterProductDto,
  SortProductDto,
} from '../../../../dto/query-product.dto';
import { Product } from '../../../../domain/product';
import { ProductRepository } from '../../product.repository';
import { ProductMapper } from '../mappers/product.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductsRelationalRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly categoriesRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const newEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const where: FindOptionsWhere<ProductEntity> = {};
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

    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async findById(id: Product['id']): Promise<NullableType<Product>> {
    const entity = await this.categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Product['id'][]): Promise<Product[]> {
    const entities = await this.categoriesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async update(id: Product['id'], payload: Partial<Product>): Promise<Product> {
    const entity = await this.categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Category not found');
    }

    const updatedEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }

  async remove(id: Product['id']): Promise<void> {
    await this.categoriesRepository.softDelete(id);
  }
}
