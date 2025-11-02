'use client';

import React, { useState } from 'react';

interface ExportOptionsProps {
  code: string;
  framework: string;
  onExport: (options: ExportConfig) => void;
}

interface ExportConfig {
  format: 'file' | 'zip' | 'codesandbox' | 'github';
  includePackageJson: boolean;
  includeReadme: boolean;
  projectName: string;
}

export default function ExportOptions({ code, framework, onExport }: ExportOptionsProps) {
  const [projectName, setProjectName] = useState('my-project');
  const [includePackageJson, setIncludePackageJson] = useState(true);
  const [includeReadme, setIncludeReadme] = useState(true);

  const handleExport = (format: ExportConfig['format']) => {
    onExport({
      format,
      includePackageJson,
      includeReadme,
      projectName,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Export Options</h3>

      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="my-project"
          />
        </div>

        {/* Include Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includePackageJson}
              onChange={(e) => setIncludePackageJson(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Include package.json</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeReadme}
              onChange={(e) => setIncludeReadme(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Include README.md</span>
          </label>
        </div>

        {/* Export Buttons */}
        <div className="pt-4 border-t space-y-2">
          <button
            onClick={() => handleExport('file')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download as File
          </button>

          <button
            onClick={() => handleExport('zip')}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Download as ZIP
          </button>

          <button
            onClick={() => handleExport('codesandbox')}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 6l10.455-6L22.91 6 23 17.95 12.455 24 2 18V6zm2.088 2.481v4.757l3.345 1.86v3.516l3.972 2.296v-8.272L4.088 8.481zm16.739 0l-7.317 4.157v8.272l3.972-2.296V15.1l3.345-1.861V8.48zM5.134 6.601l7.303 4.144 7.32-4.18-3.871-2.197-3.41 1.945-3.43-1.968L5.133 6.6z"/>
            </svg>
            Open in CodeSandbox
          </button>

          <button
            onClick={() => handleExport('github')}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Export to GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
