import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../port/account.service.port';
import { Crypto } from '@CRYPTO/domain';
import { Account } from '@ACCOUNT/domain';
import { AccountErrorMessage } from '@ACCOUNT/infrastructure/adapter/account.entity';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port/account.repository.port';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async findOne(where: IAccountService.FindOne): Promise<Account.Property> {
    const account = await this.accountRepository.findOne({
      ...('id' in where ? { id: where.id } : { email: where.email }),
    });
    return account == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : account;
  }

  async update(
    where: IAccountService.FindOne,
    { username, role, store }: IAccountService.Update,
  ): Promise<void> {
    const account = await this.findOne(where);
    if (username) Account.setUsername(account, { username });
    if (role) Account.setRole(account, { role });
    if (store) Account.setStore(account, store);
    await this.accountRepository.save(account);
    return;
  }

  async checkPassword({
    password,
    hashed,
  }: IAccountService.CheckPassword): Promise<void> {
    if (!(await Crypto.compare(password, hashed))) {
      throwHttpException('401', '비밀번호가 일치하지 않습니다.');
    }
    return;
  }

  async signInLocal({
    email,
    password,
  }: IAccountService.SignInLocal): Promise<Account.Property> {
    const account = await this.findOne({ email });
    await this.checkPassword({ password, hashed: account.password });
    return account;
  }

  checkPermission({ user, permission }: IAccountService.CheckPermission): void {
    if (!Account.checkPermission({ user, permission })) {
      throwHttpException('403', ExceptionMessage.FBD);
    }
    return;
  }

  async checkDuplicate({
    email,
  }: IAccountService.CheckDupliacte): Promise<void> {
    if ((await this.accountRepository.findOne({ email })) != null) {
      throwHttpException('400', AccountErrorMessage.email_unique);
    }
    return;
  }
}
