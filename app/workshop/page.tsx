'use client';

import React from 'react';
import Link from 'next/link';
import { FiExternalLink, FiPackage, FiShoppingCart, FiCpu, FiZap, FiLayers } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

export default function WorkshopPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Workshop & AI Agents</h1>
          <p className="text-white/80 text-lg">
            Explore apps, extensions, and AI agents to supercharge your workflow
          </p>
        </div>

        {/* AI Agents Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">AI Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Custom Agent Builder */}
            <Link href="/agent-builder">
              <GlassCard className="p-8 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30 border-2 border-white/30 hover:scale-105 transition-transform h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <FiCpu className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Custom Agent Builder</h3>
                    <p className="text-white/70">Create your own AI agent</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4">
                  Design and deploy custom AI agents tailored to your specific needs. 
                  Configure behavior, prompts, tools, and integrations with a visual builder.
                </p>
                <ul className="space-y-2 text-white/80 mb-4">
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    Visual workflow designer
                  </li>
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    Custom prompts & behavior
                  </li>
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    API integrations
                  </li>
                </ul>
                <div className="btn-primary inline-flex items-center gap-2">
                  Build Custom Agent
                  <FiExternalLink className="w-4 h-4" />
                </div>
              </GlassCard>
            </Link>

            {/* Pre-built Agent Templates */}
            <Link href="/agent-templates">
              <GlassCard className="p-8 bg-gradient-to-br from-cyan-400/30 via-blue-400/30 to-purple-400/30 border-2 border-white/30 hover:scale-105 transition-transform h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <FiLayers className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Agent Templates</h3>
                    <p className="text-white/70">Start with ready-made agents</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4">
                  Browse our library of pre-built AI agent templates designed for common use cases. 
                  One-click deployment with customization options.
                </p>
                <ul className="space-y-2 text-white/80 mb-4">
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    50+ ready-to-use templates
                  </li>
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    One-click deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    Fully customizable
                  </li>
                </ul>
                <div className="btn-primary inline-flex items-center gap-2">
                  Browse Templates
                  <FiExternalLink className="w-4 h-4" />
                </div>
              </GlassCard>
            </Link>
          </div>
        </div>

        {/* GitHub Marketplace Button - Tie-Dye Themed Card */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">GitHub Marketplace</h2>
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

        {/* Bring Your Own AI API Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Bring Your Own AI</h2>
          <GlassCard className="p-8 bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-purple-400/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">Custom AI Integration</h3>
                <p className="text-white/90 mb-4">
                  Connect your own AI provider or API to power your projects. 
                  We support OpenAI, Anthropic, Google AI, and any custom REST API.
                </p>
                <ul className="text-white/80 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Secure API key storage with encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Support for custom endpoints and models
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Real-time testing and validation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Usage analytics and monitoring
                  </li>
                </ul>
                <a
                  href="/ai"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FiPackage className="w-5 h-5" />
                  Configure Your AI API
                </a>
              </div>
              <div className="w-full md:w-96">
                <div className="glass-card p-6">
                  <div className="text-sm font-mono text-white/80 space-y-2">
                    <div className="text-cyan-300">{'//'} Example API Configuration</div>
                    <div>{'{'}</div>
                    <div className="pl-4">&quot;provider&quot;: &quot;openai&quot;,</div>
                    <div className="pl-4">&quot;model&quot;: &quot;gpt-4&quot;,</div>
                    <div className="pl-4">&quot;api_key&quot;: &quot;sk-***&quot;,</div>
                    <div className="pl-4">&quot;endpoint&quot;: &quot;custom-url&quot;</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
