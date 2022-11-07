type IEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  JWT_SECRET: string;
  JWT_EXPIRESIN: string;

  MONGO_HOST: string;
};

declare namespace NodeJS {
  interface ProcessEnv extends IEnv {
    [key: string]: string | undefined;
  }
}
