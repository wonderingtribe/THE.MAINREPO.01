'use client';

import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="wonderland-bg min-h-screen">
      <TopNavigation />
      <Sidebar />
      <main className="md:ml-64 pt-24 md:pt-28 pb-24 md:pb-8 px-4 md:px-8">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
