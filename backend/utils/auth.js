/**
 * Authentication Utilities for Modesta Resort
 *
 * JWT token generation, validation, and password hashing utilities
 * with enterprise-grade security.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} Match result
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate access token
 * @param {Object} payload - Token payload
 * @returns {string} JWT access token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
    issuer: 'modesta-resort',
  });
};

/**
 * Generate refresh token
 * @param {Object} payload - Token payload
 * @returns {string} JWT refresh token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
    issuer: 'modesta-resort',
  });
};

/**
 * Verify access token
 * @param {string} token - JWT access token
 * @returns {Object} Decoded token payload
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Verify refresh token
 * @param {string} token - JWT refresh token
 * @returns {Object} Decoded token payload
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

/**
 * Generate unique UUID v4
 * @returns {string} UUID
 */
export const generateUUID = () => {
  return crypto.randomUUID();
};

/**
 * Generate random token for password reset, etc.
 * @param {number} length - Token length
 * @returns {string} Random token
 */
export const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate booking reference
 * @returns {string} Unique booking reference
 */
export const generateBookingReference = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `MR-${timestamp}${random}`;
};

/**
 * Generate payment reference
 * @returns {string} Unique payment reference
 */
export const generatePaymentReference = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `PAY-${timestamp}${random}`;
};

/**
 * Sanitize user data for token payload
 * @param {Object} user - User object from database
 * @returns {Object} Sanitized user data
 */
export const sanitizeUserForToken = (user) => {
  return {
    id: user.id,
    uuid: user.uuid,
    email: user.email,
    role: user.role,
    firstName: user.first_name,
    lastName: user.last_name,
  };
};

/**
 * Calculate token expiration timestamp
 * @param {string} expiresIn - Expiration time (e.g., '15m', '7d')
 * @returns {Date} Expiration date
 */
export const calculateTokenExpiration = (expiresIn) => {
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return new Date(Date.now() + 15 * 60 * 1000); // Default 15 minutes

  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * multipliers[unit]);
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Validation result
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} Validation result with details
 */
export const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid =
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar;

  return {
    isValid,
    errors: [
      !password.length >= minLength && `Minimum ${minLength} characters required`,
      !hasUpperCase && 'At least one uppercase letter required',
      !hasLowerCase && 'At least one lowercase letter required',
      !hasNumbers && 'At least one number required',
      !hasSpecialChar && 'At least one special character required',
    ].filter(Boolean),
  };
};

export default {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateUUID,
  generateRandomToken,
  generateBookingReference,
  generatePaymentReference,
  sanitizeUserForToken,
  calculateTokenExpiration,
  isValidEmail,
  validatePasswordStrength,
};
