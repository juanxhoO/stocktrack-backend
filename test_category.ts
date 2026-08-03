import { DataSource } from 'typeorm';
import { CategoryEntity } from './src/categories/infrastructure/persistence/relational/entities/category.entity';
import { StatusEntity } from './src/statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from './src/files/infrastructure/persistence/relational/entities/file.entity';
import { RoleEntity } from './src/roles/infrastructure/persistence/relational/entities/role.entity';

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [CategoryEntity, StatusEntity, FileEntity, RoleEntity],
  });
  await dataSource.initialize();
  const repo = dataSource.getRepository(CategoryEntity);
  const entities = await repo.find({
    relations: {
      parent: true,
    }
  });
  console.log('Entities with relations {parent: true}:', entities.map(e => Object.keys(e)));
  
  const entities2 = await repo.find({});
  console.log('Entities without explicitly specifying relations:', entities2.map(e => Object.keys(e)));
  
  await dataSource.destroy();
}
bootstrap();
