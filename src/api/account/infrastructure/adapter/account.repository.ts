import { Account } from '@ACCOUNT/domain';
import { MongooseBaseRepository } from '@COMMON/base/base-repository.mongoose';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccountRepository } from '../port/account.repository.port';
import { AccountEntity, AccountSchemaName } from './account.entity';
import { AccountEntityMapper } from './account.mapper';

@Injectable()
export class AccountRepository
  extends MongooseBaseRepository<Account.Id, Account.Property, AccountEntity>
  implements IAccountRepository
{
  constructor(
    @Inject(AccountEntityMapper)
    mapper: IEntityMapper<Account.Property, AccountEntity>,
    @InjectModel(AccountSchemaName)
    model: Model<IAccountRepository.Document>,
  ) {
    super(mapper, model);
  }

  async findOne(
    dto: IAccountRepository.FindOne,
  ): Promise<Account.Property | null> {
    const document = await this.getModel().findOne({
      ...('id' in dto ? { id: dto.id } : { email: dto.email }),
    });
    return document == null ? null : this.getMapper().toAggregate(document);
  }
}
