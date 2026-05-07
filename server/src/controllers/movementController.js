import { movementService } from '../services/movementService.js';
import { createMovementSchema } from '../utils/validators.js';

export const getMovements = async (req, res) => {
  const movements = await movementService.getAllMovements();
  res.json(movements);
};

export const createMovement = async (req, res) => {
  try {
    const validatedData = createMovementSchema.parse(req.body);
    const movement = await movementService.createMovement(validatedData);
    if (!movement) {
      return res.status(404).json({ message: 'Product not found or insufficient stock' });
    }
    res.status(201).json(movement);
  } catch (error) {
    res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid input' });
  }
};