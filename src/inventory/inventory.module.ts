import {
  // common
  Module,
} from '@nestjs/common';

import { InventoryController } from './inventory.controller';

import { InventoryService } from './inventory.service';
import { RelationalInventoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalInventoryPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService, infrastructurePersistenceModule],
})
export class InventoryModule {}
