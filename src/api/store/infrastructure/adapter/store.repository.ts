import { MongooseBaseRepository } from '@COMMON/base/base-repository.mongoose';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from '@STORE/domain';
import { Model } from 'mongoose';
import { IStoreRepository } from '../port/store.repository.port';
import { StoreEntity, StoreSchemaName } from './store.entity';
import { StoreEntityMapper } from './store.mapper';

@Injectable()
export class StoreRepository
  extends MongooseBaseRepository<Store.Id, Store.Property, StoreEntity>
  implements IStoreRepository
{
  constructor(
    @Inject(StoreEntityMapper)
    mapper: IEntityMapper<Store.Property, StoreEntity>,
    @InjectModel(StoreSchemaName)
    model: Model<IStoreRepository.Document>,
  ) {
    super(mapper, model);
  }
}
