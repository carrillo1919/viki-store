import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Permission } from '../models/Permission.js';

export const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

export const authorize = (...modules) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const permissions = await Permission.findAll({
      where: { roleId: req.user.roleId },
    });

    const hasPermission = modules.some(module =>
      permissions.some(perm => perm.module === module && perm.canRead)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

export const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.AGENT_API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }

  next();
};