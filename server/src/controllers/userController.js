import { userService } from '../services/userService.js';
import { createUserSchema, updateUserSchema } from '../utils/validators.js';

export const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const createUser = async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(req.params.id, validatedData);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};

export const deleteUser = async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
};