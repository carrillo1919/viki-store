import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

export const setupMiddleware = (app) => {
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  }));
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
};

export const setupRoutes = (app, routes) => {
  app.use('/api/auth', routes.authRoutes);
  app.use('/api/users', routes.userRoutes);
  app.use('/api/products', routes.productRoutes);
  app.use('/api/movements', routes.movementRoutes);
  app.use('/api/reports', routes.reportRoutes);
  app.use('/api/agent', routes.agentRoutes);
};