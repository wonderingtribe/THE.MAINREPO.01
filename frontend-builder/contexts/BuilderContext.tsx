'use client';

import React, { useState, useCallback } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { ComponentPalette } from '@/components/builder/ComponentPalette';
import { Canvas } from '@/components/builder/Canvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { CodeExportModal } from '@/components/builder/CodeExportModal';
import { FiSave, FiCode, FiEye, FiEyeOff } from 'react-icons/fi';
import { ComponentType } from '@/types';

let componentCounter = 0;

const getDefaultProps = (type: ComponentType) => {
  switch (type) {
    case 'text': return { children: 'Text content' };
    case 'button': return { children: 'Button' };
    case 'image': return { src: '/placeholder.jpg', alt: 'Image' };
    case 'input': return { type: 'text', placeholder: 'Enter text...' };
    default: return {};
  }
};

const getDefaultStyles = (type: ComponentType) => {
  switch (type) {
    case 'container': return { padding: '20px', minHeight: '100px', border: '1px dashed #ccc' };
    case 'text': return { fontSize: '16px', margin: '10px 0' };
    case 'button': return { padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
    default: return {};
  }
};

export default function BuilderPage() {
  const { currentProject, currentPage, addComponent, previewMode, setPreviewMode } = useBuilder();
  const [showExportModal, setShowExportModal] = useState(false);

  const handleComponentSelect = useCallback((type: ComponentType) => {
    componentCounter += 1;
    if (!currentPage) return;
    const newComponent = { id: `component-${componentCounter}`, type, props: getDefaultProps(type), styles: getDefaultStyles(type) };
    addComponent(newComponent);
  }, [addComponent, currentPage]);

  if (!currentProject || !currentPage) return <div className="h-screen flex items-center justify-center">Loading project...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{currentProject.name}</h1>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-300">{currentPage.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
            {previewMode ? <FiEyeOff /> : <FiEye />}
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button onClick={() => setShowExportModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            <FiCode /> Export Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700">
            <FiSave /> Save
          </button>
        </div>
      </div>

      {/* Builder */}
      <div className="flex-1 flex overflow-hidden">
        {!previewMode && <ComponentPalette onSelectComponent={handleComponentSelect} />}
        <Canvas components={currentPage.components || []} />
        {!previewMode && <PropertiesPanel />}
      </div>

      {/* Export modal */}
      <CodeExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </div>
  );
          }
