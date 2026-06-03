import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { SupplierEntity } from '../entities/supplier.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SortSupplierDto } from '../../../../dto/query-supplier.dto';
import { Supplier } from '../../../../domain/supplier';
import { SupplierRepository } from '../../supplier.repository';
import { SupplierMapper } from '../mappers/supplier.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierRelationalRepository implements SupplierRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) { }

  async create(data: Supplier): Promise<Supplier> {
    const persistenceModel = SupplierMapper.toPersistence(data);
    const newEntity = await this.supplierRepository.save(
      this.supplierRepository.create(persistenceModel),
    );
    return SupplierMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortSupplierDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Supplier[]> {
    const where: FindOptionsWhere<SupplierEntity> = {};

    const entities = await this.supplierRepository.find({
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

    return entities.map((supplier) => SupplierMapper.toDomain(supplier));
  }

  async findById(id: Supplier['id']): Promise<NullableType<Supplier>> {
    const entity = await this.supplierRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? SupplierMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Supplier['id'][]): Promise<Supplier[]> {
    const entities = await this.supplierRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((supplier) => SupplierMapper.toDomain(supplier));
  }

  async update(
    id: Supplier['id'],
    payload: Partial<Supplier>,
  ): Promise<Supplier> {
    const entity = await this.supplierRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Supplier not found');
    }

    const updatedEntity = await this.supplierRepository.save(
      this.supplierRepository.create(
        SupplierMapper.toPersistence({
          ...SupplierMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierMapper.toDomain(updatedEntity);
  }

  async remove(id: Supplier['id']): Promise<void> {
    await this.supplierRepository.softDelete(id);
  }
}
