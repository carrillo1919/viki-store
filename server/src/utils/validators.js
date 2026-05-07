import { z } from 'zod';

// Auth Validators
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// User Validators
export const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleId: z.number().min(1, 'Role ID must be a positive number'),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  roleId: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
}).strict();

// Product Validators
export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  stock: z.number().min(0, 'Stock cannot be negative'),
  minStock: z.number().min(0, 'Minimum stock cannot be negative'),
  price: z.number().positive('Price must be positive'),
  category: z.string().optional(),
});

export const updateProductSchema = z.object({
  sku: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  stock: z.number().min(0).optional(),
  minStock: z.number().min(0).optional(),
  price: z.number().positive().optional(),
  category: z.string().optional(),
}).strict();

// Movement Validators
export const createMovementSchema = z.object({
  productId: z.number().min(1, 'Product ID must be a positive number'),
  type: z.enum(['IN', 'OUT'], { errorMap: () => ({ message: 'Type must be IN or OUT' }) }),
  quantity: z.number().positive('Quantity must be positive'),
  reason: z.string().min(1, 'Reason is required'),
  responsibleId: z.number().min(0, 'Responsible ID must be a positive number'),
  responsibleType: z.enum(['USER', 'AGENT'], { errorMap: () => ({ message: 'Responsible type must be USER or AGENT' }) }),
});

// Agent Validators
export const checkStockSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
});

export const registerSaleSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  quantity: z.number().positive('Quantity must be positive'),
  reason: z.string().optional(),
});

export const addLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});