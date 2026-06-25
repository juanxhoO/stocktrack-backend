import { Inventory } from '../../../../domain/inventory';
import { InventoryEntity } from '../entities/inventory.entity';

export class InventoryMapper {
  static toDomain(raw: InventoryEntity): Inventory {
    const domainEntity = new Inventory();
    domainEntity.id = raw.id;
    domainEntity.product = raw.product;
    domainEntity.quantity = raw.quantity;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Inventory): InventoryEntity {
    const persistenceEntity = new InventoryEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    //persistenceEntity.product = domainEntity.product;
    persistenceEntity.quantity = domainEntity.quantity;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
