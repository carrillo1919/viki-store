import { Movement, Product } from '../models/index.js';

export const movementService = {
  getAllMovements: async () => {
    return Movement.findAll({ include: [Product] });
  },

  createMovement: async (data) => {
    const product = await Product.findByPk(data.productId);
    if (!product) return null;

    if (data.type === 'IN') {
      product.stock += data.quantity;
    } else {
      if (product.stock < data.quantity) {
        return null;
      }
      product.stock -= data.quantity;
    }

    await product.save();
    return Movement.create(data);
  },
};