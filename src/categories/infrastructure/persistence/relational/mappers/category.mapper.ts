import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Category } from '../../../../domain/category';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryMapper {
  static toDomain(raw: CategoryEntity): Category {
    const domainEntity = new Category();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    if (raw.photo) {
      domainEntity.photo = FileMapper.toDomain(raw.photo);
    }
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Category): CategoryEntity {

    let photo: FileEntity | undefined | null = undefined;

    if (domainEntity.photo) {
      photo = new FileEntity();
      photo.id = domainEntity.photo.id;
      photo.path = domainEntity.photo.path;
    } else if (domainEntity.photo === null) {
      photo = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new StatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    const persistenceEntity = new CategoryEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.photo = photo;
    persistenceEntity.status = status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
