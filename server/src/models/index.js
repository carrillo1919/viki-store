import User from './User.js';
import Role from './Role.js';
import Permission from './Permission.js';
import Product from './Product.js';
import Movement from './Movement.js';

// Define associations
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});

Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'users',
});

Role.belongsToMany(Permission, {
  through: 'RolePermissions',
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  as: 'permissions',
});

Permission.belongsToMany(Role, {
  through: 'RolePermissions',
  foreignKey: 'permissionId',
  otherKey: 'roleId',
  as: 'roles',
});

Product.hasMany(Movement, {
  foreignKey: 'productId',
  as: 'movements',
});

Movement.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

Movement.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Movement, {
  foreignKey: 'userId',
  as: 'movements',
});

export {
  User,
  Role,
  Permission,
  Product,
  Movement,
};