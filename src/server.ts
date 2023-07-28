import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'reflect-metadata';

import { initializeDB } from './config/db';

dotenv.config();
initializeDB();

import BaseRouter from './routes';
import { logger } from '../logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// log API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message,
  });
});

// Add router
app.use('/api', BaseRouter);

app.use('*', (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: 'Route not found',
  });
});

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

export default app;
