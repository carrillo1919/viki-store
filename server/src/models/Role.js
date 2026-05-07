import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM('ADMIN', 'MANAGER', 'STAFF', 'AGENT_OPENCLAW'),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
  }
);