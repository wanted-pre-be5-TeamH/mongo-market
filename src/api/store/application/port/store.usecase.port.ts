import { Account } from '@ACCOUNT/domain';
import { Store } from '@STORE/domain';

export namespace IStoreUsecase {
  export type FindOne = Pick<Store.Property, 'id'>;

  export type Create = Pick<Store.Property, 'name' | 'description'>;
}

export interface IStoreUsecase {
  readonly findOne: (where: IStoreUsecase.FindOne) => Promise<Store.Public>;
  readonly create: (
    account: Account.Public,
    data: IStoreUsecase.Create,
  ) => Promise<Store.Public>;
}
