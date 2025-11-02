"""
Export API Route
Handles code export in various formats
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from typing import Optional, List
import io
import zipfile
import os

router = APIRouter()

class ExportRequest(BaseModel):
    code: str
    framework: str
    projectName: str
    includePackageJson: bool = True
    includeReadme: bool = True

@router.post("/generate-files")
async def generate_export_files(request: ExportRequest):
    """
    Generate project files for export
    
    Args:
        request: Export configuration
    
    Returns:
        Project files structure
    """
    try:
        files = []
        
        # Add main code file
        if request.framework == "react" or request.framework == "nextjs":
            files.append({
                "path": "App.tsx" if request.framework == "react" else "app/page.tsx",
                "content": request.code
            })
        elif request.framework == "html":
            files.append({
                "path": "index.html",
                "content": request.code
            })
        
        # Add package.json if requested
        if request.includePackageJson and request.framework in ["react", "nextjs"]:
            package_json = generate_package_json(request.projectName, request.framework)
            files.append({
                "path": "package.json",
                "content": package_json
            })
        
        # Add README if requested
        if request.includeReadme:
            readme = generate_readme(request.projectName, request.framework)
            files.append({
                "path": "README.md",
                "content": readme
            })
        
        return {
            "success": True,
            "files": files,
            "projectName": request.projectName
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating files: {str(e)}")

@router.post("/download-zip")
async def download_as_zip(request: ExportRequest):
    """
    Generate and download project as ZIP file
    
    Args:
        request: Export configuration
    
    Returns:
        ZIP file containing all project files
    """
    try:
        # Create in-memory ZIP file
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            # Add main code file
            if request.framework == "react":
                zip_file.writestr("src/App.tsx", request.code)
            elif request.framework == "nextjs":
                zip_file.writestr("app/page.tsx", request.code)
            elif request.framework == "html":
                zip_file.writestr("index.html", request.code)
            
            # Add package.json
            if request.includePackageJson and request.framework in ["react", "nextjs"]:
                package_json = generate_package_json(request.projectName, request.framework)
                zip_file.writestr("package.json", package_json)
            
            # Add README
            if request.includeReadme:
                readme = generate_readme(request.projectName, request.framework)
                zip_file.writestr("README.md", readme)
        
        zip_buffer.seek(0)
        
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                "Content-Disposition": f"attachment; filename={request.projectName}.zip"
            }
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating ZIP: {str(e)}")

def generate_package_json(project_name: str, framework: str) -> str:
    """Generate package.json content"""
    if framework == "nextjs":
        return f'''{{
  "name": "{project_name}",
  "version": "0.1.0",
  "private": true,
  "scripts": {{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }},
  "dependencies": {{
    "next": "16.0.0",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  }},
  "devDependencies": {{
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }}
}}'''
    else:  # react
        return f'''{{
  "name": "{project_name}",
  "version": "0.1.0",
  "private": true,
  "scripts": {{
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }},
  "dependencies": {{
    "react": "19.2.0",
    "react-dom": "19.2.0"
  }},
  "devDependencies": {{
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }}
}}'''

def generate_readme(project_name: str, framework: str) -> str:
    """Generate README.md content"""
    return f'''# {project_name}

Generated with AI Wonderland Image-to-Code

## Framework

{framework}

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Learn More

- [AI Wonderland Documentation](https://github.com/AI-WONDER-LABs)
- [{framework.title()} Documentation](https://{framework}.dev)
'''
