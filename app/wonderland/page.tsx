'use client';

import React from 'react';
import { WonderlandLayout } from '@/components/layouts/WonderlandLayout';
import Link from 'next/link';

export default function WonderlandDashboard() {
  const apps = [
    { name: 'Lippy', color: 'from-pink-500 to-purple-500', icon: '💄' },
    { name: 'MirAIcle', color: 'from-blue-500 to-cyan-500', icon: '✨' },
    { name: 'VoiceFlow', color: 'from-green-500 to-teal-500', icon: '🎤' },
    { name: 'ImageGen', color: 'from-orange-500 to-red-500', icon: '🎨' },
    { name: 'CodeBot', color: 'from-indigo-500 to-purple-500', icon: '🤖' },
    { name: 'DataViz', color: 'from-yellow-500 to-orange-500', icon: '📊' },
    { name: 'TextCraft', color: 'from-rose-500 to-pink-500', icon: '📝' },
    { name: 'SoundWave', color: 'from-cyan-500 to-blue-500', icon: '🎵' },
  ];

  return (
    <WonderlandLayout>
      {/* Psychedelic Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 animate-gradient">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Welcome to AI Wonderland
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Explore our magical collection of AI-powered applications
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <Link
              key={index}
              href={`/wonderland/apps/${app.name.toLowerCase()}`}
              className="group relative"
            >
              <div className={`
                relative overflow-hidden rounded-3xl p-8 
                bg-gradient-to-br ${app.color}
                transform transition-all duration-300
                hover:scale-110 hover:rotate-3
                shadow-xl hover:shadow-2xl
                backdrop-blur-sm bg-opacity-80
              `}>
                {/* Tie-dye effect overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-white via-transparent to-black mix-blend-overlay"></div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform">
                    {app.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {app.name}
                  </h3>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Discover More Amazing Apps
            </h2>
            <Link
              href="/wonderland/marketplace"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Visit Marketplace
            </Link>
          </div>
        </div>
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
