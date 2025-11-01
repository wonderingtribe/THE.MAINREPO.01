/**
 * API Client Utility
 * Handles API requests with authentication headers
 */

import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from './tokenStorage';
import { refreshAccessToken } from '@/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Make an authenticated API request
 * Automatically adds Authorization header and handles token refresh
 */
export const apiRequest = async <T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const { requiresAuth = false, headers = {}, ...restOptions } = options;

  // Build headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Make the request
  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: requestHeaders,
  });

  // Handle token refresh on 401
  if (response.status === 401 && requiresAuth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        // Try to refresh the token
        const refreshSuccess = await refreshAccessToken();
        if (refreshSuccess) {
          // Get the new token and retry the request
          const newToken = getAccessToken();
          if (newToken) {
            requestHeaders['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(`${API_BASE_URL}${endpoint}`, {
              ...restOptions,
              headers: requestHeaders,
            });
          }
        } else {
          // Refresh failed, clear tokens
          clearTokens();
          throw new Error('Session expired. Please log in again.');
        }
      } catch (error) {
        // Refresh failed, clear tokens
        clearTokens();
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      clearTokens();
      throw new Error('Session expired. Please log in again.');
    }
  }

  // Parse response
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

/**
 * GET request
 */
export const get = <T = unknown>(endpoint: string, requiresAuth = false): Promise<T> => {
  return apiRequest<T>(endpoint, { method: 'GET', requiresAuth });
};

/**
 * POST request
 */
export const post = <T = unknown>(
  endpoint: string,
  data: unknown,
  requiresAuth = false
): Promise<T> => {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    requiresAuth,
  });
};

/**
 * PUT request
 */
export const put = <T = unknown>(
  endpoint: string,
  data: unknown,
  requiresAuth = false
): Promise<T> => {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    requiresAuth,
  });
};

/**
 * DELETE request
 */
export const del = <T = unknown>(endpoint: string, requiresAuth = false): Promise<T> => {
  return apiRequest<T>(endpoint, { method: 'DELETE', requiresAuth });
};
