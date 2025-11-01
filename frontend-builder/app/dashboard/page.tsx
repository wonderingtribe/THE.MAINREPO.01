'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/ui/Header';
import { CreateProjectModal } from '@/components/ui/CreateProjectModal';
import Link from 'next/link';
import { FiPlus, FiFolder, FiClock } from 'react-icons/fi';

export default function DashboardPage() {
  const { projects, createProject } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (name: string, description: string) => {
    createProject(name, description);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus /> New Project
          </button>
        </div>

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Start Card */}
          <Link
            href="/builder"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <FiPlus size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Start</h3>
            <p className="text-blue-100">Start building right away</p>
          </Link>

          {/* Project Cards */}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/builder?project=${project.id}`}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <FiFolder className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.pages.length} pages</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {project.description || 'No description'}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiClock />
                <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FiFolder size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first project to get started</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
