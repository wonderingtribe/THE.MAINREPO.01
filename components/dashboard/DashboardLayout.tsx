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
    <div className="wonderland-bg min-h-screen flex flex-col">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="w-64 h-screen overflow-y-auto fixed md:relative" />

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-64 pt-24 md:pt-28 pb-24 md:pb-8 px-4 md:px-8">
          {children}
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};