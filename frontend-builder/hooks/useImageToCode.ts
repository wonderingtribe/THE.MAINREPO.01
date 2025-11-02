import { useState } from 'react';
import { convertImageToCode, downloadAsZip } from '@/services/imageToCodeService';

interface ExportConfig {
  format: 'file' | 'zip' | 'codesandbox' | 'github';
  includePackageJson: boolean;
  includeReadme: boolean;
  projectName: string;
}

export function useImageToCode() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>('');
  const [framework, setFramework] = useState<string>('react');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File, preview: string) => {
    setImage(preview);
    setImageFile(file);
    setError(null);

    // Auto-convert on upload
    try {
      setLoading(true);
      const result = await convertImageToCode(file, framework);
      setCode(result.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setLoading(false);
    }
  };

  const handleFrameworkChange = async (newFramework: string) => {
    setFramework(newFramework);

    // Re-convert with new framework
    if (imageFile) {
      try {
        setLoading(true);
        const result = await convertImageToCode(imageFile, newFramework);
        setCode(result.code);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to convert image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConvert = async () => {
    if (!imageFile) return;

    try {
      setLoading(true);
      setError(null);
      const result = await convertImageToCode(imageFile, framework);
      setCode(result.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (options: ExportConfig) => {
    try {
      if (options.format === 'file') {
        // Download as single file
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${options.projectName}.${framework === 'html' ? 'html' : 'tsx'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (options.format === 'zip') {
        // Download as ZIP
        await downloadAsZip({
          code,
          framework,
          projectName: options.projectName,
          includePackageJson: options.includePackageJson,
          includeReadme: options.includeReadme,
        });
      } else if (options.format === 'codesandbox') {
        // Open in CodeSandbox
        window.open('https://codesandbox.io/s', '_blank');
      } else if (options.format === 'github') {
        // GitHub export (placeholder)
        alert('GitHub export coming soon!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export');
    }
  };

  return {
    image,
    code,
    framework,
    loading,
    error,
    handleImageUpload,
    handleFrameworkChange,
    handleConvert,
    handleExport,
  };
}
