import {
  // common
  Module,
} from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from './categories.service';
import { RelationalCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalCategoryPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, infrastructurePersistenceModule],
})
export class CategoriesModule {}
