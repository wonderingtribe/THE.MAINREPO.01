/**
 * Token Storage Utility
 * Handles secure storage and retrieval of authentication tokens
 */

const ACCESS_TOKEN_KEY = 'ai_builder_access_token';
const REFRESH_TOKEN_KEY = 'ai_builder_refresh_token';

/**
 * Store access token
 */
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

/**
 * Get access token
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

/**
 * Remove access token
 */
export const removeAccessToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

/**
 * Store refresh token
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

/**
 * Get refresh token
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

/**
 * Remove refresh token
 */
export const removeRefreshToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/**
 * Clear all tokens
 */
export const clearTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null;
};
