import {
  // common
  Module,
} from '@nestjs/common';

import { InventoryController } from './inventory.controller';

import { InventoryService } from './inventory.service';
import { RelationalInventoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { ProductsModule } from '../products/products.module';

const infrastructurePersistenceModule = RelationalInventoryPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
    ProductsModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService, infrastructurePersistenceModule],
})
export class InventoryModule { }
