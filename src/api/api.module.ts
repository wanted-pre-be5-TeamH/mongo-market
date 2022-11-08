import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { ProductModule } from '@PRODUCT/product.module';
import { StoreModule } from '@STORE/store.module';

@Module({
  imports: [AccountModule, StoreModule, ProductModule],
})
export class ApiModule {}
