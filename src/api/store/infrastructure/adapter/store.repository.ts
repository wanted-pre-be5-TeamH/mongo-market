import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from '@STORE/domain';
import { Model } from 'mongoose';
import { IStoreRepository } from '../port/store.repository.port';
import { StoreEntity } from './store.entity';
import { StoreEntityMapper } from './store.mapper';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectModel('stores')
    private readonly storeModel: Model<IStoreRepository.Document>,
    @Inject(StoreEntityMapper)
    private readonly mapper: IEntityMapper<Store.Property, StoreEntity>,
  ) {}

  async findOne({
    id,
  }: Pick<Store.Property, 'id'>): Promise<Store.Property | null> {
    const store = await this.storeModel.findOne({ id });
    return store == null ? null : Store.get(store);
  }

  async findMany(): Promise<Store.Property[]> {
    return [];
  }

  async save(agg: Store.Property): Promise<Store.Property> {
    const { id, ...entity } = this.mapper.toRootEntity(agg);
    const store = await this.storeModel.findOneAndUpdate({ id }, entity);
    return Store.get(
      store == null ? await this.storeModel.create(entity) : store,
    );
  }

  async remove({ id }: Pick<Store.Property, 'id'>): Promise<void> {
    await this.storeModel.remove({ id });
    return;
  }
}
