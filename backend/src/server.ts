import '@/configs/DotEnv';
import { App } from './App';
import { connect } from '@/configs/DataBase';

const main = async () => {
  await connect();

  const application = new App();

  application.server();
};

main();
