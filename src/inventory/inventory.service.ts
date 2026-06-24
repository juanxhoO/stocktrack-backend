import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { NullableType } from '../utils/types/nullable.type';
import {
  FilterInventoryDto,
  SortInventoryDto,
} from './dto/query-inventory.dto';
import { InventoryRepository } from './infrastructure/persistence/inventory.repository';
import { Inventory } from './domain/inventory';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly productsService: ProductsService,
  ) { }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    // Do not remove comment below.
    // <creating-property />

    const product = await this.productsService.findById(createInventoryDto.productId);
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }

    return this.inventoryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      type: createInventoryDto.type,
      quantity: createInventoryDto.quantity,
      reference: createInventoryDto.reference,
      notes: createInventoryDto.notes,
      product: product,
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
      type: updateInventoryDto.type,
      quantity: updateInventoryDto.quantity,
      reference: updateInventoryDto.reference,
      notes: updateInventoryDto.notes,
    });
  }

  async remove(id: Inventory['id']): Promise<void> {
    await this.inventoryRepository.remove(id);
  }
}
