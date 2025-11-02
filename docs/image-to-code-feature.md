# Image to Code Feature

## Overview

The Image to Code feature allows users to upload screenshots, UI mockups, or design images and automatically generate corresponding frontend code using AI vision models.

## Features

- **Multiple AI Providers**: Choose between OpenAI GPT-4 Vision or Anthropic Claude Sonnet
- **Drag-and-Drop Upload**: Easy file upload with drag-and-drop support
- **File Type Support**: JPEG, PNG, and WebP images
- **Size Validation**: Maximum 10MB file size
- **Live Preview**: Preview uploaded images before conversion
- **Code Display**: View generated code with syntax highlighting
- **One-Click Integration**: Add generated code directly to your project

## How to Use

### 1. Access the Feature

From the builder interface, click the **"Import from Image"** button in the top toolbar.

### 2. Select AI Provider

Choose your preferred AI provider:
- **OpenAI GPT-4 Vision**: Best for detailed UI analysis
- **Claude Sonnet 3.5**: Alternative provider with good results

### 3. Upload Image

You can upload an image in two ways:
- **Drag and Drop**: Drag your image file into the upload area
- **Browse**: Click "Select Image" to browse your files

Supported formats: JPEG, PNG, WebP (max 10MB)

### 4. Generate Code

Click the **"Generate Code"** button to start the AI analysis. The system will:
1. Upload your image securely
2. Send it to the selected AI provider
3. Analyze the UI design
4. Generate clean, production-ready code

This process typically takes 10-30 seconds depending on image complexity.

### 5. Review Generated Code

The generated code will be displayed in a syntax-highlighted viewer. You can:
- Review the code structure
- Copy specific parts
- Generate again with a different provider if needed

### 6. Add to Project

Click **"Add to Project"** to integrate the generated code into your current workspace. The code will be added as a new component in your builder canvas.

## API Configuration

### Environment Variables

The following environment variables must be configured for the feature to work:

```bash
# Choose your AI provider
AI_PROVIDER=openai  # or anthropic

# OpenAI Configuration (if using OpenAI)
OPENAI_API_KEY=sk-your-api-key-here

# Anthropic Configuration (if using Anthropic)
ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Image upload settings (optional)
IMAGE_UPLOAD_MAX_SIZE=10485760  # 10MB in bytes
IMAGE_UPLOAD_ALLOWED_FORMATS=image/jpeg,image/jpg,image/png,image/webp
```

### API Endpoint

**POST** `/api/v1/image-to-code`

**Authentication**: Required (Bearer token)

**Request Format**: `multipart/form-data`

**Parameters**:
- `image` (file): The image file to convert
- `provider` (string, optional): AI provider to use (`openai` or `anthropic`)

**Response Format**:
```json
{
  "success": true,
  "message": "Code generated successfully",
  "data": {
    "code": "<div>...</div>",
    "provider": "openai",
    "model": "gpt-4-vision-preview"
  }
}
```

## Security Considerations

### API Key Storage

- **Never** hardcode API keys in the application
- Store API keys in environment variables
- Use secret management systems in production
- Rotate API keys regularly

### File Upload Security

- Only allowed image formats are accepted
- File size is limited to 10MB
- Uploaded files are automatically deleted after processing
- File type validation prevents malicious uploads

### Rate Limiting

The API endpoint is protected by the application's rate limiting middleware to prevent abuse and manage costs.

## Troubleshooting

### "AI service not configured"

**Solution**: Ensure the appropriate API key is set in your environment variables:
- For OpenAI: Set `OPENAI_API_KEY`
- For Anthropic: Set `ANTHROPIC_API_KEY`

### "Invalid file type"

**Solution**: Only JPEG, PNG, and WebP images are supported. Convert your image to one of these formats.

### "File size exceeds maximum limit"

**Solution**: Reduce your image file size to under 10MB. You can compress the image or reduce its dimensions.

### "Failed to generate code"

**Possible causes**:
1. API key is invalid or expired
2. AI service rate limit exceeded
3. Network connectivity issues
4. Image quality is too low

**Solution**: Check your API key configuration and try again. If the problem persists, contact support.

## Best Practices

### For Best Results

1. **Use High-Quality Images**: Clear, high-resolution screenshots produce better code
2. **Simple Layouts First**: Start with simpler UIs to understand the output
3. **Review and Refine**: Always review generated code before using in production
4. **Combine with Manual Editing**: Use the generated code as a starting point

### Image Guidelines

- Use screenshots of actual websites or apps
- Ensure text is readable in the image
- Avoid images with heavy branding or copyrighted content
- Include complete UI sections rather than fragments

## Cost Considerations

Both OpenAI and Anthropic charge for API usage:
- OpenAI GPT-4 Vision: ~$0.01-0.03 per image
- Anthropic Claude Sonnet: ~$0.003-0.015 per image

Costs vary based on image size and complexity. Monitor your API usage to manage costs effectively.

## Technical Details

### Supported Output Formats

The AI can generate code in several formats:
- HTML with inline CSS
- HTML + separate CSS
- React components (JSX)
- React with Tailwind CSS
- Plain JavaScript

The exact output format depends on what the AI determines is most appropriate for the input image.

### Processing Flow

1. User uploads image → Frontend validation
2. File sent to backend → Server-side validation
3. Image encoded to base64 → Sent to AI provider
4. AI analyzes image → Generates code
5. Code returned to frontend → Displayed to user
6. User adds to project → Code integrated into builder

### Error Handling

The system handles various error scenarios gracefully:
- Invalid file types are rejected before upload
- File size validation prevents large uploads
- API errors are caught and user-friendly messages displayed
- Uploaded files are cleaned up even if errors occur

## Future Enhancements

Planned improvements for this feature:
- Support for more AI providers (Google Gemini, etc.)
- Batch processing of multiple images
- Export generated code as separate files
- AI-powered code refinement and optimization
- Support for design files (Figma, Sketch)
- Mobile app layout generation

## Feedback and Support

If you encounter issues or have suggestions for improving this feature, please:
- Open an issue on GitHub
- Contact support through the application
- Join our community Discord for help

---

**Last Updated**: 2025-11-02
**Version**: 1.0.0
