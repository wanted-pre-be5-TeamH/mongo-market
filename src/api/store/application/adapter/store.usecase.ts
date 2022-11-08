import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
import { Account } from '@ACCOUNT/domain';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { Store } from '@STORE/domain';
import { StoreRepository } from '@STORE/infrastructure/adapter/store.repository';
import { IStoreRepository } from '@STORE/infrastructure/port/store.repository.port';
import { IStoreUsecase } from '../port/store.usecase.port';

@Injectable()
export class StoreUsecase implements IStoreUsecase {
  constructor(
    @Inject(StoreRepository)
    private readonly storeRepository: IStoreRepository,
    @Inject(AccountService)
    private readonly accountService: IAccountService,
  ) {}

  async findOne({ id }: IStoreUsecase.FindOne): Promise<Store.Public> {
    const store = await this.storeRepository.findOne({ id });
    return store == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : Store.getPublic(store);
  }

  async findMine({ id }: IStoreUsecase.FindMine): Promise<Store.Public> {
    const store = await this.storeRepository.findOneBySellerId({ id });
    return store == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : Store.getPublic(store);
  }

  async create(
    { id, username, role }: Account.Public,
    { name, description }: IStoreUsecase.Create,
  ): Promise<Store.Public> {
    if (role !== 'Normal') {
      throwHttpException('403', ExceptionMessage.FBD);
    }

    const store = await this.storeRepository.save(
      Store.get({ name, description, seller: { id, username } }),
    );
    await this.accountService.update(
      { id },
      { role: 'Seller', store: { id: store.id, name: store.name } },
    );
    return Store.getPublic(store);
  }
}
