/**
 * Image to Code Routes
 * Handles image upload and AI-powered code generation
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imageToCodeController = require('../controllers/imageToCodeController');
const { authenticate } = require('../../auth/middleware');
const config = require('../../config');

// Ensure upload directory exists
const uploadDir = config.upload.uploadDir || 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSize,
  },
});

// All routes require authentication
router.use(authenticate);

// POST /api/v1/image-to-code - Convert image to code
router.post('/', upload.single('image'), imageToCodeController.convertImageToCode);

module.exports = router;
