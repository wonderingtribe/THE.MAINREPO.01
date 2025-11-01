'use client';

import React from 'react';
import { WonderlandLayout } from '@/components/layouts/WonderlandLayout';
import { FiDollarSign, FiTrendingUp, FiUsers, FiAward, FiBarChart, FiZap } from 'react-icons/fi';

export default function SponsorsPage() {
  const fundingOpportunities = [
    {
      title: 'Seed Funding',
      amount: '$50K - $500K',
      icon: FiDollarSign,
      description: 'Early-stage funding for innovative AI projects',
      color: 'from-green-400 to-emerald-500',
    },
    {
      title: 'Series A',
      amount: '$2M - $15M',
      icon: FiTrendingUp,
      description: 'Growth capital for scaling AI solutions',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      title: 'Strategic Partnership',
      amount: 'Custom',
      icon: FiUsers,
      description: 'Collaboration opportunities with industry leaders',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  const projects = [
    {
      name: 'VisionAI',
      category: 'Computer Vision',
      funding: '$2.5M',
      investors: 12,
      icon: '👁️',
      status: 'Active',
    },
    {
      name: 'NeuralChat',
      category: 'NLP',
      funding: '$1.8M',
      investors: 8,
      icon: '💬',
      status: 'Active',
    },
    {
      name: 'DataMind',
      category: 'Analytics',
      funding: '$3.2M',
      investors: 15,
      icon: '📊',
      status: 'Funded',
    },
    {
      name: 'AudioGen',
      category: 'Audio AI',
      funding: '$1.2M',
      investors: 6,
      icon: '🎵',
      status: 'Active',
    },
  ];

  const investors = [
    { name: 'Tech Ventures', portfolio: 45, totalFunding: '$150M', icon: '🚀' },
    { name: 'AI Capital', portfolio: 32, totalFunding: '$120M', icon: '💡' },
    { name: 'Future Fund', portfolio: 28, totalFunding: '$95M', icon: '⚡' },
    { name: 'Innovation Labs', portfolio: 38, totalFunding: '$180M', icon: '🔬' },
  ];

  return (
    <WonderlandLayout>
      {/* Background with gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl">
            Sponsors &amp; Investors
          </h1>
          <p className="text-xl text-white/80 drop-shadow-lg">
            Empowering innovation through strategic partnerships
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Funding Opportunities Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <FiDollarSign className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold text-white">FUNDING OPPORTUNITIES</h2>
            </div>

            <div className="space-y-4">
              {fundingOpportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-br ${opportunity.color} rounded-xl`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                          <span className="text-lg font-semibold text-green-400">{opportunity.amount}</span>
                        </div>
                        <p className="text-white/70">{opportunity.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
              Apply for Funding
            </button>
          </div>

          {/* Project Showcase Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <FiAward className="text-purple-400" size={32} />
              <h2 className="text-3xl font-bold text-white">PROJECT SHOWCASE</h2>
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{project.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Active' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-purple-300 mb-3">{project.category}</p>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <FiDollarSign size={14} />
                          <span>{project.funding}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiUsers size={14} />
                          <span>{project.investors} investors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">
              Submit Your Project
            </button>
          </div>
        </div>

        {/* Investor Profiles */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <FiBarChart className="text-cyan-400" size={32} />
            <h2 className="text-3xl font-bold text-white">TOP INVESTORS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investors.map((investor, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center"
              >
                <div className="text-6xl mb-4">{investor.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{investor.name}</h3>
                <div className="space-y-2 text-white/70">
                  <div className="flex items-center justify-center gap-2">
                    <FiZap size={16} className="text-yellow-400" />
                    <span>{investor.portfolio} projects</span>
                  </div>
                  <div className="text-lg font-semibold text-green-400">
                    {investor.totalFunding}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join our community of innovators and investors shaping the future of AI
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                Become an Investor
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl border border-white/20">
                Pitch Your Project
              </button>
            </div>
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
