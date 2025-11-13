'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Component, Page, Project } from '@/types';
import { createClient } from '@supabase/supabase-js';

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
  if (!context) throw new Error('useBuilder must be used within BuilderProvider');
  return context;
};

interface BuilderProviderProps {
  children: ReactNode;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Load projects from Supabase on mount
  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, pages(*)')
        .limit(1); // load first project
      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }
      if (data && data.length > 0) {
        const project = data[0] as Project;
        setCurrentProject(project);
        if (project.pages && project.pages.length > 0) {
          setCurrentPage(project.pages[0]);
        }
      }
    };
    loadProjects();
  }, []);

  const addComponent = (component: Component, parentId?: string) => {
    if (!currentPage) return;

    const addToComponents = (components: Component[]): Component[] => {
      if (!parentId) return [...components, component];
      return components.map(c => {
        if (c.id === parentId) {
          return { ...c, children: [...(c.children || []), component] };
        }
        if (c.children) return { ...c, children: addToComponents(c.children) };
        return c;
      });
    };

    setCurrentPage({ ...currentPage, components: addToComponents(currentPage.components) });
  };

  const updateComponent = (componentId: string, updates: Partial<Component>) => {
    if (!currentPage) return;

    const updateInComponents = (components: Component[]): Component[] =>
      components.map(c => {
        if (c.id === componentId) return { ...c, ...updates };
        if (c.children) return { ...c, children: updateInComponents(c.children) };
        return c;
      });

    setCurrentPage({ ...currentPage, components: updateInComponents(currentPage.components) });
  };

  const deleteComponent = (componentId: string) => {
    if (!currentPage) return;

    const deleteFromComponents = (components: Component[]): Component[] =>
      components
        .filter(c => c.id !== componentId)
        .map(c => ({ ...c, children: c.children ? deleteFromComponents(c.children) : undefined }));

    setCurrentPage({ ...currentPage, components: deleteFromComponents(currentPage.components) });
    if (selectedComponent?.id === componentId) setSelectedComponent(null);
  };

  const exportCode = (): string => {
    if (!currentPage) return '';

    const generateComponentCode = (component: Component, indent = 0): string => {
      const indentation = '  '.repeat(indent);
      const props = Object.entries(component.props)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      const styleString = component.styles ? `style={${JSON.stringify(component.styles)}}` : '';
      const openTag = `${indentation}<${component.type} ${props} ${styleString}>`;
      const children = component.children?.map(c => generateComponentCode(c, indent + 1)).join('\n') || '';
      const closeTag = `${indentation}</${component.type}>`;
      return children ? `${openTag}\n${children}\n${closeTag}` : `${openTag}${closeTag}`;
    };

    return `export default function ${currentPage.name}() {\n  return (\n    <div>\n${currentPage.components.map(c => generateComponentCode(c)).join('\n')}\n    </div>\n  );\n}`;
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
