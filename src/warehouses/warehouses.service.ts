import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterWarehouseDto, SortWarehouseDto } from './dto/query-warehouse.dto';
import { WarehouseRepository } from './infrastructure/persistence/warehouse.repository';
import { Warehouse } from './domain/warehouse';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(
    private readonly warehouseRepository: WarehouseRepository,
  ) { }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseRepository.create({
      name: createWarehouseDto.name,
      address: createWarehouseDto.address,
      phone: createWarehouseDto.phone,
      isActive: createWarehouseDto.isActive ?? true,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterWarehouseDto | null;
    sortOptions?: SortWarehouseDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Warehouse[]> {
    return this.warehouseRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Warehouse['id']): Promise<NullableType<Warehouse>> {
    return this.warehouseRepository.findById(id);
  }

  findByIds(ids: Warehouse['id'][]): Promise<Warehouse[]> {
    return this.warehouseRepository.findByIds(ids);
  }

  async update(
    id: Warehouse['id'],
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse | null> {
    return this.warehouseRepository.update(id, {
      name: updateWarehouseDto.name,
      address: updateWarehouseDto.address,
      phone: updateWarehouseDto.phone,
      isActive: updateWarehouseDto.isActive,
    });
  }

  async remove(id: Warehouse['id']): Promise<void> {
    await this.warehouseRepository.remove(id);
  }
}
