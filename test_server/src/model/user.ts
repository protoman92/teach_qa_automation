import { CreationOptional, DataTypes, InitOptions, Model } from "sequelize";
import { User } from "../interface";
import { CONSTANTS } from "../utils";

export default class UserModel extends Model<User> implements User {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
}

export function init(options: Omit<InitOptions<UserModel>, "tableName">): void {
  UserModel.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize: options.sequelize,
      tableName: CONSTANTS.TABLE_USER,
    }
  );
}
