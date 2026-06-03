import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Inventory } from '../../domain/supplier';

import {
  FilterInventoryDto,
  SortInventoryDto,
} from '../../dto/query-supplier.dto';

export abstract class InventoryRepository {
  abstract create(
    data: Omit<Inventory, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Inventory>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterInventoryDto | null;
    sortOptions?: SortInventoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Inventory[]>;

  abstract findById(id: Inventory['id']): Promise<NullableType<Inventory>>;
  abstract findByIds(ids: Inventory['id'][]): Promise<Inventory[]>;

  abstract update(
    id: Inventory['id'],
    payload: DeepPartial<Inventory>,
  ): Promise<Inventory | null>;

  abstract remove(id: Inventory['id']): Promise<void>;
}
