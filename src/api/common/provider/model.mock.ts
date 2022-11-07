import { BaseEntity } from '@COMMON/base/base-entity.mongoose';
import { HydratedDocument, Model } from 'mongoose';

export const mockModel = <K, T extends BaseEntity<K>>(): Pick<
  Record<keyof Model<HydratedDocument<T>>, jest.Mock>,
  'find' | 'findOne' | 'findOneAndUpdate' | 'remove' | 'create'
> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  remove: jest.fn(),
});
