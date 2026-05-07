import { Product } from '../models/index.js';
import { getSocket } from '../utils/socket.js';

export const productService = {
  getAllProducts: async () => {
    return Product.findAll();
  },

  getProductById: async (id) => {
    return Product.findByPk(id);
  },

  createProduct: async (data) => {
    return Product.create(data);
  },

  updateProduct: async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) return null;

    const oldStock = product.stock;
    const updated = await product.update(data);

    const io = getSocket();
    if (io && updated.stock <= updated.minStock && oldStock > updated.minStock) {
      io.emit('lowStockAlert', { productId: updated.id, name: updated.name, stock: updated.stock });
    }

    return updated;
  },

  deleteProduct: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  },
};