import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

import { setupMiddleware, setupRoutes } from './utils/initialization.js';
import { setupSocketIO } from './utils/socketIO.js';
import { setupDatabaseAssociations, syncDatabase } from './utils/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { auditMiddleware } from './middleware/audit.js';

import {
  authRoutes,
  userRoutes,
  productRoutes,
  movementRoutes,
  reportRoutes,
  agentRoutes,
} from './routes/index.js';

dotenv.config();

const initializeApp = async () => {
  const app = express();
  const server = createServer(app);

  // Setup middleware
  setupMiddleware(app);

  // Setup audit middleware
  app.use(auditMiddleware);

  // Setup Socket.io
  setupSocketIO(server);

  // Setup routes
  setupRoutes(app, {
    authRoutes,
    userRoutes,
    productRoutes,
    movementRoutes,
    reportRoutes,
    agentRoutes,
  });

  // Setup error handler
  app.use(errorHandler);

  // Setup database associations
  setupDatabaseAssociations();

  // Sync database
  await syncDatabase();

  // Start server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return server;
};

// Initialize and start app
initializeApp().catch((err) => {
  console.error('Failed to initialize app:', err);
  process.exit(1);
});