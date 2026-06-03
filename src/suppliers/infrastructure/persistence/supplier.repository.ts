import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Supplier } from '../../domain/supplier';

import {
  FilterSupplierDto,
  SortSupplierDto,
} from '../../dto/query-supplier.dto';

export abstract class SupplierRepository {
  abstract create(
    data: Omit<Supplier, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Supplier>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSupplierDto | null;
    sortOptions?: SortSupplierDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Supplier[]>;

  abstract findById(id: Supplier['id']): Promise<NullableType<Supplier>>;
  abstract findByIds(ids: Supplier['id'][]): Promise<Supplier[]>;

  abstract update(
    id: Supplier['id'],
    payload: DeepPartial<Supplier>,
  ): Promise<Supplier | null>;

  abstract remove(id: Supplier['id']): Promise<void>;
}
