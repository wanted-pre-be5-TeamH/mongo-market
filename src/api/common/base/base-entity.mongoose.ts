import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export abstract class BaseEntity<IId> implements IBaseAggregate<IId> {
  id!: IId;
  created_at!: Date;
  updated_at!: Date;
}
