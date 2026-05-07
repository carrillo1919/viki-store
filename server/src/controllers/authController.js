import jwt from 'jsonwebtoken';
import { authService } from '../services/authService.js';
import { loginSchema } from '../utils/validators.js';

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const user = await authService.authenticateUser(validatedData.username, validatedData.password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    res.json({ token, user: { id: user.id, username: user.username, roleId: user.roleId } });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};

export const getMe = async (req, res) => {
  res.json({ user: req.user });
};