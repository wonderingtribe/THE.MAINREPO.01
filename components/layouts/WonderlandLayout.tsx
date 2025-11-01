'use client';

import React from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';

interface WonderlandLayoutProps {
  children: React.ReactNode;
}

export const WonderlandLayout: React.FC<WonderlandLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};
