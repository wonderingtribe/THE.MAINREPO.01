'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Component, Page, Project } from '@/types';

// --- Example merged project ---
// Replace or expand these with your actual pages and components
const mergedProject: Project = {
  name: 'ai-wonderland.org',
  description: 'Merged builder project',
  pages: [
    {
      id: 'page-1',
      name: 'homepage',
      components: [
        {
          id: 'component-1',
          type: 'text',
          props: { children: 'Welcome to AI-WONDERLAND' },
          styles: { fontSize: '24px', color: '#111', margin: '10px 0' },
        },
        {
          id: 'component-2',
          type: 'button',
          props: { children: 'build' },
          styles: {
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        },
      ],
    },
  ],
};

// --- Context Types ---
interface BuilderContextType {
  currentProject: Project | null;
  currentPage: Page | null;
  setCurrentPage: (page: Page | null) => void;
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component | null) => void;
  addComponent: (component: Component, parentId?: string) => void;
  updateComponent: (componentId: string, updates: Partial<Component>) => void;
  deleteComponent: (componentId: string) => void;
  exportCode: () => string;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};

// --- Provider ---
interface BuilderProviderProps {
  children: ReactNode;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Load merged project on mount
  useEffect(() => {
    setCurrentProject(mergedProject);
    setCurrentPage(mergedProject.pages[0] || null);
  }, []);

  const addComponent = (component: Component, parentId?: string) => {
    if (!currentPage) return;

    const addToComponents = (components: Component[]): Component[] => {
      if (!parentId) return [...components, component];

      return components.map(c => {
        if (c.id === parentId) {
          return { ...c, children: [...(c.children || []), component] };
        }
        if (c.children) {
          return { ...c, children: addToComponents(c.children) };
        }
        return c;
      });
    };

    setCurrentPage({
      ...currentPage,
      components: addToComponents(currentPage.components),
    });
  };

  const updateComponent = (componentId: string, updates: Partial<Component>) => {
    if (!currentPage) return;

    const updateInComponents = (components: Component[]): Component[] => {
      return components.map(c => {
        if (c.id === componentId) return { ...c, ...updates };
        if (c.children) return { ...c, children: updateInComponents(c.children) };
        return c;
      });
    };

    setCurrentPage({ ...currentPage, components: updateInComponents(currentPage.components) });
  };

  const deleteComponent = (componentId: string) => {
    if (!currentPage) return;

    const deleteFromComponents = (components: Component[]): Component[] => {
      return components
        .filter(c => c.id !== componentId)
        .map(c => ({ ...c, children: c.children ? deleteFromComponents(c.children) : undefined }));
    };

    setCurrentPage({ ...currentPage, components: deleteFromComponents(currentPage.components) });

    if (selectedComponent?.id === componentId) setSelectedComponent(null);
  };

  const exportCode = (): string => {
    if (!currentPage) return '';

    const generateComponentCode = (component: Component, indent = 0): string => {
      const indentation = '  '.repeat(indent);
      const props = Object.entries(component.props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      const styleString = component.styles ? `style={${JSON.stringify(component.styles)}}` : '';
      const openTag = `${indentation}<${component.type} ${props} ${styleString}>`;
      const children = component.children?.map(c => generateComponentCode(c, indent + 1)).join('\n') || '';
      const closeTag = `${indentation}</${component.type}>`;

      return children ? `${openTag}\n${children}\n${closeTag}` : `${openTag}${closeTag}`;
    };

    const code = currentPage.components.map(c => generateComponentCode(c)).join('\n');
    return `export default function ${currentPage.name.replace(/\s/g, '')}() {\n  return (\n    <div>\n${code}\n    </div>\n  );\n}`;
  };

  return (
    <BuilderContext.Provider
      value={{
        currentProject,
        currentPage,
        setCurrentPage,
        selectedComponent,
        setSelectedComponent,
        addComponent,
        updateComponent,
        deleteComponent,
        exportCode,
        previewMode,
        setPreviewMode,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
