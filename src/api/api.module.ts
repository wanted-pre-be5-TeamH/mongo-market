import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { StoreModule } from '@STORE/store.module';

@Module({
  imports: [AccountModule, StoreModule],
})
export class ApiModule {}
