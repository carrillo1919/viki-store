import { User } from '../models/index.js';

export const userService = {
  getAllUsers: async () => {
    return User.findAll({ include: ['Role'] });
  },

  createUser: async (data) => {
    return User.create(data);
  },

  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  },
};