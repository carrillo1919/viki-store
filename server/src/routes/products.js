import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', authenticate, authorize('Inventario'), getProducts);
router.get('/:id', authenticate, authorize('Inventario'), getProductById);
router.post('/', authenticate, authorize('Inventario'), createProduct);
router.put('/:id', authenticate, authorize('Inventario'), updateProduct);
router.delete('/:id', authenticate, authorize('Inventario'), deleteProduct);

export default router;