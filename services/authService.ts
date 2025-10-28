/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
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
 * Token storage utilities
 */
export const TokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('refreshToken', token);
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    TokenStorage.setAccessToken(accessToken);
    TokenStorage.setRefreshToken(refreshToken);
  },
};

/**
 * Register new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success && result.data?.tokens) {
      TokenStorage.setTokens(
        result.data.tokens.accessToken,
        result.data.tokens.refreshToken
      );
    }

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Registration failed. Please try again.',
    };
  }
};

/**
 * Login user
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success && result.data?.tokens) {
      TokenStorage.setTokens(
        result.data.tokens.accessToken,
        result.data.tokens.refreshToken
      );
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.',
    };
  }
};

/**
 * Logout user
 */
export const logout = (): void => {
  TokenStorage.clearTokens();
};

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = TokenStorage.getAccessToken();
    if (!token) {
      return {
        success: false,
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
    };
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = TokenStorage.getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (result.success && result.data?.accessToken) {
      TokenStorage.setAccessToken(result.data.accessToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (data: { name?: string }): Promise<ProfileResponse> => {
  try {
    const token = TokenStorage.getAccessToken();
    if (!token) {
      return {
        success: false,
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
    };
  }
};

/**
 * Generate API key
 */
export const generateApiKey = async (): Promise<{ success: boolean; data?: { apiKey: string } }> => {
  try {
    const token = TokenStorage.getAccessToken();
    if (!token) {
      return {
        success: false,
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Generate API key error:', error);
    return {
      success: false,
    };
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!TokenStorage.getAccessToken();
};
