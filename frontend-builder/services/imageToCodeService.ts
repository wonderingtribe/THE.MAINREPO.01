/**
 * Image to Code Service
 * Handles API calls for image-to-code conversion
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ConvertImageToCodeRequest {
  file: File;
  framework?: string;
  include_styling?: boolean;
  model?: string;
}

export interface ConvertImageToCodeResponse {
  success: boolean;
  code: string;
  framework: string;
  metadata?: {
    model_used: string;
    include_styling: boolean;
    image_dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface ExportRequest {
  code: string;
  framework: string;
  projectName: string;
  includePackageJson?: boolean;
  includeReadme?: boolean;
}

/**
 * Convert image to code using AI
 */
export async function convertImageToCode(
  file: File,
  framework: string = 'react',
  includeStyling: boolean = true,
  model: string = 'gpt-4-vision-preview'
): Promise<ConvertImageToCodeResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('framework', framework);
  formData.append('include_styling', String(includeStyling));
  formData.append('model', model);

  try {
    const response = await fetch(`${API_BASE_URL}/image-to-code/convert`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to convert image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error converting image to code:', error);
    throw error;
  }
}

/**
 * Get list of supported frameworks
 */
export async function getSupportedFrameworks() {
  try {
    const response = await fetch(`${API_BASE_URL}/image-to-code/frameworks`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch frameworks');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching frameworks:', error);
    throw error;
  }
}

/**
 * Extract UI elements from image
 */
export async function extractUIElements(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/ai-extraction/extract-elements`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to extract elements');
    }

    return await response.json();
  } catch (error) {
    console.error('Error extracting UI elements:', error);
    throw error;
  }
}

/**
 * Extract color palette from image
 */
export async function extractColors(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/ai-extraction/extract-colors`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to extract colors');
    }

    return await response.json();
  } catch (error) {
    console.error('Error extracting colors:', error);
    throw error;
  }
}

/**
 * Download project as ZIP file
 */
export async function downloadAsZip(request: ExportRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/export/download-zip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        framework: request.framework,
        projectName: request.projectName,
        includePackageJson: request.includePackageJson ?? true,
        includeReadme: request.includeReadme ?? true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate ZIP');
    }

    // Download the ZIP file
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${request.projectName}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading ZIP:', error);
    throw error;
  }
}

/**
 * Generate export files (without download)
 */
export async function generateExportFiles(request: ExportRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/export/generate-files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        framework: request.framework,
        projectName: request.projectName,
        includePackageJson: request.includePackageJson ?? true,
        includeReadme: request.includeReadme ?? true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate files');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating export files:', error);
    throw error;
  }
}
