declare namespace NodeJS {
  interface ProcessEnv {
    NODE_DATABASE_NAME: string;
    NODE_DATABASE_PORT: string;
    NODE_DATABASE_PASSWORD: string;
    NODE_DATABASE_USER: string;
    NODE_DATABASE_HOST: string;

    NODE_SERVER_PORT: string;
  }
}
