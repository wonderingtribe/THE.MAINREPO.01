'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { FiUser, FiLogOut } from 'react-icons/fi';

export const TopNavigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
      <div className="glass-nav mx-4 mt-4 rounded-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-WONDERLAND
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className="nav-link"
              >
                Dashboard
              </Link>
              <Link 
                href="/builder" 
                className="nav-link"
              >
                Builder
              </Link>
              <Link 
                href="/projects" 
                className="nav-link"
              >
                Projects
              </Link>
              <Link 
                href="/ai" 
                className="nav-link"
              >
                Microsoft AI
              </Link>
              <Link 
                href="/workshop" 
                className="nav-link"
              >
                Workshop
              </Link>
              <Link 
                href="/sponsors" 
                className="nav-link"
              >
                Sponsors
              </Link>
              <Link 
                href="/pricing" 
                className="nav-link"
              >
                Pricing
              </Link>
              <Link 
                href="/analytics" 
                className="nav-link"
              >
                Analytics
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-white/90">
                  <FiUser className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="btn-primary"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
