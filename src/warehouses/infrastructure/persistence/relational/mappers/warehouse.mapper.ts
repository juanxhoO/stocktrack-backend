import { Warehouse } from '../../../../domain/warehouse';
import { WarehouseEntity } from '../entities/warehouse.entity';

export class WarehouseMapper {
  static toDomain(raw: WarehouseEntity): Warehouse {
    const domainEntity = new Warehouse();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    domainEntity.phone = raw.phone;
    domainEntity.isActive = raw.isActive;
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
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
