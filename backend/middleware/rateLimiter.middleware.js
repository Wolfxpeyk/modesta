/**
 * Rate Limiting Middleware for Modesta Resort
 *
 * Protects API endpoints from abuse with intelligent rate limiting
 */

import rateLimit from 'express-rate-limit';
import redis from '../config/redis.js';

/**
 * General API rate limiter
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for authentication endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Moderate rate limiter for booking endpoints
 */
export const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 booking requests per hour
  message: {
    success: false,
    message: 'Too many booking requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Payment endpoint rate limiter
 */
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 payment requests per hour
  message: {
    success: false,
    message: 'Too many payment requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Custom rate limiter using Redis for distributed systems
 */
export const createRedisRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100,
    keyPrefix = 'rl',
  } = options;

  return async (req, res, next) => {
    try {
      const key = `${keyPrefix}:${req.ip}`;
      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, Math.ceil(windowMs / 1000));
      }

      if (current > max) {
        const ttl = await redis.ttl(key);
        res.set('Retry-After', ttl);
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.',
          retryAfter: ttl,
        });
      }

      res.set('X-RateLimit-Limit', max);
      res.set('X-RateLimit-Remaining', Math.max(0, max - current));

      next();
    } catch (error) {
      // If Redis fails, allow the request but log the error
      console.error('Rate limiter error:', error);
      next();
    }
  };
};

export default {
  apiLimiter,
  authLimiter,
  bookingLimiter,
  paymentLimiter,
  createRedisRateLimiter,
};
