/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@ACCOUNT/domain';
import { Crypto } from '@CRYPTO/domain';
jest.mock('@CRYPTO/domain');

const {
  get,
  getPublic,
  checkPermission,
  setUsername,
  setPassword,
  setRole,
  setStore,
} = Account;
const now = new Date();
const TestData = get({
  id: 'testid',
  email: 'test@test.com',
  username: 'testuser',
  password: '1234',
  role: 'Normal',
});

describe('Account Domain Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.each<Get>([
    {
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
    },
    {
      id: 'faraea',
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
      role: 'Admin',
      verified: true,
    },
    {
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
      created_at: now,
      updated_at: now,
    },
  ])('get', (data) => {
    const { created_at, updated_at, ...account } = get(data);
    if (data.created_at != null) {
      expect(created_at).toEqual(data.created_at);
    }
    if (data.updated_at != null) {
      expect(updated_at).toEqual(data.updated_at);
    }
    expect(account).toEqual({
      id: data.id ?? '',
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role ?? 'Normal',
      verified: data.verified ?? false,
    });
  });

  it('getPublic', () => {
    const result = getPublic(TestData);
    expect(result).toEqual({
      id: TestData.id,
      email: TestData.email,
      username: TestData.username,
      role: TestData.role,
    });
    return;
  });

  it.each<CheckPermission>([
    { user: 'Admin', permission: 'Admin' },
    { user: 'Seller', permission: 'Seller' },
    { user: 'Normal', permission: 'Normal' },
  ])('checkPermission - true', (data) => {
    const result = checkPermission(data);
    expect(result).toBe(true);
    return;
  });
  it.each<CheckPermission>([
    { user: 'Admin', permission: 'Normal' },
    { user: 'Admin', permission: 'Seller' },
    { user: 'Normal', permission: 'Admin' },
    { user: 'Normal', permission: 'Seller' },
    { user: 'Seller', permission: 'Admin' },
    { user: 'Seller', permission: 'Normal' },
  ])('checkPermission - false', (data) => {
    const result = checkPermission(data);
    expect(result).toBe(false);
  });

  it('setUsername', () => {
    const data = setUsername(TestData, { username: 'changedUsername' });
    expect(data).toEqual({ ...TestData, username: 'changedUsername' });
    expect(TestData.username).toBe('testuser');
    return;
  });
  it('setPassword', async () => {
    (Crypto.encrypt as any).mockResolvedValue('abcd1234');

    const data = await setPassword(TestData, { password: 'changedPassword' });

    expect(data).toEqual({ ...TestData, password: 'abcd1234' });
    expect(Crypto.encrypt).toBeCalledTimes(1);
    expect(Crypto.encrypt).toBeCalledWith('changedPassword');
    expect(TestData.password).toBe('1234');
    return;
  });

  it('setRole', () => {
    const data = setRole(TestData, { role: 'Seller' });
    expect(data.role).toBe('Seller');
  });

  it('setStore', () => {
    const data = setStore(TestData, { id: 'testsotre', name: 'etsef' });
    expect(data.store).toEqual({ id: 'testsotre', name: 'etsef' });
  });
});

type Required = keyof Pick<Account.Property, 'username' | 'email' | 'password'>;
type Get = Pick<Account.Property, Required> &
  Partial<Omit<Account.Property, Required>>;
type CheckPermission = {
  readonly user: Account.Permission;
  readonly permission: Account.Permission;
};
