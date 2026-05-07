import { Product } from '../models/Product.js';
import { Movement } from '../models/Movement.js';

export const agentService = {
  checkStock: async (data) => {
    const product = await Product.findOne({ where: { sku: data.sku } });
    if (!product) return null;
    return {
      sku: product.sku,
      name: product.name,
      stock: product.stock,
      available: product.stock > 0,
    };
  },

  registerSale: async (data) => {
    const product = await Product.findOne({ where: { sku: data.sku } });
    if (!product || product.stock < data.quantity) return null;

    product.stock -= data.quantity;
    await product.save();

    const movement = await Movement.create({
      productId: product.id,
      type: 'OUT',
      quantity: data.quantity,
      reason: data.reason || 'Sale via agent',
      responsibleId: 0,
      responsibleType: 'AGENT',
    });

    return {
      success: true,
      movementId: movement.id,
      remainingStock: product.stock,
    };
  },

  addLead: async (data) => {
    return {
      success: true,
      message: 'Lead added successfully',
      lead: data,
    };
  },
};