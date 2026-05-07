import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Movement extends Model {}

Movement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM('IN', 'OUT'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsibleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responsibleType: {
      type: DataTypes.ENUM('USER', 'AGENT'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Movement',
    tableName: 'movements',
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);