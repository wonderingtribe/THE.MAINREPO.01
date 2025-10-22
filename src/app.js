/**
 * Express Application Setup
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const apiRoutes = require('./api/routes');
const errorHandler = require('./api/middleware/errorHandler');
const { apiLimiter } = require('./api/middleware/rateLimiter');

/**
 * Create and configure Express app
 */
const createApp = () => {
  const app = express();

  // Security middleware
  app.use(helmet());

  // CORS
  app.use(cors({
    origin: config.cors.origin,
    credentials: true,
  }));

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Rate limiting
  app.use('/api/', apiLimiter);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      success: true,
      status: 'ok',
      message: 'Ai-bilder API is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api', apiRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
