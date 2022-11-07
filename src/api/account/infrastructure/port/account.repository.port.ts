import { Account } from '@ACCOUNT/domain';
import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { HydratedDocument } from 'mongoose';
import { AccountEntity } from '../adapter/account.entity';

export namespace IAccountRepository {
  export type FindOne =
    | Pick<Account.Property, 'id'>
    | Pick<Account.Property, 'email'>;

  export type Document = HydratedDocument<AccountEntity>;
}

export interface IAccountRepository
  extends IBaseRepository<Account.Id, Account.Property> {
  readonly findOne: (
    where: IAccountRepository.FindOne,
  ) => Promise<Account.Property | null>;
}
