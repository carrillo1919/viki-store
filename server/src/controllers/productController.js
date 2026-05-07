import { productService } from '../services/productService.js';
import { createProductSchema, updateProductSchema } from '../utils/validators.js';

export const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    const product = await productService.createProduct(validatedData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const validatedData = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id, validatedData);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};

export const deleteProduct = async (req, res) => {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.status(204).send();
};