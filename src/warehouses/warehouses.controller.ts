import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryWarehouseDto } from './dto/query-warehouse.dto';
import { Warehouse } from './domain/warehouse';
import { WarehousesService } from './warehouses.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Warehouses')
@Controller({
  path: 'warehouses',
  version: '1',
})
export class WarehousesController {
  constructor(private readonly warehouseService: WarehousesService) { }

  @ApiCreatedResponse({
    type: Warehouse,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseService.create(createWarehouseDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Warehouse),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryWarehouseDto,
  ): Promise<InfinityPaginationResponseDto<Warehouse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.warehouseService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Warehouse,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Warehouse['id']): Promise<NullableType<Warehouse>> {
    return this.warehouseService.findById(id);
  }


  @ApiOkResponse({
    type: Warehouse,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Warehouse['id'],
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse | null> {
    return this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: Warehouse['id']): Promise<void> {
    return this.warehouseService.remove(id);
  }
}
