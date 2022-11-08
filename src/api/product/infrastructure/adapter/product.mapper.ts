import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { Product } from '@PRODUCT/domain';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductEntityMapper
  implements IEntityMapper<Product.Property, ProductEntity>
{
  toAggregate(entity: ProductEntity): Product.Property {
    const {
      id,
      name,
      description,
      category,
      country,
      store,
      price,
      created_at,
      updated_at,
    } = entity;
    return Product.get({
      id,
      created_at,
      updated_at,
      name,
      description,
      price,
      store,
      category,
      country,
    });
  }
  toRootEntity(aggregate: Product.Property): ProductEntity {
    const { id, name, description, price, store, category, country } =
      aggregate;
    const entity = new ProductEntity();
    entity.id = id;
    entity.name = name;
    entity.description = description;
    entity.price = price;
    entity.store = { id: store.id, name: store.name };
    entity.store_id = store.id;
    entity.category = category;
    entity.country = country;
    return entity;
  }
}
