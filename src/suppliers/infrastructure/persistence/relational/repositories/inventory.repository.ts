import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { InventoryEntity } from '../entities/inventory.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SortInventoryDto } from '../../../../dto/query-supplier.dto';
import { Inventory } from '../../../../domain/supplier';
import { InventoryRepository } from '../../inventory.repository';
import { InventoryMapper } from '../mappers/inventory.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class InventoryRelationalRepository implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async create(data: Inventory): Promise<Inventory> {
    const persistenceModel = InventoryMapper.toPersistence(data);
    const newEntity = await this.inventoryRepository.save(
      this.inventoryRepository.create(persistenceModel),
    );
    return InventoryMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortInventoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Inventory[]> {
    const where: FindOptionsWhere<InventoryEntity> = {};

    const entities = await this.inventoryRepository.find({
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

    return entities.map((inventory) => InventoryMapper.toDomain(inventory));
  }

  async findById(id: Inventory['id']): Promise<NullableType<Inventory>> {
    const entity = await this.inventoryRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? InventoryMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Inventory['id'][]): Promise<Inventory[]> {
    const entities = await this.inventoryRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((inventory) => InventoryMapper.toDomain(inventory));
  }

  async update(
    id: Inventory['id'],
    payload: Partial<Inventory>,
  ): Promise<Inventory> {
    const entity = await this.inventoryRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Inventory not found');
    }

    const updatedEntity = await this.inventoryRepository.save(
      this.inventoryRepository.create(
        InventoryMapper.toPersistence({
          ...InventoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return InventoryMapper.toDomain(updatedEntity);
  }

  async remove(id: Inventory['id']): Promise<void> {
    await this.inventoryRepository.softDelete(id);
  }
}
