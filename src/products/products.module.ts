import {
  // common
  Module,
} from '@nestjs/common';

import { CategoriesController } from './products.controller';
import { ProductsService } from './products.service';
import { RelationalProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalProductPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService, infrastructurePersistenceModule],
})
export class ProductsModule {}
