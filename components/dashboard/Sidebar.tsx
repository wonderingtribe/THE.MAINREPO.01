'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiLayout, 
  FiFolder, 
  FiBarChart, 
  FiSettings,
  FiHelpCircle,
  FiCpu,
  FiShoppingBag,
  FiDollarSign,
  FiHeart
} from 'react-icons/fi';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
    { icon: FiLayout, label: 'Builder', href: '/builder' },
    { icon: FiFolder, label: 'Projects', href: '/projects' },
    { icon: FiCpu, label: 'Microsoft AI', href: '/ai' },
    { icon: FiShoppingBag, label: 'Workshop', href: '/workshop' },
    { icon: FiBarChart, label: 'Analytics', href: '/analytics' },
    { icon: FiHeart, label: 'Sponsors', href: '/sponsors' },
    { icon: FiDollarSign, label: 'Pricing', href: '/pricing' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
    { icon: FiHelpCircle, label: 'Help', href: '/help' },
  ];

  return (
    <aside className="hidden md:block fixed left-0 top-24 bottom-0 w-64 z-40">
      <div className="glass-nav mx-4 rounded-2xl p-4 h-full">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
