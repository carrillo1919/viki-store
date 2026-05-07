import { agentService } from '../services/agentService.js';
import { checkStockSchema, registerSaleSchema, addLeadSchema } from '../utils/validators.js';

export const checkStock = async (req, res) => {
  try {
    const validatedData = checkStockSchema.parse(req.body);
    const result = await agentService.checkStock(validatedData);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};

export const registerSale = async (req, res) => {
  try {
    const validatedData = registerSaleSchema.parse(req.body);
    const result = await agentService.registerSale(validatedData);
    if (!result) return res.status(400).json({ message: 'Invalid input or insufficient stock' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};

export const addLead = async (req, res) => {
  try {
    const validatedData = addLeadSchema.parse(req.body);
    const result = await agentService.addLead(validatedData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};