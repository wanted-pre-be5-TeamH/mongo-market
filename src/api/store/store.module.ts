import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreUsecase } from './application/adapter/store.usecase';
import { StoreSchema } from './infrastructure/adapter/store.entity';
import { StoreEntityMapper } from './infrastructure/adapter/store.mapper';
import { StoreRepository } from './infrastructure/adapter/store.repository';
import { StoreController } from './presentation/web/store.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'stores', schema: StoreSchema }]),
  ],
  providers: [StoreEntityMapper, StoreRepository, StoreUsecase],
  controllers: [StoreController],
})
export class StoreModule {}
