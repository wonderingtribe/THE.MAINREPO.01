"""
FastAPI Backend for AI Wonderland Image-to-Code
Main entry point for the backend API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routes
from routes import image_to_code, ai_extraction, export

app = FastAPI(
    title="AI Wonderland Backend API",
    description="FastAPI backend for Image-to-Code and AI Wonderland builder",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(image_to_code.router, prefix="/api/image-to-code", tags=["image-to-code"])
app.include_router(ai_extraction.router, prefix="/api/ai-extraction", tags=["ai-extraction"])
app.include_router(export.router, prefix="/api/export", tags=["export"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Wonderland Backend API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
