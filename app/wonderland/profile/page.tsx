'use client';

import React from 'react';
import { WonderlandLayout } from '@/components/layouts/WonderlandLayout';
import { useUser } from '@/contexts/UserContext';
import { FiUser, FiMail, FiSettings, FiActivity, FiAward } from 'react-icons/fi';

export default function ProfilePage() {
  const { user, isAuthenticated } = useUser();

  const stats = [
    { label: 'Projects Created', value: '12', icon: FiActivity },
    { label: 'Apps Used', value: '8', icon: FiAward },
    { label: 'Hours Saved', value: '156', icon: FiSettings },
  ];

  return (
    <WonderlandLayout>
      {/* Tie-dye Wonderland Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 animate-gradient">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {isAuthenticated ? (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white" size={48} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {user?.name || 'User'}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail size={18} />
                    <span>{user?.email || 'user@example.com'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                      {user?.subscription?.toUpperCase() || 'FREE'} Plan
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-white rounded-full">
                          <Icon className="text-purple-600" size={24} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Used ChatBot</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <p className="text-sm text-gray-600">Created Image with ImageGen</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-600">Analyzed Data with DataViz</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Account Settings</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl text-left transition-colors">
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl text-left transition-colors">
                    Subscription Settings
                  </button>
                  <button className="w-full px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl text-left transition-colors">
                    Privacy & Security
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <FiUser className="mx-auto mb-6 text-gray-300" size={64} />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Not Logged In</h2>
              <p className="text-gray-600 mb-8">
                Please log in to view your profile
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                Log In
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </WonderlandLayout>
  );
}
