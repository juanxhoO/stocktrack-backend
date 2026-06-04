import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { RelationalWarehousePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalWarehousePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [WarehousesController],
  providers: [WarehousesService],
  exports: [WarehousesService, infrastructurePersistenceModule],
})
export class WarehousesModule { }
