'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiLayout, FiFolder, FiBarChart, FiShoppingBag, FiCpu, FiDollarSign, FiHeart } from 'react-icons/fi';

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: FiHome, label: 'Home', href: '/' },
    { icon: FiLayout, label: 'Builder', href: '/builder' },
    { icon: FiCpu, label: 'AI', href: '/ai' },
    { icon: FiShoppingBag, label: 'Workshop', href: '/workshop' },
    { icon: FiHeart, label: 'Sponsors', href: '/sponsors' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-nav mx-4 mb-4 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'text-white bg-white/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
