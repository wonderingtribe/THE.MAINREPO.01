'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import Link from 'next/link';
import { FiPlus, FiFolder, FiClock, FiTrendingUp, FiUsers, FiCpu, FiZap } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

export default function DashboardPage() {
  const { projects, createProject } = useApp();

  const handleCreateProject = () => {
    const name = prompt('Enter project name:');
    if (name) {
      createProject(name, 'A new website project');
    }
  };

  const stats = [
    { icon: <FiFolder className="w-6 h-6" />, label: 'Total Projects', value: projects.length },
    { icon: <FiUsers className="w-6 h-6" />, label: 'Collaborators', value: '12' },
    { icon: <FiTrendingUp className="w-6 h-6" />, label: 'Page Views', value: '2.4K' },
    { icon: <FiCpu className="w-6 h-6" />, label: 'AI Generations', value: '48' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Dashboard</h1>
            <p className="text-white/80 text-lg">Manage your projects and track your progress</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" /> New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="flex items-center gap-4">
                <div className="icon-container text-white">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/builder">
              <GlassCard className="p-6 h-full">
                <div className="icon-container text-white mb-4">
                  <FiPlus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Quick Start</h3>
                <p className="text-white/80">Start building a new project right away</p>
              </GlassCard>
            </Link>

            <Link href="/ai">
              <GlassCard className="p-6 h-full">
                <div className="icon-container text-white mb-4">
                  <FiCpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">AI Assistant</h3>
                <p className="text-white/80">Generate components with AI</p>
              </GlassCard>
            </Link>

            <Link href="/analytics">
              <GlassCard className="p-6 h-full">
                <div className="icon-container text-white mb-4">
                  <FiZap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Analytics</h3>
                <p className="text-white/80">View your performance metrics</p>
              </GlassCard>
            </Link>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">My Projects</h2>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/builder?project=${project.id}`}>
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="icon-container text-white">
                        <FiFolder className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white mb-1">{project.name}</h3>
                        <p className="text-sm text-white/70">{project.pages.length} pages</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <FiClock className="w-4 h-4" />
                      <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard className="p-16 text-center" animated={false}>
              <div className="text-white/60 mb-4">
                <FiFolder size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">No projects yet</h3>
              <p className="text-white/80 mb-6">Create your first project to get started</p>
              <button
                onClick={handleCreateProject}
                className="btn-primary inline-flex items-center gap-2"
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
