import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Permission extends Model {}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    module: {
      type: DataTypes.ENUM('Inventario', 'Reportes', 'Usuarios', 'Auditoría'),
      allowNull: false,
    },
    canRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canWrite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    canDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
  }
);