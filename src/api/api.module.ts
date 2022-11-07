import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { StoreModule } from '@STORE/store.module';
import { UserModule } from '@USER/user.module';

@Module({
  imports: [AccountModule, UserModule, StoreModule],
})
export class ApiModule {}
