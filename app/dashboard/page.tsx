'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import Link from 'next/link';
import { FiPlus, FiFolder, FiClock, FiTrendingUp, FiUsers, FiCpu, FiZap } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';
import { CreateProjectModal } from '@/components/ui/CreateProjectModal';

export default function DashboardPage() {
  const { projects, createProject } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleCreateProject = (name: string, description: string) => {
    createProject(name, description);
  };

  const handleAIGenerate = () => {
    if (aiPrompt.trim()) {
      window.location.href = `/ai?prompt=${encodeURIComponent(aiPrompt)}`;
    }
  };

  const stats = [
    { icon: <FiFolder className="w-6 h-6 flex-shrink-0" />, label: 'Total Projects', value: projects.length },
    { icon: <FiUsers className="w-6 h-6 flex-shrink-0" />, label: 'Collaborators', value: '12' },
    { icon: <FiTrendingUp className="w-6 h-6 flex-shrink-0" />, label: 'Page Views', value: '2.4K' },
    { icon: <FiCpu className="w-6 h-6 flex-shrink-0" />, label: 'AI Generations', value: '48' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="overflow-hidden">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg truncate">Dashboard</h1>
            <p className="text-white/80 text-lg truncate">Manage your projects and track your progress</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            <FiPlus className="w-5 h-5" /> New Project
          </button>
        </div>

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
        />

        {/* AI Assistant Prompt */}
        <div className="mb-8">
          <GlassCard className="p-8 tie-dye-gradient border-2 border-white/30 overflow-hidden">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 flex-shrink-0">
                <FiCpu className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg truncate">
                What can I build for you? ✨
              </h2>
              <p className="text-white/90 text-lg mb-6 truncate">
                Let AI help you create amazing components and features
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIGenerate()}
                    placeholder="Try: 'Create a pricing table with 3 tiers'"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg truncate"
                  />
                  <button
                    onClick={handleAIGenerate}
                    className="btn-primary mt-4 inline-flex items-center gap-2"
                  >
                    <FiZap className="w-5 h-5" />
                    Generate with AI
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-4 flex items-center gap-4 overflow-hidden">
              <div className="icon-container text-white flex-shrink-0">{stat.icon}</div>
              <div className="truncate">
                <p className="text-white/70 text-sm font-medium truncate">{stat.label}</p>
                <p className="text-white text-2xl font-bold truncate">{stat.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md truncate">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FiPlus, label: 'Quick Start', href: '/builder', desc: 'Start building a new project right away' },
              { icon: FiCpu, label: 'AI Assistant', href: '/ai', desc: 'Generate components with AI' },
              { icon: FiZap, label: 'Analytics', href: '/analytics', desc: 'View your performance metrics' },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <GlassCard className="p-6 h-full overflow-hidden">
                  <div className="icon-container text-white mb-4 flex-shrink-0">
                    <action.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white truncate">{action.label}</h3>
                  <p className="text-white/80 truncate">{action.desc}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md truncate">My Projects</h2>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/builder?project=${project.id}`}>
                  <GlassCard className="p-6 h-full overflow-hidden">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="icon-container text-white flex-shrink-0">
                        <FiFolder className="w-6 h-6" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-semibold text-lg text-white mb-1 truncate">{project.name}</h3>
                        <p className="text-sm text-white/70 truncate">{project.pages.length} pages</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mb-4 truncate">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/70 truncate">
                      <FiClock className="w-4 h-4 flex-shrink-0" />
                      <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard className="p-16 text-center overflow-hidden" animated={false}>
              <div className="text-white/60 mb-4">
                <FiFolder size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white truncate">No projects yet</h3>
              <p className="text-white/80 mb-6 truncate">Create your first project to get started</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 flex-shrink-0"
              >
                <FiPlus /> Create Project
              </button>
            </GlassCard>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}