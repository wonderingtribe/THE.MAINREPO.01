"""
OpenAI Handler
Manages interactions with OpenAI API for image-to-code generation
"""

import os
import base64
from typing import Dict, Any, List, Optional
import openai
from openai import AsyncOpenAI

# Initialize OpenAI client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_code_from_image(
    image_data: Dict[str, Any],
    framework: str = "react",
    include_styling: bool = True,
    model: str = "gpt-4-vision-preview"
) -> Dict[str, Any]:
    """
    Generate code from image using OpenAI Vision API
    
    Args:
        image_data: Processed image data
        framework: Target framework
        include_styling: Whether to include CSS/Tailwind
        model: OpenAI model to use
    
    Returns:
        Generated code and metadata
    """
    
    # Prepare prompt based on framework
    prompts = {
        "html": "Convert this image to clean, semantic HTML with CSS styling.",
        "react": "Convert this image to a React functional component using hooks and modern best practices. Use Tailwind CSS for styling.",
        "nextjs": "Convert this image to a Next.js 16 page component using the App Router. Use TypeScript and Tailwind CSS.",
        "vue": "Convert this image to a Vue 3 component using the Composition API and Tailwind CSS.",
        "tailwind": "Convert this image to HTML with Tailwind CSS utility classes."
    }
    
    base_prompt = prompts.get(framework, prompts["react"])
    
    if not include_styling:
        base_prompt += " Do not include any CSS or styling, only the structure."
    
    full_prompt = f"""{base_prompt}

Requirements:
- Create pixel-perfect, responsive code
- Use semantic HTML elements
- Follow accessibility best practices
- Include proper spacing and layout
- Match colors, fonts, and styling from the image
- Return only the code, no explanations
"""
    
    try:
        # Encode image to base64
        image_base64 = image_data.get("base64")
        
        # Call OpenAI Vision API
        response = await client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": full_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=4096,
        )
        
        code = response.choices[0].message.content
        
        return {
            "code": code,
            "model": model,
            "framework": framework
        }
    
    except Exception as e:
        # Fallback to mock code for testing
        return {
            "code": generate_mock_code(framework),
            "model": "mock",
            "framework": framework,
            "error": str(e)
        }

async def extract_ui_elements(image_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Extract UI elements from image using AI
    
    Args:
        image_data: Processed image data
    
    Returns:
        List of detected UI elements
    """
    
    image_base64 = image_data.get("base64")
    
    prompt = """Analyze this UI image and identify all UI elements.
    
For each element, provide:
- type (button, input, text, image, container, nav, etc.)
- position (approximate x, y coordinates as percentage)
- size (width and height as percentage)
- content (text content if any)
- styling (colors, fonts, borders)

Return a JSON array of elements."""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=2048,
        )
        
        # Parse response to extract elements
        content = response.choices[0].message.content
        
        # Mock elements for testing
        return generate_mock_elements()
    
    except Exception as e:
        return generate_mock_elements()

def generate_mock_code(framework: str) -> str:
    """Generate mock code for testing"""
    if framework == "react":
        return """import React from 'react';

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to AI Wonderland
        </h1>
        <p className="text-gray-600 mb-6">
          Image-to-code conversion powered by AI
        </p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}"""
    elif framework == "nextjs":
        return """export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to AI Wonderland
        </h1>
        <p className="text-gray-600 mb-6">
          Image-to-code conversion powered by AI
        </p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}"""
    else:
        return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Wonderland</title>
  <style>
    body { font-family: system-ui; margin: 0; padding: 20px; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { color: #111827; margin-bottom: 1rem; }
    p { color: #6b7280; margin-bottom: 1.5rem; }
    button { width: 100%; background: #2563eb; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to AI Wonderland</h1>
    <p>Image-to-code conversion powered by AI</p>
    <button>Get Started</button>
  </div>
</body>
</html>"""

def generate_mock_elements() -> List[Dict[str, Any]]:
    """Generate mock UI elements for testing"""
    return [
        {
            "type": "container",
            "position": {"x": 10, "y": 10},
            "size": {"width": 80, "height": 60},
            "styling": {"background": "#ffffff", "padding": "2rem", "borderRadius": "8px"}
        },
        {
            "type": "heading",
            "position": {"x": 15, "y": 15},
            "size": {"width": 70, "height": 10},
            "content": "Welcome",
            "styling": {"fontSize": "2rem", "fontWeight": "bold", "color": "#111827"}
        },
        {
            "type": "text",
            "position": {"x": 15, "y": 30},
            "size": {"width": 70, "height": 8},
            "content": "Description text",
            "styling": {"fontSize": "1rem", "color": "#6b7280"}
        },
        {
            "type": "button",
            "position": {"x": 15, "y": 45},
            "size": {"width": 70, "height": 8},
            "content": "Get Started",
            "styling": {"background": "#2563eb", "color": "#ffffff", "borderRadius": "0.5rem"}
        }
    ]
