'use client';

import React, { useState, useCallback } from 'react';
import { FiUpload, FiX, FiImage, FiCode, FiPlus, FiAlertCircle } from 'react-icons/fi';

interface ImportFromImageProps {
  onCodeGenerated: (code: string) => void;
  onClose: () => void;
}

export const ImportFromImage: React.FC<ImportFromImageProps> = ({ onCodeGenerated, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<'openai' | 'anthropic'>('openai');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please select a JPEG, PNG, or WebP image.');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please select a JPEG, PNG, or WebP image.');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleGenerateCode = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('provider', provider);

      // Get auth token from localStorage
      const token = localStorage.getItem('token');

      // Call API
      const response = await fetch('/api/v1/image-to-code', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate code');
      }

      setGeneratedCode(data.data.code);
    } catch (err) {
      console.error('Error generating code:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate code from image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToProject = () => {
    if (generatedCode) {
      onCodeGenerated(generatedCode);
      onClose();
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setGeneratedCode(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiImage className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Import from Image</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generatedCode ? (
            <div className="space-y-6">
              {/* AI Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Provider
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="provider"
                      value="openai"
                      checked={provider === 'openai'}
                      onChange={(e) => setProvider(e.target.value as 'openai' | 'anthropic')}
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">OpenAI GPT-4 Vision</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="provider"
                      value="anthropic"
                      checked={provider === 'anthropic'}
                      onChange={(e) => setProvider(e.target.value as 'openai' | 'anthropic')}
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">Claude Sonnet 3.5</span>
                  </label>
                </div>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={handleReset}
                          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FiUpload className="w-12 h-12 mx-auto text-gray-400" />
                      <div>
                        <p className="text-gray-600 mb-2">
                          Drag and drop your image here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports JPEG, PNG, and WebP (max 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Select Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Generate Button */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateCode}
                  disabled={!selectedFile || isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiCode className="w-5 h-5" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Generated Code Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Code
                </label>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Generate Again
                </button>
                <button
                  onClick={handleAddToProject}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  Add to Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
