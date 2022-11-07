import { ConfigModule as OriginalConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object<any, false, IEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string().default('4000'),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRESIN: Joi.string().required(),

  MONGO_HOST: Joi.string().required(),
});

export const ConfigModule = OriginalConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationOptions: {
    abortEarly: true,
  },
  validationSchema,
});
