import { Account } from '@ACCOUNT/domain';
import { Product } from '@PRODUCT/domain';

export namespace IProductUsecase {
  export type FindOne = Pick<Product.Property, 'id'>;
  export type FindManyFilter = {
    readonly store_id?: string;
    readonly category?: string;
    readonly country?: string;
  };
  export type FindManyOrder = {
    /**
     * 현재 latest만 적용 가능
     */
    readonly order?: string;
  };
  export type Create = Pick<
    Product.Property,
    'name' | 'price' | 'description' | 'category' | 'country'
  >;
  export type Update = Partial<
    Pick<Product.Property, 'name' | 'country' | 'price' | 'description'>
  >;
}

export interface IProductUsecase {
  readonly findOne: (
    where: IProductUsecase.FindOne,
  ) => Promise<Product.PublicDetail>;
  readonly findMany: (
    where: IProductUsecase.FindManyFilter,
    order: IProductUsecase.FindManyOrder,
  ) => Promise<Product.Public[]>;
  readonly create: (
    account: Account.Public,
    dto: IProductUsecase.Create,
  ) => Promise<Product.PublicDetail>;
  readonly update: (
    account: Account.Public,
    where: Pick<Product.Property, 'id'>,
    update: IProductUsecase.Update,
  ) => Promise<Product.PublicDetail>;
  readonly remove: (
    account: Account.Public,
    where: Pick<Product.Property, 'id'>,
  ) => Promise<void>;
}
