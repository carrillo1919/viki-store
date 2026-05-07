import { User } from '../models/index.js';

export const authService = {
  authenticateUser: async (username, password) => {
    const user = await User.findOne({ where: { username, isActive: true } });
    if (!user) return null;

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) return null;

    return user;
  },
};