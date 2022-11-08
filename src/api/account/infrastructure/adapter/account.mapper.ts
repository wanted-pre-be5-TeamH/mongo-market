import { Account } from '@ACCOUNT/domain';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountEntityMapper
  implements IEntityMapper<Account.Property, AccountEntity>
{
  toAggregate(entity: AccountEntity): Account.Property {
    const {
      id,
      created_at,
      updated_at,
      username,
      password,
      role,
      verified,
      email,
      store,
    } = entity;
    return Account.get({
      id,
      created_at,
      updated_at,
      username,
      email,
      verified,
      password,
      role,
      store,
    });
  }
  toRootEntity(account: Account.Property): AccountEntity {
    const { id, username, email, password, role, verified, store } = account;
    const entity = new AccountEntity();
    entity.id = id;
    entity.email = email;
    entity.verified = verified;
    entity.username = username;
    entity.password = password;
    entity.role = role;
    entity.store = store;
    return entity;
  }
}
