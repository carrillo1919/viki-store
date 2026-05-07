import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { inventoryPdf, inventoryExcel, movementsPdf } from '../controllers/reportController.js';

const router = express.Router();

router.get('/inventory/pdf', authenticate, authorize('Reportes'), inventoryPdf);
router.get('/inventory/excel', authenticate, authorize('Reportes'), inventoryExcel);
router.get('/movements/pdf', authenticate, authorize('Reportes'), movementsPdf);

export default router;