import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { Store } from '@STORE/domain';
import { HydratedDocument } from 'mongoose';
import { StoreEntity } from '../adapter/store.entity';

export namespace IStoreRepository {
  export type Document = HydratedDocument<StoreEntity>;
}

export type IStoreRepository = IBaseRepository<Store.Id, Store.Property>;
