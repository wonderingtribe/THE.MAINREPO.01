'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '@/types';
import * as projectService from '@/services/projectService';

interface AppContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (name: string, description?: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  loadProjects: () => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load projects from API
  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await projectService.getProjects();
      if (response.success && response.data?.projects) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name: string, description?: string) => {
    setLoading(true);
    try {
      const response = await projectService.createProject({ name, description });
      if (response.success && response.data?.project) {
        const newProject = response.data.project;
        setProjects([...projects, newProject]);
        setCurrentProject(newProject);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    setLoading(true);
    try {
      const response = await projectService.updateProject(projectId, updates);
      if (response.success && response.data?.project) {
        const updatedProject = response.data.project;
        setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
        if (currentProject?.id === projectId) {
          setCurrentProject(updatedProject);
        }
      }
    } catch (error) {
      console.error('Failed to update project:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    setLoading(true);
    try {
      const response = await projectService.deleteProject(projectId);
      if (response.success) {
        setProjects(projects.filter(p => p.id !== projectId));
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      createProject,
      updateProject,
      deleteProject,
      loadProjects,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  );
};
