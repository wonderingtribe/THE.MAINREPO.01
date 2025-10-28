/**
 * Authentication Service
 * Handles API calls for authentication and token management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface ProfileResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      subscription?: {
        plan: string;
        status: string;
      };
    };
  };
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }

  return result;
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Token refresh failed');
  }

  return result.data;
};

/**
 * Get user profile
 */
export const getProfile = async (token: string): Promise<ProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch profile');
  }

  return result;
};

/**
 * Update user profile
 */
export const updateProfile = async (token: string, data: { name?: string }): Promise<ProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update profile');
  }

  return result;
};

/**
 * Generate API key
 */
export const generateApiKey = async (token: string): Promise<{ apiKey: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/api-key`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to generate API key');
  }

  return result.data;
};
