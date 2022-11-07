import { Test } from '@nestjs/testing';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import {
  AccountEntity,
  AccountSchemaName,
} from '@ACCOUNT/infrastructure/adapter/account.entity';
import { Account } from '@ACCOUNT/domain';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port/account.repository.port';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '@COMMON/provider/model.mock';

describe('Account Repository Unit Test', () => {
  let repository: IAccountRepository;
  let mapper: IEntityMapper<Account.Property, AccountEntity>;
  const model = mockModel<Account.Id, AccountEntity>();
  const now1 = new Date();
  const now2 = new Date();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountEntityMapper,
        {
          provide: getModelToken(AccountSchemaName),
          useValue: model,
        },
        AccountRepository,
      ],
    }).compile();
    repository = module.get(AccountRepository);
    mapper = module.get(AccountEntityMapper);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    const entity = new AccountEntity();
    entity.id = 'sfecescsc';
    entity.username = 'testuser';
    entity.email = 'test@test.com';
    entity.role = 'Normal';
    entity.password = '12345rtg';
    entity.verified = true;
    entity.created_at = now1;
    entity.updated_at = now2;
    it('대상이 존재할 때', async () => {
      model.findOne.mockResolvedValue(entity);
      const received = await repository.findOne({ id: 'sfecescsc' });

      expect(received).toEqual<Account.Property>({
        id: 'sfecescsc',
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
        created_at: now1,
        updated_at: now2,
      });
      expect(model.findOne).toBeCalledTimes(1);
      expect(model.findOne).toBeCalledWith({ id: 'sfecescsc' });
      return;
    });
    it('대상이 존재하지 않을 때', async () => {
      model.findOne.mockResolvedValue(null);
      const spy = jest.spyOn(mapper, 'toAggregate');

      const received = await repository.findOne({ id: 'sfecescsc' });

      expect(received).toBe(null);
      expect(model.findOne).toBeCalledTimes(1);
      expect(spy).toBeCalledTimes(0);
      return;
    });
  });

  describe('save', () => {
    it('대상이 존재하지 않을 때', async () => {
      const spyRE = jest.spyOn(mapper, 'toRootEntity');
      const spyER = jest.spyOn(mapper, 'toAggregate');
      const spyCreate = jest.spyOn(model, 'create');

      model.findOneAndUpdate.mockResolvedValue(null);
      model.create.mockImplementationOnce((entity) => ({
        id: 'test',
        ...entity,
      }));
      const { created_at, updated_at, ...received } = await repository.save({
        id: 'afdsefesf',
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
        created_at: now1,
        updated_at: now2,
      });
      expect(received).toEqual({
        id: 'test',
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
      });
      expect(created_at).not.toEqual(now1);
      expect(updated_at).not.toEqual(now2);
      expect(spyER).toBeCalledTimes(1);
      expect(spyRE).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledTimes(1);
      return;
    });

    it('대상이 존재할 때', async () => {
      const spyRE = jest.spyOn(mapper, 'toRootEntity');
      const spyER = jest.spyOn(mapper, 'toAggregate');
      const spyCreate = jest.spyOn(model, 'create');

      model.findOneAndUpdate.mockImplementationOnce((value, entity) => ({
        id: value.id,
        ...entity,
      }));
      const { created_at, updated_at, ...received } = await repository.save({
        id: 'afdsefesf',
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
        created_at: now1,
        updated_at: now2,
      });
      expect(received).toEqual({
        id: 'afdsefesf',
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
      });
      expect(created_at).not.toEqual(now1);
      expect(updated_at).not.toEqual(now2);
      expect(spyER).toBeCalledTimes(1);
      expect(spyRE).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledTimes(0);
      return;
    });
  });
  it('remove', async () => {
    await repository.remove({ id: 'afesaf' });
    expect(model.remove).toBeCalledTimes(1);
    expect(model.remove).toBeCalledWith({ id: 'afesaf' });
    return;
  });
});
