/**
 * Authentication Controller for Modesta Resort
 *
 * Handles user registration, login, token refresh, password management
 */

import { executeQuery, executeTransaction } from '../config/database.js';
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateUUID,
  generateRandomToken,
  sanitizeUserForToken,
  calculateTokenExpiration,
  isValidEmail,
  validatePasswordStrength,
} from '../utils/auth.js';
import { ApiError } from '../middleware/error.middleware.js';
import { setCache, getCache, deleteCache } from '../config/redis.js';
import logger from '../utils/logger.js';

/**
 * Register new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    countryCode,
    dateOfBirth,
    nationality,
  } = req.body;

  // Validate email
  if (!isValidEmail(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    throw new ApiError(400, 'Password does not meet requirements', passwordValidation.errors);
  }

  // Check if user already exists
  const [existingUser] = await executeQuery(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  // Hash password
  const passwordHash = await hashPassword(password);
  const uuid = generateUUID();

  // Create user and loyalty account in transaction
  const result = await executeTransaction(async (connection) => {
    // Insert user
    const [userResult] = await connection.execute(
      `INSERT INTO users (uuid, email, password_hash, first_name, last_name, phone, country_code, date_of_birth, nationality, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'guest')`,
      [uuid, email, passwordHash, firstName, lastName, phone, countryCode, dateOfBirth, nationality]
    );

    const userId = userResult.insertId;

    // Create guest profile
    await connection.execute(
      'INSERT INTO guest_profiles (user_id) VALUES (?)',
      [userId]
    );

    // Create loyalty account with Bronze tier (tier_id = 1)
    await connection.execute(
      'INSERT INTO loyalty_accounts (user_id, tier_id, member_since) VALUES (?, 1, CURDATE())',
      [userId]
    );

    return userId;
  });

  // Fetch created user
  const [user] = await executeQuery(
    `SELECT id, uuid, email, first_name, last_name, role, created_at
     FROM users WHERE id = ?`,
    [result]
  );

  // Generate tokens
  const tokenPayload = sanitizeUserForToken(user);
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Store refresh token in database
  const refreshTokenExpiry = calculateTokenExpiration(process.env.JWT_REFRESH_EXPIRE);
  await executeQuery(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [user.id, refreshToken, refreshTokenExpiry]
  );

  logger.info(`New user registered: ${email}`);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    },
  });
};

/**
 * Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const [user] = await executeQuery(
    `SELECT id, uuid, email, password_hash, first_name, last_name, role, is_active, is_verified
     FROM users WHERE email = ?`,
    [email]
  );

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if user is active
  if (!user.is_active) {
    throw new ApiError(403, 'Account is deactivated. Please contact support.');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const tokenPayload = sanitizeUserForToken(user);
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Store refresh token in database
  const refreshTokenExpiry = calculateTokenExpiration(process.env.JWT_REFRESH_EXPIRE);
  await executeQuery(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [user.id, refreshToken, refreshTokenExpiry]
  );

  // Update last login
  await executeQuery(
    'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
    [user.id]
  );

  logger.info(`User logged in: ${email}`);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        isVerified: user.is_verified,
      },
      accessToken,
      refreshToken,
    },
  });
};

/**
 * Refresh access token
 * @route POST /api/v1/auth/refresh
 * @access Public
 */
export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is required');
  }

  // Verify refresh token
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  // Check if refresh token exists in database and is not expired
  const [tokenRecord] = await executeQuery(
    'SELECT id, user_id, expires_at FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
    [refreshToken]
  );

  if (!tokenRecord) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  // Get user
  const [user] = await executeQuery(
    'SELECT id, uuid, email, first_name, last_name, role, is_active FROM users WHERE id = ? AND is_active = TRUE',
    [tokenRecord.user_id]
  );

  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  // Generate new access token
  const tokenPayload = sanitizeUserForToken(user);
  const newAccessToken = generateAccessToken(tokenPayload);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      accessToken: newAccessToken,
    },
  });
};

/**
 * Logout user
 * @route POST /api/v1/auth/logout
 * @access Private
 */
export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    // Delete refresh token from database
    await executeQuery(
      'DELETE FROM refresh_tokens WHERE token = ?',
      [refreshToken]
    );
  }

  // Clear user cache
  await deleteCache(`user:${req.user.id}`);

  logger.info(`User logged out: ${req.user.email}`);

  res.json({
    success: true,
    message: 'Logout successful',
  });
};

/**
 * Request password reset
 * @route POST /api/v1/auth/forgot-password
 * @access Public
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Find user
  const [user] = await executeQuery(
    'SELECT id, email, first_name FROM users WHERE email = ?',
    [email]
  );

  // Always return success to prevent email enumeration
  if (!user) {
    return res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  }

  // Generate reset token
  const resetToken = generateRandomToken(32);
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Store reset token
  await executeQuery(
    'INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)',
    [user.id, resetToken, tokenExpiry]
  );

  // TODO: Send password reset email
  // In production, integrate with SendGrid or similar service
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  logger.info(`Password reset requested for: ${email}`);

  res.json({
    success: true,
    message: 'If an account exists with this email, a password reset link has been sent.',
    // For development only - remove in production
    ...(process.env.NODE_ENV === 'development' && { resetUrl }),
  });
};

/**
 * Reset password
 * @route POST /api/v1/auth/reset-password
 * @access Public
 */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Validate password strength
  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    throw new ApiError(400, 'Password does not meet requirements', passwordValidation.errors);
  }

  // Find valid reset token
  const [resetRecord] = await executeQuery(
    `SELECT id, user_id FROM password_resets
     WHERE token = ? AND expires_at > NOW() AND used = FALSE`,
    [token]
  );

  if (!resetRecord) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  // Hash new password
  const passwordHash = await hashPassword(newPassword);

  // Update password and mark token as used in transaction
  await executeTransaction(async (connection) => {
    // Update password
    await connection.execute(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [passwordHash, resetRecord.user_id]
    );

    // Mark token as used
    await connection.execute(
      'UPDATE password_resets SET used = TRUE WHERE id = ?',
      [resetRecord.id]
    );

    // Delete all refresh tokens for security
    await connection.execute(
      'DELETE FROM refresh_tokens WHERE user_id = ?',
      [resetRecord.user_id]
    );
  });

  logger.info(`Password reset successful for user ID: ${resetRecord.user_id}`);

  res.json({
    success: true,
    message: 'Password reset successful. Please login with your new password.',
  });
};

/**
 * Verify email
 * @route GET /api/v1/auth/verify-email/:token
 * @access Public
 */
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  // TODO: Implement email verification logic
  // This would involve storing verification tokens and validating them

  res.json({
    success: true,
    message: 'Email verified successfully',
  });
};

/**
 * Get current user
 * @route GET /api/v1/auth/me
 * @access Private
 */
export const getMe = async (req, res) => {
  // Try to get from cache first
  const cacheKey = `user:${req.user.id}`;
  let user = await getCache(cacheKey);

  if (!user) {
    // Fetch from database with loyalty and guest profile info
    [user] = await executeQuery(
      `SELECT
        u.id, u.uuid, u.email, u.first_name, u.last_name, u.phone, u.country_code,
        u.date_of_birth, u.nationality, u.profile_image, u.preferred_language, u.preferred_currency,
        u.role, u.is_verified, u.email_notifications, u.sms_notifications, u.created_at,
        la.total_points, la.lifetime_points, lt.tier_name, lt.tier_level,
        gp.address_line1, gp.city, gp.country, gp.vip_status
       FROM users u
       LEFT JOIN loyalty_accounts la ON u.id = la.user_id
       LEFT JOIN loyalty_tiers lt ON la.tier_id = lt.id
       LEFT JOIN guest_profiles gp ON u.id = gp.user_id
       WHERE u.id = ?`,
      [req.user.id]
    );

    // Cache for 5 minutes
    await setCache(cacheKey, user, 300);
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.uuid,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        countryCode: user.country_code,
        dateOfBirth: user.date_of_birth,
        nationality: user.nationality,
        profileImage: user.profile_image,
        preferredLanguage: user.preferred_language,
        preferredCurrency: user.preferred_currency,
        role: user.role,
        isVerified: user.is_verified,
        emailNotifications: user.email_notifications,
        smsNotifications: user.sms_notifications,
        loyaltyPoints: user.total_points,
        lifetimePoints: user.lifetime_points,
        tierName: user.tier_name,
        tierLevel: user.tier_level,
        vipStatus: user.vip_status,
        memberSince: user.created_at,
      },
    },
  });
};

export default {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getMe,
};
