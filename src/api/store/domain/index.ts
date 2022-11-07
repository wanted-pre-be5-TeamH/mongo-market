import { Account } from '@ACCOUNT/domain';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export namespace Store {
  export type Id = string;
  export type SellerEntity = Pick<Account.Property, 'id' | 'username'>;

  export interface Property extends IBaseAggregate<Id> {
    /**
     * 스토어 이름
     */
    name: string;
    /**
     * 판매자 정보
     */
    seller: SellerEntity;
    /**
     * 스토어 소개
     */
    description: string;
  }
  export type Public = Pick<Property, 'id' | 'name' | 'seller' | 'description'>;
}

type Required = keyof Pick<Store.Property, 'name' | 'seller' | 'description'>;

export interface Store {
  readonly get: (
    args: Pick<Store.Property, Required> &
      Partial<Omit<Store.Property, Required>>,
  ) => Store.Property;
  readonly getPublic: (agg: Store.Property) => Store.Public;
}

export const Store: Store = {
  get(args) {
    const now = new Date();
    const {
      id = '',
      created_at = now,
      updated_at = now,
      name,
      description,
      seller,
    } = args;
    return {
      id,
      created_at,
      updated_at,
      name,
      description,
      seller: { id: seller.id, username: seller.username },
    };
  },
  getPublic(agg) {
    const { id, name, description, seller } = agg;
    return {
      id,
      name,
      description,
      seller: { id: seller.id, username: seller.username },
    };
  },
};
