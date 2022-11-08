import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { Store } from '@STORE/domain';
import { StoreEntity } from './store.entity';

@Injectable()
export class StoreEntityMapper
  implements IEntityMapper<Store.Property, StoreEntity>
{
  toAggregate(entity: StoreEntity): Store.Property {
    const { id, created_at, updated_at, name, seller, description } = entity;
    return Store.get({ id, created_at, updated_at, name, seller, description });
  }

  toRootEntity(aggregate: Store.Property): StoreEntity {
    const { id, name, description, seller } = aggregate;
    const entity = new StoreEntity();
    entity.id = id;
    entity.name = name;
    entity.description = description;
    entity.seller = { id: seller.id, username: seller.username };
    entity.seller_id = seller.id;
    return entity;
  }
}
