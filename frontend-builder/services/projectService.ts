/**
 * Project Service
 * Handles API calls for project management
 */

import * as apiClient from '@/utils/apiClient';

export interface Project {
  id: string;
  name: string;
  description?: string;
  pages: unknown[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  pages?: unknown[];
}

/**
 * Get all projects for the current user
 */
export const getProjects = async (): Promise<{ success: boolean; data: { projects: Project[] } }> => {
  return apiClient.get('/api/projects', true);
};

/**
 * Get a single project by ID
 */
export const getProject = async (projectId: string): Promise<{ success: boolean; data: { project: Project } }> => {
  return apiClient.get(`/api/projects/${projectId}`, true);
};

/**
 * Create a new project
 */
export const createProject = async (data: CreateProjectData): Promise<{ success: boolean; data: { project: Project } }> => {
  return apiClient.post('/api/projects', data, true);
};

/**
 * Update an existing project
 */
export const updateProject = async (
  projectId: string,
  data: UpdateProjectData
): Promise<{ success: boolean; data: { project: Project } }> => {
  return apiClient.put(`/api/projects/${projectId}`, data, true);
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId: string): Promise<{ success: boolean }> => {
  return apiClient.del(`/api/projects/${projectId}`, true);
};

/**
 * Publish a project
 */
export const publishProject = async (projectId: string): Promise<{ success: boolean; data: { url: string } }> => {
  return apiClient.post(`/api/projects/${projectId}/publish`, {}, true);
};
