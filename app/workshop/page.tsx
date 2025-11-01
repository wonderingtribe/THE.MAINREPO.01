'use client';

import React from 'react';
import Link from 'next/link';
import { FiExternalLink, FiPackage, FiShoppingCart } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

export default function WorkshopPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Workshop</h1>
          <p className="text-white/80 text-lg">
            Explore and install apps and extensions from GitHub Marketplace
          </p>
        </div>

        {/* GitHub Marketplace Button - Tie-Dye Themed Card */}
        <div className="mb-8">
          <GlassCard className="p-8 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30 border-2 border-white/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                  <FiShoppingCart className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">GitHub Marketplace</h2>
                </div>
                <p className="text-white/90 text-lg mb-4">
                  Browse thousands of apps and extensions to enhance your workflow. 
                  Install GitHub Apps, Actions, and integrations directly to your projects.
                </p>
                <ul className="text-white/80 space-y-2 text-left inline-block">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Continuous Integration & Deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Code Quality & Security Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Project Management & Collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Monitoring & Analytics
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="https://github.com/marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4 whitespace-nowrap"
                >
                  <FiPackage className="w-6 h-6" />
                  Browse Marketplace
                  <FiExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/marketplace?type=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-3 text-lg px-8 py-4 whitespace-nowrap"
                >
                  View Apps
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Popular Categories */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://github.com/marketplace?category=continuous-integration"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  CI/CD Tools
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Automate your build, test, and deployment workflows
                </p>
              </GlassCard>
            </a>

            <a
              href="https://github.com/marketplace?category=code-quality"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  Code Quality
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Improve code quality with linting and analysis tools
                </p>
              </GlassCard>
            </a>

            <a
              href="https://github.com/marketplace?category=security"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  Security
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Scan for vulnerabilities and secure your codebase
                </p>
              </GlassCard>
            </a>

            <a
              href="https://github.com/marketplace?category=project-management"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  Project Management
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Plan, track, and manage your projects effectively
                </p>
              </GlassCard>
            </a>

            <a
              href="https://github.com/marketplace?category=monitoring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  Monitoring
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Monitor your applications and infrastructure
                </p>
              </GlassCard>
            </a>

            <a
              href="https://github.com/marketplace?category=chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                  Chat & Collaboration
                  <FiExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-white/80">
                  Integrate with Slack, Teams, and other chat platforms
                </p>
              </GlassCard>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
