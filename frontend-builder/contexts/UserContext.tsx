'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import * as authService from '@/services/authService';
import * as tokenStorage from '@/utils/tokenStorage';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean;
  accessToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          const response = await authService.getProfile(token);
          if (response.success && response.data) {
            const userData = response.data.user;
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              subscription: userData.subscription?.plan as 'free' | 'pro' | 'enterprise',
            });
            setAccessToken(token);
          }
        } catch (error) {
          // Token is invalid, clear it
          tokenStorage.clearTokens();
        }
      }
    };
    loadUser();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await authService.register({ email, password, name });
      if (response.success && response.data) {
        const { user: userData, tokens } = response.data;
        
        // Store tokens
        tokenStorage.setAccessToken(tokens.accessToken);
        tokenStorage.setRefreshToken(tokens.refreshToken);
        
        // Update state
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          subscription: 'free',
        });
        setAccessToken(tokens.accessToken);
      }
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        const { user: userData, tokens } = response.data;
        
        // Store tokens
        tokenStorage.setAccessToken(tokens.accessToken);
        tokenStorage.setRefreshToken(tokens.refreshToken);
        
        // Update state
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          subscription: 'free',
        });
        setAccessToken(tokens.accessToken);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    tokenStorage.clearTokens();
    setUser(null);
    setAccessToken(null);
  };

  const isAuthenticated = user !== null;

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register, isAuthenticated, accessToken }}>
      {children}
    </UserContext.Provider>
  );
};
