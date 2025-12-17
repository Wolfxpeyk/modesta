/**
 * Error Handling Middleware for Modesta Resort
 *
 * Centralized error handling with detailed logging and user-friendly responses
 */

import logger from '../utils/logger.js';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found handler
 */
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};

/**
 * Global error handler
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Log error
  if (statusCode === 500) {
    logger.error(`${message}\n${err.stack}`);
  } else {
    logger.warn(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }

  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Duplicate entry. This record already exists.';
  } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    statusCode = 400;
    message = 'Invalid reference. Related record does not exist.';
  } else if (err.code?.startsWith('ER_')) {
    statusCode = 500;
    message = 'Database error occurred.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired.';
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed.';
  }

  // Multer errors (file upload)
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large. Maximum size is 5MB.';
    } else {
      message = `File upload error: ${err.message}`;
    }
  }

  // Stripe errors
  if (err.type?.startsWith('Stripe')) {
    statusCode = 400;
    message = `Payment error: ${err.message}`;
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'An unexpected error occurred. Please try again later.';
    errors = [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      originalError: err.message,
    }),
  });
};

/**
 * Async handler wrapper to catch async errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default { ApiError, notFound, errorHandler, asyncHandler };
