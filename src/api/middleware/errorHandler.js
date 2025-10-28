/**
 * Error Handler Middleware
 * Sanitizes error responses to prevent information disclosure
 */

const config = require('../../config');

const errorHandler = (err, req, res, _next) => {
  // Log error details only in development (not to client)
  if (config.env === 'development') {
    console.error('Error:', err);
  } else {
    // In production, log only essential error info without stack traces
    console.error('Error:', {
      name: err.name,
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate key error',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error - don't expose internal error details in production
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  
  // Hide internal error messages in production for 500 errors
  if (statusCode === 500 && config.env === 'production') {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
