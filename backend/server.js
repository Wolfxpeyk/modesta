/**
 * MODESTA RESORT - MAIN SERVER
 * ============================================================================
 * Ultimate luxury resort management system
 * World-class backend architecture for exceptional guest experiences
 * ============================================================================
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import configurations
import { testConnection } from './config/database.js';
import logger from './utils/logger.js';

// Import middleware
import { apiLimiter } from './middleware/rateLimiter.middleware.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import serviceRoutes from './routes/service.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import loyaltyRoutes from './routes/loyalty.routes.js';
import reviewRoutes from './routes/review.routes.js';
import adminRoutes from './routes/admin.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import blogRoutes from './routes/blog.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO for real-time features
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Make io accessible to routes
app.set('io', io);

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com'],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      connectSrc: ["'self'", 'https://api.stripe.com'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// GENERAL MIDDLEWARE
// ============================================================================

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Trust proxy (important for rate limiting and security)
app.set('trust proxy', 1);

// ============================================================================
// API ROUTES
// ============================================================================

const API_VERSION = process.env.API_VERSION || 'v1';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Modesta Resort API is running',
    version: API_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/rooms`, roomRoutes);
app.use(`/api/${API_VERSION}/bookings`, bookingRoutes);
app.use(`/api/${API_VERSION}/payments`, paymentRoutes);
app.use(`/api/${API_VERSION}/services`, serviceRoutes);
app.use(`/api/${API_VERSION}/restaurants`, restaurantRoutes);
app.use(`/api/${API_VERSION}/loyalty`, loyaltyRoutes);
app.use(`/api/${API_VERSION}/reviews`, reviewRoutes);
app.use(`/api/${API_VERSION}/admin`, adminRoutes);
app.use(`/api/${API_VERSION}/gallery`, galleryRoutes);
app.use(`/api/${API_VERSION}/blog`, blogRoutes);

// Serve static files (uploaded images, documents, etc.)
app.use('/uploads', express.static('uploads'));

// ============================================================================
// SOCKET.IO - REAL-TIME FEATURES
// ============================================================================

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  // Join room for booking updates
  socket.on('join-booking', (bookingId) => {
    socket.join(`booking-${bookingId}`);
    logger.info(`Socket ${socket.id} joined booking room: ${bookingId}`);
  });

  // Join room for admin dashboard
  socket.on('join-admin', (userId) => {
    socket.join('admin-dashboard');
    logger.info(`Admin ${userId} joined dashboard`);
  });

  // Chat messages
  socket.on('send-message', (data) => {
    io.to(`conversation-${data.conversationId}`).emit('new-message', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      throw new Error('Database connection failed');
    }

    // Start server
    httpServer.listen(PORT, () => {
      logger.info('='.repeat(70));
      logger.info('🏨  MODESTA RESORT - LUXURY RESORT MANAGEMENT SYSTEM');
      logger.info('='.repeat(70));
      logger.info(`🚀  Server running in ${process.env.NODE_ENV || 'development'} mode`);
      logger.info(`📡  API: http://localhost:${PORT}/api/${API_VERSION}`);
      logger.info(`🔌  WebSocket: http://localhost:${PORT}`);
      logger.info(`💚  Health Check: http://localhost:${PORT}/health`);
      logger.info('='.repeat(70));
    });

    // Graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = () => {
  logger.info('Received shutdown signal, closing server gracefully...');

  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force close after 30 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown();
});

// Start the server
startServer();

export default app;
