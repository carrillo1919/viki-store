import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getMovements, createMovement } from '../controllers/movementController.js';

const router = express.Router();

router.get('/', authenticate, authorize('Inventario'), getMovements);
router.post('/', authenticate, authorize('Inventario'), createMovement);

export default router;