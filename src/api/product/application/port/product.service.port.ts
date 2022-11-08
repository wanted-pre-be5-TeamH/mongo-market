import { Product } from '@PRODUCT/domain';

export namespace IProductService {
  export type FindOne = Pick<Product.Property, 'id'>;
}

export interface IProductService {
  readonly findOne: (
    where: IProductService.FindOne,
  ) => Promise<Product.Property>;
}
