import { StoreUsecase } from '../../application/adapter/store.usecase';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import helper from 'nestia-helper';
import { Public } from '@ACCOUNT/provider/decorator/public.decorator';
import { AccountPublic } from '@ACCOUNT/provider/decorator/account.decorator';
import { Account } from '@ACCOUNT/domain';
import { IStoreUsecase } from '@STORE/application/port/store.usecase.port';
import { Role } from '@ACCOUNT/provider/decorator/role.decorator';

@Controller('stores')
export class StoreController {
  constructor(
    @Inject(StoreUsecase)
    private readonly storeUsecase: IStoreUsecase,
  ) {}

  @Role('Seller')
  @Get('mine')
  findMine(@AccountPublic() { id }: Account.Public) {
    return this.storeUsecase.findMine({ id });
  }

  @Public()
  @Get(':store_id')
  findOne(@helper.TypedParam('store_id', 'string') id: string) {
    return this.storeUsecase.findOne({ id });
  }

  @Post()
  create(
    @AccountPublic() account: Account.Public,
    @helper.TypedBody() { name, description }: IStoreUsecase.Create,
  ) {
    return this.storeUsecase.create(account, { name, description });
  }
}
