'use client';

import React, { ReactNode, useEffect } from 'react';
import { BuilderProvider } from '@/contexts/BuilderContext';
import { AppProvider, useApp } from '@/contexts/AppContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppProvider>
      <BuilderProviderWithInit>
        {children}
      </BuilderProviderWithInit>
    </AppProvider>
  );
}

// Wrap BuilderProvider to initialize default project/page
const BuilderProviderWithInit: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentProject, createProject } = useApp();

  useEffect(() => {
    if (!currentProject) {
      // Initialize a default project if none exists
      createProject('My Website', 'A new website project');
    }
  }, [currentProject, createProject]);

  return <BuilderProvider>{children}</BuilderProvider>;
};
