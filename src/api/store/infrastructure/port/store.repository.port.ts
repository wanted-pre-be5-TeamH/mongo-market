import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { Store } from '@STORE/domain';
import { HydratedDocument } from 'mongoose';
import { StoreEntity } from '../adapter/store.entity';

export namespace IStoreRepository {
  export type Document = HydratedDocument<StoreEntity>;
}

export interface IStoreRepository
  extends IBaseRepository<Store.Id, Store.Property> {
  findOneBySellerId: (
    where: Pick<Store.SellerEntity, 'id'>,
  ) => Promise<Store.Property | null>;
}
