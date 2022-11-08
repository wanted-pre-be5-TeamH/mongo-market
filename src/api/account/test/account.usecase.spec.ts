import { IAccountUsecase } from '@ACCOUNT/application/port/account.usecase.port';
import { Test } from '@nestjs/testing';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import {
  AccountEntity,
  AccountSchemaName,
} from '@ACCOUNT/infrastructure/adapter/account.entity';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { AccountUsecase } from '@ACCOUNT/application/adapter/account.usecase';
import { JwtService } from '@nestjs/jwt';
import { Account } from '@ACCOUNT/domain';
import { Crypto } from '@CRYPTO/domain';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
import { mockModel } from '@COMMON/provider/model.mock';
import { getModelToken } from '@nestjs/mongoose';
jest.mock('@CRYPTO/domain');

describe('Account Usecase Unit Test', () => {
  let usecase: IAccountUsecase;
  const model = mockModel<Account.Id, AccountEntity>();
  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockAccountService: Record<keyof IAccountService, jest.Mock> = {
    findOne: jest.fn(),
    checkPassword: jest.fn(),
    checkPermission: jest.fn(),
    signInLocal: jest.fn(),
    checkDuplicate: jest.fn(),
    update: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountEntityMapper,
        {
          provide: getModelToken(AccountSchemaName),
          useValue: model,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AccountService,
          useValue: mockAccountService,
        },
        AccountRepository,
        AccountUsecase,
      ],
    }).compile();
    usecase = module.get(AccountUsecase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Usecase should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('signIn', async () => {
    mockAccountService.signInLocal.mockResolvedValue({ id: 'sae' });
    await usecase.signIn({ email: '', password: '' });
    expect(mockJwtService.sign).toBeCalledWith({ id: 'sae' });
    return;
  });

  it('signUp', async () => {
    mockAccountService.checkDuplicate.mockResolvedValue(true);
    model.findOneAndUpdate.mockImplementationOnce((_, entity) => ({
      id: 'testid',
      ...entity,
    }));
    (Crypto.encrypt as any).mockResolvedValue('hashed password');
    const received = await usecase.signUp({
      email: 'test@test.com',
      username: 'signUpTest',
      password: '1234avcd',
    });
    expect(received).toEqual({
      id: 'testid',
      email: 'test@test.com',
      username: 'signUpTest',
      role: 'Normal',
    });
    expect(model.findOneAndUpdate).toBeCalledWith(
      {
        id: '',
      },
      {
        username: 'signUpTest',
        password: 'hashed password',
        role: 'Normal',
        email: 'test@test.com',
        verified: false,
      },
    );
    return;
  });

  describe('remove', () => {
    const where: Account.Public = {
      id: 'sfecse',
      username: 'test',
      email: 'test@test.com',
      role: 'Seller',
    };

    it('이메일과 인증정보가 일치하지 않는 경우', async () => {
      await expect(() =>
        usecase.remove(where, { email: 'test', password: '213' }),
      ).rejects.toThrowError(ExceptionMessage.FBD);
      return;
    });

    it('요청 성공', async () => {
      mockAccountService.signInLocal.mockResolvedValue({ id: 'aedcs' });
      await usecase.remove(where, { email: 'test@test.com', password: '' });
      expect(model.remove).toBeCalledTimes(1);
      return;
    });
  });
});
