/**
 * Hybrid Project Routes
 * Routes for dual-database project management
 * Uses PostgreSQL for metadata and MongoDB for content
 */

const express = require('express');
const router = express.Router();
const hybridProjectController = require('../controllers/hybridProjectController');
// const { authenticate } = require('../../auth/middleware');

// Note: Authentication middleware is commented out for initial testing
// Uncomment when authentication is fully implemented
// router.use(authenticate);

router.post('/', hybridProjectController.createProject);
router.get('/:id', hybridProjectController.getProject);
router.put('/:id', hybridProjectController.updateProject);

module.exports = router;
