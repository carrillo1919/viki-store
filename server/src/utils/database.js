import { sequelize } from '../config/database.js';
import '../models/index.js'; // Import models and associations

export const setupDatabaseAssociations = () => {
  // Associations are now defined in models/index.js
  // This function is kept for consistency but is now a no-op
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
    throw err;
  }
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
    throw err;
  }
};