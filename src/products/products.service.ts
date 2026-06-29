import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterProductDto, SortProductDto } from './dto/query-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/product';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Do not remove comment below.
    // <creating-property />

    let photo: FileType | null | undefined = undefined;

    if (createProductDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        createProductDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (createProductDto.photo === null) {
      photo = null;
    }

    return this.productsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      brand: createProductDto.brand,
      sku: createProductDto.sku,
      name: createProductDto.name,
      price: createProductDto.price,
      photo: photo,
      description: createProductDto.description,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    return this.productsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Product['id']): Promise<NullableType<Product>> {
    return this.productsRepository.findById(id);
  }

  findByIds(ids: Product['id'][]): Promise<Product[]> {
    return this.productsRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    // Do not remove comment below.
    // <updating-property />

    let photo: FileType | null | undefined = undefined;

    if (updateProductDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        updateProductDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (updateProductDto.photo === null) {
      photo = null;
    }

    return this.productsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateProductDto.name,
      price: updateProductDto.price,
      photo,
    });
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productsRepository.remove(id);
  }
}
