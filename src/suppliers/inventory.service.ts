import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-supplier.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterInventoryDto, SortInventoryDto } from './dto/query-supplier.dto';
import { InventoryRepository } from './infrastructure/persistence/inventory.repository';
import { Inventory } from './domain/supplier';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateInventoryDto } from './dto/update-supplier.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    // Do not remove comment below.
    // <creating-property />

    return this.inventoryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      productId: createInventoryDto.productId,
      type: createInventoryDto.type,
      quantity: createInventoryDto.quantity,
      reference: createInventoryDto.reference,
      notes: createInventoryDto.notes,
      userId: createInventoryDto.userId,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterInventoryDto | null;
    sortOptions?: SortInventoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Inventory[]> {
    return this.inventoryRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Inventory['id']): Promise<NullableType<Inventory>> {
    return this.inventoryRepository.findById(id);
  }

  findByIds(ids: Inventory['id'][]): Promise<Inventory[]> {
    return this.inventoryRepository.findByIds(ids);
  }

  async update(
    id: Inventory['id'],
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory | null> {
    // Do not remove comment below.
    // <updating-property />

    return this.inventoryRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      productId: updateInventoryDto.productId,
      type: updateInventoryDto.type,
      quantity: updateInventoryDto.quantity,
      reference: updateInventoryDto.reference,
      notes: updateInventoryDto.notes,
      userId: updateInventoryDto.userId,
    });
  }

  async remove(id: Inventory['id']): Promise<void> {
    await this.inventoryRepository.remove(id);
  }
}
