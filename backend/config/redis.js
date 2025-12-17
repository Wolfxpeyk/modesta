/**
 * Redis Configuration for Modesta Resort
 *
 * High-performance caching layer for session management,
 * rate limiting, and application caching.
 */

import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Create Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error.message);
});

/**
 * Cache helper functions
 */

/**
 * Set cache with expiration
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} expireSeconds - Expiration in seconds
 */
export const setCache = async (key, value, expireSeconds = 3600) => {
  try {
    const serialized = JSON.stringify(value);
    await redis.setex(key, expireSeconds, serialized);
  } catch (error) {
    console.error('Cache set error:', error.message);
  }
};

/**
 * Get cached value
 * @param {string} key - Cache key
 * @returns {Promise<any>} Cached value or null
 */
export const getCache = async (key) => {
  try {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Cache get error:', error.message);
    return null;
  }
};

/**
 * Delete cache key
 * @param {string} key - Cache key
 */
export const deleteCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error.message);
  }
};

/**
 * Delete cache keys by pattern
 * @param {string} pattern - Key pattern (e.g., 'user:*')
 */
export const deleteCachePattern = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Cache pattern delete error:', error.message);
  }
};

/**
 * Check if key exists in cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>}
 */
export const cacheExists = async (key) => {
  try {
    const exists = await redis.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Cache exists check error:', error.message);
    return false;
  }
};

export default redis;
