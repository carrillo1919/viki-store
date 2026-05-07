import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticate, authorize('Usuarios'), getUsers);
router.post('/', authenticate, authorize('Usuarios'), createUser);
router.put('/:id', authenticate, authorize('Usuarios'), updateUser);
router.delete('/:id', authenticate, authorize('Usuarios'), deleteUser);

export default router;