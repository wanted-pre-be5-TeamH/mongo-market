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
  ) {}

  async findOne({ id }: IStoreUsecase.FindOne): Promise<Store.Public> {
    const store = await this.storeRepository.findOne({ id });
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
    return Store.getPublic(
      await this.storeRepository.save(
        Store.get({ name, description, seller: { id, username } }),
      ),
    );
  }
}
