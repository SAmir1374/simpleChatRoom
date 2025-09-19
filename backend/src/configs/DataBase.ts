import { Sequelize, Model } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.NODE_DATABASE_NAME,
  process.env.NODE_DATABASE_USER,
  process.env.NODE_DATABASE_PASSWORD,
  {
    host: process.env.NODE_DATABASE_HOST,
    dialect: 'mysql',
  }
);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export class BaseModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {}
