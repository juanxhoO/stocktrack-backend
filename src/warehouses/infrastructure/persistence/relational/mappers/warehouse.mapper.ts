import { Warehouse } from '../../../../domain/warehouse';
import { WarehouseEntity } from '../entities/warehouse.entity';

export class WarehouseMapper {
  static toDomain(raw: WarehouseEntity): Warehouse {
    const domainEntity = new Warehouse();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    domainEntity.phone = raw.phone;
    domainEntity.city = raw.city;
    domainEntity.state = raw.state;
    domainEntity.zipcode = raw.zipcode;
    domainEntity.country = raw.country;
    domainEntity.isActive = raw.isActive;
    domainEntity.manager = raw.manager;
    domainEntity.capacity = raw.capacity;
    domainEntity.hasClimateControl = raw.hasClimateControl;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Warehouse): WarehouseEntity {
    const persistenceEntity = new WarehouseEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.phone = domainEntity.phone;
    persistenceEntity.city = domainEntity.city;
    persistenceEntity.state = domainEntity.state;
    persistenceEntity.zipcode = domainEntity.zipcode;
    persistenceEntity.country = domainEntity.country;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.capacity = domainEntity.capacity;
    persistenceEntity.hasClimateControl = domainEntity.hasClimateControl;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
