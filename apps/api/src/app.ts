import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import healthRouter from './routes/health.routes';
import { notFoundHandler, errorHandler } from './middleware/error-handler';

const app = express();

// CORS configuration with explicit origin (no wildcards with credentials)
const allowedOrigins = [config.clientUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Cookie parsing middleware
app.use(cookieParser());

// Body parsing middleware
app.use(express.json());

// API v1 Routes
app.use('/api/v1/health', healthRouter);

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
