import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AccountService } from './application/adapter/account.service';
import { AccountUsecase } from './application/adapter/account.usecase';
import {
  AccountSchema,
  AccountSchemaName,
} from './infrastructure/adapter/account.entity';
import { AccountEntityMapper } from './infrastructure/adapter/account.mapper';
import { AccountRepository } from './infrastructure/adapter/account.repository';
import { AccountController } from './presentation/web/account.controller';
import { JwtAuthGuard } from './provider/guard/jwt.guard';
import { RoleGuard } from './provider/guard/role.guard';
import { JwtStrategy } from './provider/strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountSchemaName, schema: AccountSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnv, true>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRESIN') },
      }),
    }),
  ],
  providers: [
    AccountEntityMapper,
    AccountRepository,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AccountService,
    AccountUsecase,
  ],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
