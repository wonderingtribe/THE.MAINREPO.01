'use client';

import React, { useState } from 'react';
import { Refractor } from 'react-refractor';
import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import typescript from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';

// Register languages
if (typeof window !== 'undefined') {
  Refractor.registerLanguage(javascript);
  Refractor.registerLanguage(jsx);
  Refractor.registerLanguage(typescript);
  Refractor.registerLanguage(tsx);
}

interface CodePreviewProps {
  code: string;
  framework: string;
  onFrameworkChange: (framework: string) => void;
}

const frameworks = [
  { id: 'react', name: 'React', language: 'tsx' },
  { id: 'nextjs', name: 'Next.js', language: 'tsx' },
  { id: 'html', name: 'HTML', language: 'markup' },
  { id: 'vue', name: 'Vue', language: 'jsx' },
  { id: 'tailwind', name: 'Tailwind', language: 'markup' },
];

export default function CodePreview({ code, framework, onFrameworkChange }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Generated Code</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              {showPreview ? 'Show Code' : 'Show Preview'}
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Framework Selector */}
        <div className="flex gap-2">
          {frameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => onFrameworkChange(fw.id)}
              className={`
                px-3 py-1 text-sm rounded transition-colors
                ${
                  framework === fw.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {fw.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code/Preview Content */}
      <div className="p-6">
        {showPreview ? (
          <div className="border rounded-lg overflow-hidden">
            <iframe
              srcDoc={code}
              className="w-full h-96 bg-white"
              title="Code Preview"
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-96 text-sm">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
