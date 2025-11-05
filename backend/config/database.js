/**
 * Database Configuration for Modesta Resort
 *
 * MySQL connection pool setup with optimal configuration for
 * high-performance luxury resort operations.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool with optimized settings
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'modesta_resort',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
  timezone: 'Z', // UTC
  dateStrings: false,
});

/**
 * Test database connection
 */
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

/**
 * Execute a query with automatic error handling
 * @param {string} query - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export const executeQuery = async (query, params = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Query execution error:', error.message);
    throw error;
  }
};

/**
 * Execute a transaction
 * @param {Function} callback - Async function containing transaction logic
 * @returns {Promise} Transaction result
 */
export const executeTransaction = async (callback) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Get a connection from the pool for complex operations
 * @returns {Promise} Database connection
 */
export const getConnection = async () => {
  return await pool.getConnection();
};

export default pool;
