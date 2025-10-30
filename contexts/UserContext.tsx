'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import * as authService from '@/services/authService';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getProfile();
          if (response.success && response.data?.user) {
            const { id, email, name, subscription } = response.data.user;
            setUser({
              id,
              email,
              name,
              subscription: subscription?.plan as 'free' | 'pro' | 'enterprise' | undefined,
            });
          } else {
            // Token invalid, clear it
            authService.logout();
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data?.user) {
        const { id, name } = response.data.user;
        setUser({
          id,
          email,
          name,
          subscription: 'free',
        });
        return { success: true };
      }
      
      return {
        success: false,
        message: response.message || 'Login failed',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authService.register({ email, password, name });
      
      if (response.success && response.data?.user) {
        const { id } = response.data.user;
        setUser({
          id,
          email,
          name,
          subscription: 'free',
        });
        return { success: true };
      }
      
      return {
        success: false,
        message: response.message || 'Registration failed',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration',
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout, isAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};
