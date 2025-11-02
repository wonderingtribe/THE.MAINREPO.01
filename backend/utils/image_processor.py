"""
Image Processor
Handles image upload, validation, and preprocessing
"""

import base64
import io
from typing import Dict, Any
from PIL import Image
from fastapi import UploadFile
import os

MAX_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", 10485760))  # 10MB default
ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", ".jpg,.jpeg,.png,.gif,.webp").split(",")

async def process_image(file: UploadFile) -> Dict[str, Any]:
    """
    Process uploaded image file
    
    Args:
        file: Uploaded image file
    
    Returns:
        Processed image data including base64 encoding
    """
    
    # Read file content
    content = await file.read()
    
    # Validate file size
    if len(content) > MAX_SIZE:
        raise ValueError(f"File size exceeds maximum allowed size of {MAX_SIZE} bytes")
    
    # Validate file extension
    filename = file.filename.lower()
    if not any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        raise ValueError(f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}")
    
    try:
        # Open image with PIL
        image = Image.open(io.BytesIO(content))
        
        # Get image dimensions
        width, height = image.size
        
        # Convert to RGB if necessary
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Resize if too large (max 2048px on longest side)
        max_dimension = 2048
        if max(width, height) > max_dimension:
            ratio = max_dimension / max(width, height)
            new_width = int(width * ratio)
            new_height = int(height * ratio)
            image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            width, height = new_width, new_height
        
        # Convert to base64
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG", quality=90)
        image_base64 = base64.b64encode(buffered.getvalue()).decode()
        
        return {
            "base64": image_base64,
            "dimensions": {
                "width": width,
                "height": height
            },
            "format": image.format or "JPEG",
            "filename": file.filename,
            "size": len(content)
        }
    
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

def validate_image_file(file: UploadFile) -> bool:
    """
    Validate image file
    
    Args:
        file: Uploaded file
    
    Returns:
        True if valid, False otherwise
    """
    if not file.content_type.startswith("image/"):
        return False
    
    filename = file.filename.lower()
    if not any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        return False
    
    return True
