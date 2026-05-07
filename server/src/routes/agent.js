import express from 'express';
import { checkApiKey } from '../middleware/auth.js';
import { checkStock, registerSale, addLead } from '../controllers/agentController.js';

const router = express.Router();

router.use(checkApiKey);
router.post('/check-stock', checkStock);
router.post('/register-sale', registerSale);
router.post('/add-lead', addLead);

export default router;