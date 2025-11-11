'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';
import { FiPlus, FiCpu, FiShoppingBag, FiFolder } from 'react-icons/fi';

export default function BuilderPage() {
  const [activePanel, setActivePanel] = useState<'projects' | 'ai' | 'marketplace' | null>(null);

  const projects = [
    { id: '1', name: 'Landing Page', pages: 3 },
    { id: '2', name: 'Dashboard App', pages: 5 },
  ];

  const marketplaceItems = [
    { id: 'ext1', name: 'Form Builder', description: 'Drag-and-drop form component', type: 'Extension' },
    { id: 'ext2', name: 'Analytics Widget', description: 'Track page views & events', type: 'Widget' },
    { id: 'ext3', name: 'AI Text Generator', description: 'Generate components using AI', type: 'Action' },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white/10 backdrop-blur-lg p-4 flex flex-col gap-4">
          <button
            className="btn-secondary"
            onClick={() => setActivePanel(activePanel === 'projects' ? null : 'projects')}
          >
            <FiFolder /> Projects
          </button>
          <button
            className="btn-secondary"
            onClick={() => setActivePanel(activePanel === 'ai' ? null : 'ai')}
          >
            <FiCpu /> AI Assistant
          </button>
          <button
            className="btn-secondary"
            onClick={() => setActivePanel(activePanel === 'marketplace' ? null : 'marketplace')}
          >
            <FiShoppingBag /> Marketplace
          </button>

          {/* Sidebar Panels */}
          {activePanel === 'projects' && (
            <div className="flex-1 overflow-y-auto mt-2">
              {projects.map((p) => (
                <div key={p.id} className="glass-card p-2 mb-2">
                  {p.name} ({p.pages} pages)
                </div>
              ))}
            </div>
          )}

          {activePanel === 'ai' && (
            <div className="flex-1 mt-2">
              <GlassCard className="p-4">
                <h3 className="text-white font-bold mb-2">AI Assistant</h3>
                <input
                  type="text"
                  placeholder="Generate a component..."
                  className="w-full p-2 rounded bg-white/10 text-white placeholder-white/50"
                />
                <button className="btn-primary mt-2 w-full">Generate</button>
              </GlassCard>
            </div>
          )}

          {activePanel === 'marketplace' && (
            <div className="flex-1 mt-2 overflow-y-auto">
              {marketplaceItems.map((item) => (
                <GlassCard key={item.id} className="p-4 mb-2">
                  <h4 className="text-white font-semibold">{item.name}</h4>
                  <p className="text-white/80 text-sm mb-2">{item.description}</p>
                  <button className="btn-primary">Install</button>
                </GlassCard>
              ))}
            </div>
          )}
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-white/5 backdrop-blur-lg p-4 m-2 rounded-lg min-h-[80vh]">
          <h2 className="text-2xl font-bold text-white mb-4">Drag-and-Drop Canvas</h2>
          <div className="border-2 border-dashed border-white/20 h-full rounded-lg flex items-center justify-center text-white/50">
            Workspace placeholder (drag components here)
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}