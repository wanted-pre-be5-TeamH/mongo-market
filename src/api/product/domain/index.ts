import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { Store } from '@STORE/domain';

export namespace Product {
  export type Id = string;
  export type StoreEntity = Pick<Store.Property, 'id' | 'name'>;
  export type StoreEntityId = Store.Id;
  export type Category = 'hobby' | 'food' | 'electromics' | 'clothes';
  export type Country = 'Korea' | 'China' | 'Japan';
  export interface Property extends IBaseAggregate<Id> {
    /**
     * 상품명
     */
    readonly name: string;
    /**
     * 소속 가게 정보
     */
    readonly store: StoreEntity;
    /**
     * 상품 설명
     */
    readonly description: string;

    readonly category: Category;

    readonly country: Country;

    readonly price: number;
  }
  export type Public = Pick<
    Property,
    'id' | 'name' | 'price' | 'category' | 'country'
  >;
  export type PublicDetail = Pick<
    Property,
    'id' | 'name' | 'price' | 'category' | 'country' | 'description' | 'store'
  >;
}

type Required = keyof Pick<
  Product.Property,
  'name' | 'price' | 'description' | 'category' | 'country' | 'store'
>;

export interface Product {
  readonly get: (
    args: Pick<Product.Property, Required> &
      Partial<Omit<Product.Property, Required>>,
  ) => Product.Property;

  readonly getPublic: (agg: Product.Property) => Product.Public;
  readonly getPublicDetail: (agg: Product.Property) => Product.PublicDetail;
  readonly setName: (
    agg: Product.Property,
    update: Pick<Product.Property, 'name'>,
  ) => Product.Property;
  readonly setPrice: (
    agg: Product.Property,
    update: Pick<Product.Property, 'price'>,
  ) => Product.Property;
  readonly setDescription: (
    agg: Product.Property,
    update: Pick<Product.Property, 'description'>,
  ) => Product.Property;
  readonly setCountry: (
    agg: Product.Property,
    update: Pick<Product.Property, 'country'>,
  ) => Product.Property;
}

export const Product: Product = {
  get(args) {
    const now = new Date();
    const {
      id = '',
      created_at = now,
      updated_at = now,
      name,
      description,
      price,
      category,
      country,
      store,
    } = args;
    return {
      id,
      category,
      country,
      created_at,
      updated_at,
      name,
      description,
      price,
      store: { id: store.id, name: store.name },
    };
  },
  getPublic(agg) {
    const { id, name, category, country, price } = agg;
    return { id, name, category, country, price };
  },
  getPublicDetail(agg) {
    const { id, name, category, country, price, store, description } = agg;
    return { id, name, category, country, price, store, description };
  },
  setName(agg, { name }) {
    (agg as any).name = name;
    return agg;
  },
  setCountry(agg, { country }) {
    (agg as any).country = country;
    return agg;
  },
  setPrice(agg, { price }) {
    (agg as any).price = price;
    return agg;
  },
  setDescription(agg, { description }) {
    (agg as any).description = description;
    return agg;
  },
};
