import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@PRODUCT/domain';
import { ProductRepository } from '@PRODUCT/infrastructure/adapter/product.repository';
import { IProductRepository } from '@PRODUCT/infrastructure/port/product.repository.port';
import { IProductService } from '../port/product.service.port';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async findOne({ id }: IProductService.FindOne): Promise<Product.Property> {
    const product = await this.productRepository.findOne({ id });
    return product == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : product;
  }
}
