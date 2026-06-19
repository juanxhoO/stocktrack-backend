import { Supplier } from '../../../../domain/supplier';
import { SupplierEntity } from '../entities/supplier.entity';

export class SupplierMapper {
  static toDomain(raw: SupplierEntity): Supplier {
    const domainEntity = new Supplier();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    domainEntity.email = raw.email;
    domainEntity.phone = raw.phone;
    domainEntity.contactPerson = raw.contactPerson;
    domainEntity.observations = raw.observations;
    domainEntity.isActive = raw.isActive;
    domainEntity.taxId = raw.taxId;
    domainEntity.country = raw.country;
    domainEntity.state = raw.state;
    domainEntity.city = raw.city;
    domainEntity.zipcode = raw.zipcode;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Supplier): SupplierEntity {
    const persistenceEntity = new SupplierEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.phone = domainEntity.phone;
    persistenceEntity.contactPerson = domainEntity.contactPerson;
    persistenceEntity.observations = domainEntity.observations;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.taxId = domainEntity.taxId;
    persistenceEntity.country = domainEntity.country;
    persistenceEntity.state = domainEntity.state;
    persistenceEntity.city = domainEntity.city;
    persistenceEntity.zipcode = domainEntity.zipcode;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
