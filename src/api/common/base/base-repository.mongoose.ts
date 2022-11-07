import { IEntityMapper } from '../interface/mapper.interface';
import { IBaseRepository } from '../interface/base-repository.interface';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { BaseEntity } from './base-entity.mongoose';
import { HydratedDocument, Model } from 'mongoose';

export abstract class MongooseBaseRepository<
  IId,
  Aggregate extends IBaseAggregate<IId>,
  RootEntity extends BaseEntity<IId>,
> implements IBaseRepository<IId, Aggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<Aggregate, RootEntity>,
    private readonly model: Model<HydratedDocument<RootEntity>>,
  ) {}

  async findOne({ id }: Pick<Aggregate, 'id'>): Promise<Aggregate | null> {
    const document = await this.model.findOne({ id });
    return document == null ? null : this.mapper.toAggregate(document);
  }

  async findMany(): Promise<Aggregate[]> {
    const list = await this.model.find();
    return list.map(this.mapper.toAggregate);
  }

  async save(aggregate: Aggregate): Promise<Aggregate> {
    const { id, ...entity } = this.mapper.toRootEntity(aggregate);
    const document = await this.model.findOneAndUpdate({ id }, entity);
    return this.mapper.toAggregate(
      document == null ? await this.model.create(entity) : document,
    );
  }

  async remove({ id }: Pick<Aggregate, 'id'>): Promise<void> {
    await this.model.remove({ id });
    return;
  }

  protected getMapper(): IEntityMapper<Aggregate, RootEntity> {
    return this.mapper;
  }

  protected getModel(): Model<HydratedDocument<RootEntity>> {
    return this.model;
  }
}
