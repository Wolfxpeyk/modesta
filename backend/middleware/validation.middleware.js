/**
 * Validation Middleware for Modesta Resort
 *
 * Input validation and sanitization using express-validator
 */

import { validationResult } from 'express-validator';

/**
 * Validate request and return errors if any
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

export default validate;
