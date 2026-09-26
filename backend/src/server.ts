import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import workerRoutes from './routes/workerRoutes';
import customerRoutes from './routes/customerRoutes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for mobile app requests
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: '🚀 HunarGo TypeScript Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    database: 'MongoDB',
    service: 'HunarGo TypeScript Backend',
  });
});

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/customer', customerRoutes);

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Global Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 HunarGo TypeScript Server running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
  console.log(`📱 Android Emulator URL: http://10.0.2.2:${PORT}/api`);
  console.log(`=================================================\n`);
});
