/**
 * API Routes Index
 * Aggregates all API routes
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const hybridProjectRoutes = require('./hybridProjects');
const imageToCodeRoutes = require('./imageToCode');

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes); // Original MongoDB-only routes
router.use('/hybrid-projects', hybridProjectRoutes); // New hybrid routes (PostgreSQL + MongoDB)
router.use('/v1/image-to-code', imageToCodeRoutes); // Image to code conversion

module.exports = router;
