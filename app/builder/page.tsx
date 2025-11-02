'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useApp } from '@/contexts/AppContext';
import { ComponentPalette } from '@/components/builder/ComponentPalette';
import { Canvas } from '@/components/builder/Canvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { CodeExportModal } from '@/components/builder/CodeExportModal';
import { ImportFromImage } from '@/components/builder/ImportFromImage';
import { FiSave, FiCode, FiEye, FiEyeOff, FiImage } from 'react-icons/fi';
import { ComponentType } from '@/types';

let componentCounter = 0;

const getDefaultProps = (type: ComponentType): Record<string, string | number | boolean> => {
  switch (type) {
    case 'text':
      return { children: 'Text content' };
    case 'button':
      return { children: 'Button' };
    case 'image':
      return { src: '/placeholder.jpg', alt: 'Image' };
    case 'input':
      return { type: 'text', placeholder: 'Enter text...' };
    default:
      return {};
  }
};

const getDefaultStyles = (type: ComponentType): Record<string, string> => {
  switch (type) {
    case 'container':
      return { padding: '20px', minHeight: '100px', border: '1px dashed #ccc' };
    case 'text':
      return { fontSize: '16px', margin: '10px 0' };
    case 'button':
      return {
        padding: '10px 20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      };
    default:
      return {};
  }
};

export default function BuilderPage() {
  const { currentPage, setCurrentPage, addComponent, previewMode, setPreviewMode } = useBuilder();
  const { currentProject, createProject } = useApp();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    // Initialize with a default project if none exists
    if (!currentProject) {
      createProject('My Website', 'A new website project');
    }
  }, [currentProject, createProject]);

  useEffect(() => {
    // Set the first page as current when project changes
    if (currentProject && currentProject.pages.length > 0 && !currentPage) {
      setCurrentPage(currentProject.pages[0]);
    }
  }, [currentProject, currentPage, setCurrentPage]);

  const handleComponentSelect = useCallback((type: ComponentType) => {
    componentCounter += 1;
    const newComponent = {
      id: `component-${componentCounter}`,
      type,
      props: getDefaultProps(type),
      styles: getDefaultStyles(type),
    };
    addComponent(newComponent);
  }, [addComponent]);

  const handleCodeGenerated = useCallback((code: string) => {
    // Parse the generated code and add it as a custom component
    // For now, we'll add it as a container with the code as raw HTML
    componentCounter += 1;
    const newComponent = {
      id: `component-${componentCounter}`,
      type: 'container' as ComponentType,
      props: { 
        dangerouslySetInnerHTML: { __html: code },
        'data-generated': 'true'
      },
      styles: { padding: '20px', minHeight: '100px' },
    };
    addComponent(newComponent);
  }, [addComponent]);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            {currentProject?.name || 'Frontend Builder'}
          </h1>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-300">
            {currentPage?.name || 'Untitled Page'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            <FiImage /> Import from Image
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            {previewMode ? <FiEyeOff /> : <FiEye />}
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            <FiCode /> Export Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700">
            <FiSave /> Save
          </button>
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        {!previewMode && <ComponentPalette onSelectComponent={handleComponentSelect} />}
        <Canvas components={currentPage?.components || []} />
        {!previewMode && <PropertiesPanel />}
      </div>

      {/* Code Export Modal */}
      <CodeExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
      
      {/* Import from Image Modal */}
      {showImportModal && (
        <ImportFromImage
          onCodeGenerated={handleCodeGenerated}
          onClose={() => setShowImportModal(false)}
        />
      )}
    </div>
  );
}
