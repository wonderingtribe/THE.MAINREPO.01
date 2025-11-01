'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiGrid, FiShoppingBag, FiDollarSign, FiUser } from 'react-icons/fi';

export const NavigationBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/wonderland', icon: FiHome },
    { name: 'Apps', path: '/wonderland/apps', icon: FiGrid },
    { name: 'Marketplace', path: '/wonderland/marketplace', icon: FiShoppingBag },
    { name: 'Sponsors', path: '/wonderland/sponsors', icon: FiDollarSign },
    { name: 'Profile', path: '/wonderland/profile', icon: FiUser },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/wonderland" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI WONDERLAND
          </Link>
          
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    isActive 
                      ? 'text-purple-600' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
