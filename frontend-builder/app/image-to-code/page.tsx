'use client';

import React from 'react';
import Image from 'next/image';
import ImageUploader from '@/components/image-to-code/ImageUploader';
import CodePreview from '@/components/image-to-code/CodePreview';
import ExportOptions from '@/components/image-to-code/ExportOptions';
import { useImageToCode } from '@/hooks/useImageToCode';

export default function ImageToCodePage() {
  const {
    image,
    code,
    framework,
    loading,
    error,
    handleImageUpload,
    handleFrameworkChange,
    handleExport,
  } = useImageToCode();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image to Code Converter
          </h1>
          <p className="text-gray-600">
            Upload an image and convert it to clean, production-ready code using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload */}
          <div className="space-y-6">
            <ImageUploader
              onImageUpload={handleImageUpload}
              loading={loading}
            />

            {image && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="relative w-full min-h-[200px]">
                  <Image
                    src={image}
                    alt="Uploaded"
                    fill
                    className="rounded-lg border object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Code */}
          <div className="space-y-6">
            {code && (
              <>
                <CodePreview
                  code={code}
                  framework={framework}
                  onFrameworkChange={handleFrameworkChange}
                />

                <ExportOptions
                  onExport={handleExport}
                />
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!code && !loading && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <p className="text-gray-600">
                  Upload an image to generate code
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
