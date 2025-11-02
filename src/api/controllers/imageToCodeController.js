/**
 * Image to Code Controller
 * Handles image upload and AI-powered code generation from images
 */

const config = require('../../config');
const fs = require('fs').promises;
const path = require('path');

/**
 * Validate that file path is within allowed upload directory
 * Prevents path traversal attacks
 */
const isPathSafe = (filePath) => {
  const uploadDir = path.resolve(config.upload.uploadDir || 'uploads/');
  const resolvedPath = path.resolve(filePath);
  return resolvedPath.startsWith(uploadDir);
};

/**
 * Validate image upload
 */
const validateImageUpload = (file) => {
  if (!file) {
    return { error: 'No image file provided' };
  }

  // Validate file type
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed' };
  }

  // Validate file size (max 10MB)
  const maxSize = config.upload.maxFileSize;
  if (file.size > maxSize) {
    return { error: `File size exceeds maximum limit of ${maxSize / 1048576}MB` };
  }

  return { valid: true };
};

/**
 * Call AI vision service to generate code from image
 */
const generateCodeFromImage = async (imagePath, provider = 'openai') => {
  try {
    // Read image as base64
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    if (provider === 'openai') {
      return await generateCodeWithOpenAI(base64Image);
    } else if (provider === 'anthropic') {
      return await generateCodeWithAnthropic(base64Image);
    } else {
      throw new Error(`Unsupported AI provider: ${provider}`);
    }
  } catch (error) {
    console.error('Error generating code from image:', error);
    throw error;
  }
};

/**
 * Generate code using OpenAI GPT-4 Vision
 */
const generateCodeWithOpenAI = async (base64Image) => {
  const apiKey = config.ai.openai.apiKey;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const axios = require('axios');

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and generate clean, production-ready frontend code (HTML, CSS, and JavaScript or React component) that recreates the UI shown in the image. Include all styling and make it responsive. Return ONLY the code without explanations.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const generatedCode = response.data.choices[0].message.content;
  return {
    code: generatedCode,
    provider: 'openai',
    model: 'gpt-4-vision-preview',
  };
};

/**
 * Generate code using Anthropic Claude with vision
 */
const generateCodeWithAnthropic = async (base64Image) => {
  const apiKey = config.ai.anthropic.apiKey;
  
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  const axios = require('axios');

  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: 'Analyze this image and generate clean, production-ready frontend code (HTML, CSS, and JavaScript or React component) that recreates the UI shown in the image. Include all styling and make it responsive. Return ONLY the code without explanations.',
            },
          ],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
    }
  );

  const generatedCode = response.data.content[0].text;
  return {
    code: generatedCode,
    provider: 'anthropic',
    model: 'claude-3-sonnet-20240229',
  };
};

/**
 * Handle image to code conversion
 */
const convertImageToCode = async (req, res) => {
  try {
    // Validate file upload
    const validation = validateImageUpload(req.file);
    if (validation.error) {
      // Clean up uploaded file if validation fails
      if (req.file && req.file.path && isPathSafe(req.file.path)) {
        await fs.unlink(req.file.path).catch(() => {});
      }
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const imagePath = req.file.path;
    
    // Additional security check: ensure path is within upload directory
    if (!isPathSafe(imagePath)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file path',
      });
    }

    const provider = req.body.provider || config.ai.provider || 'openai';

    // Generate code from image
    const result = await generateCodeFromImage(imagePath, provider);

    // Clean up uploaded file
    if (isPathSafe(imagePath)) {
      await fs.unlink(imagePath).catch((err) => {
        console.error('Failed to delete uploaded file:', err);
      });
    }

    res.json({
      success: true,
      message: 'Code generated successfully',
      data: {
        code: result.code,
        provider: result.provider,
        model: result.model,
      },
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file && req.file.path && isPathSafe(req.file.path)) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    console.error('Image to code conversion error:', error);

    // Handle specific error cases
    if (error.message.includes('API key not configured')) {
      return res.status(503).json({
        success: false,
        message: 'AI service not configured. Please contact administrator.',
      });
    }

    if (error.response && error.response.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'AI service rate limit exceeded. Please try again later.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to generate code from image',
    });
  }
};

module.exports = {
  convertImageToCode,
};
