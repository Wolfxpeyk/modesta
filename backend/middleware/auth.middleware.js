/**
 * Authentication Middleware for Modesta Resort
 *
 * Protects routes and validates JWT tokens
 */

import { verifyAccessToken } from '../utils/auth.js';
import { executeQuery } from '../config/database.js';

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check if user still exists and is active
    const [user] = await executeQuery(
      'SELECT id, uuid, email, role, first_name, last_name, is_active FROM users WHERE id = ? AND is_active = TRUE',
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive.',
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      error: error.message,
    });
  }
};

/**
 * Authorize specific roles
 * @param {...string} roles - Allowed roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

/**
 * Optional authentication - attaches user if token is valid but doesn't fail if not
 */
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyAccessToken(token);

      const [user] = await executeQuery(
        'SELECT id, uuid, email, role, first_name, last_name FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.id]
      );

      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // Silently fail for optional authentication
  }

  next();
};

export default { authenticate, authorize, optionalAuthenticate };
