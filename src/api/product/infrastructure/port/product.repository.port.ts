import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { Product } from '@PRODUCT/domain';
import { HydratedDocument } from 'mongoose';
import { ProductEntity } from '../adapter/product.entity';

export namespace IProductRepository {
  export type Document = HydratedDocument<ProductEntity>;

  export type FindManyFilter = Partial<
    Pick<Product.Property, 'category' | 'country'> &
      Pick<Product.StoreEntity, 'id'>
  >;

  export type FindManyOrder = {
    order: 'latest' | 'oldest';
  };
}

export interface IProductRepository
  extends IBaseRepository<Product.Id, Product.Property> {
  findMany: (
    where?: IProductRepository.FindManyFilter,
    order?: IProductRepository.FindManyOrder,
  ) => Promise<Product.Property[]>;
}
