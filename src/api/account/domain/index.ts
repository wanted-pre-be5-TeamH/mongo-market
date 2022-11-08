import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { Crypto } from '@CRYPTO/domain';
import { Store } from '@STORE/domain';

export namespace Account {
  export type Id = string;
  export type Permission = 'Admin' | 'Seller' | 'Normal';
  export type StoreEntity = Pick<Store.Property, 'id' | 'name'>;
  export interface Property extends IBaseAggregate<Id> {
    /**
     * 이벤트 및 개인 확인용 이메일
     * @format email
     */
    readonly email: string;
    /**
     * 이메일 인증 여부
     */
    readonly verified: boolean;
    /**
     * 사용자명은 숫자와 문자로이루어진 6이상 15자리 이하의 문자열입니다.
     * @pattern ^\w{6,15}$
     */
    readonly username: string;

    readonly password: string;
    /**
     * 사용자 권한
     */
    readonly role: Permission;

    /**
     * 판매자의 경우, 입점한 스토어 정보가 생성된다
     */
    readonly store?: StoreEntity;
  }

  export interface Password {
    /**
     * 비밀번호는 숫자와 문자로이루어진 6이상 20자리 이하의 문자열입니다.
     * @pattern ^\w{6,20}$
     */
    readonly password: string;
  }

  export type Public = Pick<
    Property,
    'id' | 'email' | 'username' | 'role' | 'store'
  >;
}

type Required = keyof Pick<Account.Property, 'email' | 'username' | 'password'>;

export interface Account {
  readonly get: (
    args: Pick<Account.Property, Required> &
      Partial<Omit<Account.Property, Required>>,
  ) => Account.Property;
  readonly getPublic: (agg: Account.Property) => Account.Public;
  readonly setUsername: (
    agg: Account.Property,
    update: Pick<Account.Property, 'username'>,
  ) => Account.Property;
  readonly setSeller: (agg: Account.Property) => Account.Property;
  readonly setPassword: (
    agg: Account.Property,
    update: Account.Password,
  ) => Promise<Account.Property>;
}

export interface Account {
  readonly checkPermission: (args: {
    readonly user: Account.Permission;
    readonly permission: Account.Permission;
  }) => boolean;
}

export const Account: Account = {
  get(agg) {
    const now = new Date();
    const {
      id = '',
      created_at = now,
      updated_at = now,
      email,
      verified = false,
      username,
      password,
      role = 'Normal',
      store,
    } = agg;
    return {
      id,
      created_at,
      updated_at,
      username,
      email,
      verified,
      password,
      role,
      store,
    };
  },
  getPublic(agg) {
    const { id, username, email, role, store } = agg;
    return { id, username, email, role, store };
  },
  setSeller(agg) {
    const {
      id,
      created_at,
      updated_at,
      username,
      email,
      password,
      verified,
      store,
    } = agg;
    return {
      id,
      created_at,
      updated_at,
      username,
      email,
      password,
      verified,
      role: 'Seller',
      store,
    };
  },
  checkPermission({ user, permission }) {
    return user === permission;
  },
  setUsername(agg, { username }) {
    const {
      id,
      created_at,
      updated_at,
      password,
      role,
      email,
      verified,
      store,
    } = agg;
    return {
      id,
      created_at,
      updated_at,
      password,
      role,
      email,
      verified,
      username,
      store,
    };
  },
  async setPassword(agg, { password }) {
    const {
      id,
      created_at,
      updated_at,
      username,
      role,
      email,
      verified,
      store,
    } = agg;
    return {
      id,
      created_at,
      updated_at,
      role,
      email,
      verified,
      username,
      password: await Crypto.encrypt(password),
      store,
    };
  },
};
