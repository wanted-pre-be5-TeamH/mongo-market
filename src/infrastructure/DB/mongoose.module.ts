import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule as OriginalModule } from '@nestjs/mongoose';

export const MongooseModule = OriginalModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configSerivce: ConfigService<IEnv, true>) => {
    return { uri: configSerivce.get('MONGO_HOST') };
  },
});
