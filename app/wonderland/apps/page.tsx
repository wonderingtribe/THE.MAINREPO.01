'use client';

import React from 'react';
import { WonderlandLayout } from '@/components/layouts/WonderlandLayout';
import Link from 'next/link';
import { FiMessageSquare, FiImage, FiMic } from 'react-icons/fi';

export default function AppsPage() {
  const appTypes = [
    {
      name: 'ChatBot',
      description: 'Intelligent AI-powered conversations',
      icon: FiMessageSquare,
      color: 'from-purple-600 to-blue-600',
      href: '/wonderland/apps/chatbot',
    },
    {
      name: 'Image Generator',
      description: 'Create stunning visuals with AI',
      icon: FiImage,
      color: 'from-pink-600 to-purple-600',
      href: '/wonderland/apps/image-generator',
    },
    {
      name: 'Voice Assistant',
      description: 'Voice-activated AI helper',
      icon: FiMic,
      color: 'from-blue-600 to-cyan-600',
      href: '/wonderland/apps/voice-assistant',
    },
  ];

  return (
    <WonderlandLayout>
      {/* Blue/Pink Tie-dye Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        {/* Tie-dye pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tiedye" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="80" fill="#ec4899" opacity="0.3"/>
                <circle cx="300" cy="200" r="100" fill="#3b82f6" opacity="0.3"/>
                <circle cx="200" cy="300" r="90" fill="#8b5cf6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tiedye)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
            AI WONDERLAND APPS
          </h1>
          <p className="text-2xl text-white/90 drop-shadow-lg">
            Choose your AI-powered experience
          </p>
        </div>

        {/* App Type Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {appTypes.map((app, index) => {
            const Icon = app.icon;
            
            return (
              <Link
                key={index}
                href={app.href}
                className="group"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl p-12
                  bg-gradient-to-br ${app.color}
                  transform transition-all duration-500
                  hover:scale-105 hover:-translate-y-2
                  shadow-2xl hover:shadow-3xl
                  backdrop-blur-sm bg-opacity-90
                  border-4 border-white/20
                `}>
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative text-center">
                    <div className="mb-8 flex justify-center">
                      <div className="p-6 bg-white/20 rounded-full backdrop-blur-md transform group-hover:rotate-12 transition-transform duration-500">
                        <Icon size={64} className="text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                      {app.name}
                    </h3>
                    
                    <p className="text-lg text-white/90 drop-shadow-md">
                      {app.description}
                    </p>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"></div>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-white text-lg">
              ✨ Powered by advanced AI technology
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
