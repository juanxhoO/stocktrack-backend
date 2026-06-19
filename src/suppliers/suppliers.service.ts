import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterSupplierDto, SortSupplierDto } from './dto/query-supplier.dto';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';
import { Supplier } from './domain/supplier';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly supplierRepository: SupplierRepository,
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    // Do not remove comment below.
    // <creating-property />

    return this.supplierRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createSupplierDto.name,
      email: createSupplierDto.email,
      phone: createSupplierDto.phone,
      address: createSupplierDto.address,
      contactPerson: createSupplierDto.contactPerson,
      taxId: createSupplierDto.taxId,
      country: createSupplierDto.country,
      state: createSupplierDto.state,
      city: createSupplierDto.city,
      zipcode: createSupplierDto.zipcode,
      observations: createSupplierDto.observations,
      isActive: createSupplierDto.isActive ?? true,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSupplierDto | null;
    sortOptions?: SortSupplierDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Supplier[]> {
    return this.supplierRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Supplier['id']): Promise<NullableType<Supplier>> {
    return this.supplierRepository.findById(id);
  }

  findByIds(ids: Supplier['id'][]): Promise<Supplier[]> {
    return this.supplierRepository.findByIds(ids);
  }

  async update(
    id: Supplier['id'],
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier | null> {
    // Do not remove comment below.
    // <updating-property />

    return this.supplierRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateSupplierDto.name,
      email: updateSupplierDto.email,
      phone: updateSupplierDto.phone,
      address: updateSupplierDto.address,
      contactPerson: updateSupplierDto.contactPerson,
      taxId: updateSupplierDto.taxId,
      country: updateSupplierDto.country,
      state: updateSupplierDto.state,
      city: updateSupplierDto.city,
      zipcode: updateSupplierDto.zipcode,
      observations: updateSupplierDto.observations,
      isActive: updateSupplierDto.isActive,
    });
  }

  async remove(id: Supplier['id']): Promise<void> {
    await this.supplierRepository.remove(id);
  }
}
