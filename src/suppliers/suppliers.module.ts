import {
  // common
  Module,
} from '@nestjs/common';

import { SuppliersController } from './suppliers.controller';

import { SuppliersService } from './suppliers.service';
import { RelationalSupplierPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalSupplierPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService, infrastructurePersistenceModule],
})
export class SuppliersModule { }
