/**
 * Project Service
 * Handles project-related API calls with authentication
 */

import { TokenStorage } from './authService';
import { Project } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface CreateProjectData {
  name: string;
  description?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  pages?: Project['pages'];
  domain?: string;
}

export interface ProjectResponse {
  success: boolean;
  message?: string;
  data?: {
    project: Project;
  };
}

export interface ProjectsListResponse {
  success: boolean;
  data?: {
    projects: Project[];
  };
}

/**
 * Get authentication headers
 */
const getAuthHeaders = (): HeadersInit => {
  const token = TokenStorage.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Create a new project
 */
export const createProject = async (data: CreateProjectData): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Create project error:', error);
    return {
      success: false,
      message: 'Failed to create project',
    };
  }
};

/**
 * Get all projects for the current user
 */
export const getProjects = async (): Promise<ProjectsListResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error('Get projects error:', error);
    return {
      success: false,
    };
  }
};

/**
 * Get a specific project by ID
 */
export const getProject = async (projectId: string): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error('Get project error:', error);
    return {
      success: false,
      message: 'Failed to fetch project',
    };
  }
};

/**
 * Update a project
 */
export const updateProject = async (
  projectId: string,
  data: UpdateProjectData
): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Update project error:', error);
    return {
      success: false,
      message: 'Failed to update project',
    };
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error('Delete project error:', error);
    return {
      success: false,
    };
  }
};

/**
 * Publish a project
 */
export const publishProject = async (projectId: string): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/publish`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error('Publish project error:', error);
    return {
      success: false,
      message: 'Failed to publish project',
    };
  }
};
