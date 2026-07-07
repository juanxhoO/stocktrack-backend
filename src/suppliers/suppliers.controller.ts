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
import { CreateSupplierDto } from './dto/create-supplier.dto';
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
import { QuerySupplierDto } from './dto/query-supplier.dto';
import { Supplier } from './domain/supplier';
import { SuppliersService } from './suppliers.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Suppliers')
@Controller({
  path: 'suppliers',
  version: '1',
})
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @ApiCreatedResponse({
    type: Supplier,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.create(createSupplierDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Supplier),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QuerySupplierDto,
  ): Promise<InfinityPaginationResponseDto<Supplier>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.supplierService.findManyWithPagination({
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
    type: Supplier,
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
  findOne(@Param('id') id: Supplier['id']): Promise<NullableType<Supplier>> {
    return this.supplierService.findById(id);
  }

  @ApiOkResponse({
    type: Supplier,
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
    @Param('id') id: Supplier['id'],
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier | null> {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @ApiOkResponse({
    type: Supplier,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: Supplier['id']): Promise<void> {
    return this.supplierService.remove(id);
  }
}
