import { MongooseBaseRepository } from '@COMMON/base/base-repository.mongoose';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@PRODUCT/domain';
import { Model } from 'mongoose';
import { IProductRepository } from '../port/product.repository.port';
import { ProductEntity, ProductSchemaName } from './product.entity';
import { ProductEntityMapper } from './product.mapper';

@Injectable()
export class ProductRepository
  extends MongooseBaseRepository<Product.Id, Product.Property, ProductEntity>
  implements IProductRepository
{
  constructor(
    @Inject(ProductEntityMapper)
    mapper: IEntityMapper<Product.Property, ProductEntity>,
    @InjectModel(ProductSchemaName)
    model: Model<IProductRepository.Document>,
  ) {
    super(mapper, model);
  }
  async findMany(
    where?: IProductRepository.FindManyFilter,
    order?: IProductRepository.FindManyOrder,
  ): Promise<Product.Property[]> {
    let filter = {};
    if (where) {
      if (where.id) {
        filter = { store_id: where.id };
      }
      if (where.category) {
        filter = { ...filter, category: where.category };
      }
      if (where.country) {
        filter = { ...filter, country: where.country };
      }
    }
    const list = await this.getModel()
      .find(filter)
      .sort({
        created_at: order?.order === 'oldest' ? 1 : -1,
      });
    return list.map(this.getMapper().toAggregate);
  }
}
