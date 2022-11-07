import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from './DB/mongoose.module';
import { AllExceptionFilter } from './filter/all-exception.filter';

@Module({
  imports: [ConfigModule, MongooseModule],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class InfrastructureModule {}
