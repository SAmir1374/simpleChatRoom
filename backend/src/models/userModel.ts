import { sequelize, BaseModel } from '@/configs/DataBase';
import { DataTypes } from 'sequelize';

interface UserModelType {
  readonly id?: number;
  username: string;
  password: string;
}

class UserModel extends BaseModel<UserModelType> implements UserModelType {
  public id!: number;
  public username!: string;
  public password!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // یا false اگه نخوای
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },
  }
);

export default UserModel;
