"""
Image-to-Code API Route
Converts uploaded images to HTML/React/Next.js code using AI
"""

from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from typing import Optional
import os
from utils.image_processor import process_image
from utils.openai_handler import generate_code_from_image

router = APIRouter()

@router.post("/convert")
async def convert_image_to_code(
    file: UploadFile = File(...),
    framework: str = Form(default="react"),
    include_styling: bool = Form(default=True),
    model: str = Form(default="gpt-4-vision-preview")
):
    """
    Convert an uploaded image to code
    
    Args:
        file: Image file to convert
        framework: Target framework (html, react, nextjs, vue)
        include_styling: Whether to include CSS/Tailwind styling
        model: AI model to use for conversion
    
    Returns:
        Generated code and metadata
    """
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Process image
        image_data = await process_image(file)
        
        # Generate code using AI
        code_result = await generate_code_from_image(
            image_data=image_data,
            framework=framework,
            include_styling=include_styling,
            model=model
        )
        
        return {
            "success": True,
            "code": code_result["code"],
            "framework": framework,
            "metadata": {
                "model_used": model,
                "include_styling": include_styling,
                "image_dimensions": image_data.get("dimensions")
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.get("/frameworks")
async def get_supported_frameworks():
    """Get list of supported frameworks"""
    return {
        "frameworks": [
            {"id": "html", "name": "HTML + CSS", "description": "Pure HTML with CSS styling"},
            {"id": "react", "name": "React", "description": "React functional components with hooks"},
            {"id": "nextjs", "name": "Next.js", "description": "Next.js 16 with App Router"},
            {"id": "vue", "name": "Vue", "description": "Vue 3 with Composition API"},
            {"id": "tailwind", "name": "Tailwind", "description": "HTML with Tailwind CSS"}
        ]
    }
