/**
 * Authentication Middleware
 * Protects routes requiring authentication
 */

const crypto = require('crypto');
const { verifyAccessToken } = require('./jwt');
const User = require('../models/User');

/**
 * Middleware to verify JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token);

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive',
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Middleware to verify API key
 * Uses constant-time comparison to prevent timing attacks
 * 
 * Note: This implementation uses an indexed database query for performance,
 * followed by constant-time comparison. For maximum security against timing attacks,
 * consider storing hashed API keys in the database and comparing hashes.
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    // Get API key from header
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'No API key provided',
      });
    }

    // Find user by API key (indexed query for performance)
    // Note: For maximum timing attack protection, consider using hashed API keys
    const user = await User.findOne({ apiKey, isActive: true });
    
    if (!user || !user.apiKey) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }

    // Additional constant-time comparison to prevent timing attacks at application level
    const apiKeyBuffer = Buffer.from(apiKey);
    const userApiKeyBuffer = Buffer.from(user.apiKey);
    
    if (apiKeyBuffer.length !== userApiKeyBuffer.length) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }
    
    if (!crypto.timingSafeEqual(apiKeyBuffer, userApiKeyBuffer)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key',
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

/**
 * Middleware to check if user is admin
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};

module.exports = {
  authenticate,
  authenticateApiKey,
  requireAdmin,
};
