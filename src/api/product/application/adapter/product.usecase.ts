import { Account } from '@ACCOUNT/domain';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@PRODUCT/domain';
import { ProductRepository } from '@PRODUCT/infrastructure/adapter/product.repository';
import { IProductRepository } from '@PRODUCT/infrastructure/port/product.repository.port';
import TSON from 'typescript-json';
import { IProductService } from '../port/product.service.port';
import { IProductUsecase } from '../port/product.usecase.port';
import { ProductService } from './product.service';

@Injectable()
export class ProductUsecase implements IProductUsecase {
  constructor(
    @Inject(ProductService)
    private readonly productService: IProductService,
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async findOne({
    id,
  }: IProductUsecase.FindOne): Promise<Product.PublicDetail> {
    const product = await this.productService.findOne({ id });
    return Product.getPublicDetail(product);
  }
  async findMany(
    { store_id, category, country }: IProductUsecase.FindManyFilter,
    order: IProductUsecase.FindManyOrder,
  ): Promise<Product.Public[]> {
    let where: IProductRepository.FindManyFilter = {};
    if (store_id) {
      where = { id: store_id };
    }
    if (TSON.is<Product.Category>(category)) {
      where = { ...where, category };
    }
    if (TSON.is<Product.Country>(country)) {
      where = { ...where, country };
    }
    const orderby: IProductRepository.FindManyOrder =
      TSON.is<IProductRepository.FindManyOrder>(order)
        ? order
        : { order: 'latest' };

    const products = await this.productRepository.findMany(where, orderby);
    return products.map(Product.getPublic);
  }
  async create(
    { store }: Account.Public,
    { name, description, category, country, price }: IProductUsecase.Create,
  ): Promise<Product.PublicDetail> {
    if (store == undefined) {
      return throwHttpException('403', ExceptionMessage.FBD);
    } else {
      return Product.getPublicDetail(
        await this.productRepository.save(
          Product.get({
            name,
            description,
            category,
            country,
            price,
            store,
          }),
        ),
      );
    }
  }

  async update(
    account: Account.Public,
    { id }: Pick<Product.Property, 'id'>,
    { name, description, country }: IProductUsecase.Update,
  ): Promise<Product.PublicDetail> {
    const product = await this.productService.findOne({ id });
    if (account.store?.id !== product.store.id) {
      throwHttpException('403', ExceptionMessage.FBD);
    }
    if (name) {
      Product.setName(product, { name });
    }
    if (country) {
      Product.setCountry(product, { country });
    }
    if (description) {
      Product.setDescription(product, { description });
    }
    return Product.getPublicDetail(await this.productRepository.save(product));
  }

  async remove(
    account: Account.Public,
    { id }: Pick<Product.Property, 'id'>,
  ): Promise<void> {
    const product = await this.findOne({ id });
    if (account.store?.id !== product.store.id) {
      throwHttpException('403', ExceptionMessage.FBD);
    }
    await this.productRepository.remove({ id });
    return;
  }
}
