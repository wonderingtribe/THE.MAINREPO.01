copilot/implement-dashboard-ui
'use client';

import React, { useState } from 'react';
import { FiCpu, FiSettings, FiCode, FiZap, FiSave, FiPlay } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

export default function AgentBuilderPage() {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('microsoft');
  const [temperature, setTemperature] = useState(0.7);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Custom Agent Builder</h1>
          <p className="text-white/80 text-lg">
            Create and configure your own AI agent with custom behavior and capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiCpu className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Agent Name *</label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g., Customer Support Bot"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-2 font-medium">Description</label>
                  <textarea
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    placeholder="Describe what your agent does..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
              </div>
            </GlassCard>

            {/* AI Model Configuration */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiSettings className="w-6 h-6 text-blue-300" />
                <h2 className="text-2xl font-bold text-white">AI Model Configuration</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-2 font-medium">AI Provider</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="microsoft" className="bg-purple-900">🔷 Microsoft AI (Free)</option>
                    <option value="chatgpt4" className="bg-purple-900">🤖 ChatGPT 4.0 (Pro)</option>
                    <option value="chatgpt4.5" className="bg-purple-900">✨ ChatGPT 4.5 (Pro)</option>
                    <option value="grok" className="bg-purple-900">🚀 Grok (Pro)</option>
                    <option value="custom" className="bg-purple-900">🔧 Custom API (Free)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 mb-2 font-medium">
                    Temperature: {temperature}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-1">
                    <span>Focused</span>
                    <span>Creative</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* System Prompt */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiCode className="w-6 h-6 text-cyan-300" />
                <h2 className="text-2xl font-bold text-white">System Prompt</h2>
              </div>

              <div>
                <label className="block text-white/90 mb-2 font-medium">Define Agent Behavior</label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a helpful assistant that..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none font-mono text-sm"
                />
                <p className="text-white/60 text-sm mt-2">
                  Define how your agent should behave, its personality, and any specific instructions
                </p>
              </div>
            </GlassCard>

            {/* Tools & Integrations */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiZap className="w-6 h-6 text-yellow-300" />
                <h2 className="text-2xl font-bold text-white">Tools & Integrations</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Web Search', enabled: true },
                  { name: 'Code Execution', enabled: false },
                  { name: 'Image Generation', enabled: false },
                  { name: 'File Upload', enabled: true },
                  { name: 'API Calls', enabled: false },
                  { name: 'Database Access', enabled: false },
                ].map((tool) => (
                  <label key={tool.name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={tool.enabled}
                      className="w-5 h-5 rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-400"
                    />
                    <span className="text-white/90">{tool.name}</span>
                  </label>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Preview */}
            <GlassCard className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
              
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-400/30 flex items-center justify-center">
                      <FiCpu className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {agentName || 'Unnamed Agent'}
                      </div>
                      <div className="text-white/60 text-sm">
                        {selectedModel === 'microsoft' && '🔷 Microsoft AI'}
                        {selectedModel === 'chatgpt4' && '🤖 ChatGPT 4.0'}
                        {selectedModel === 'chatgpt4.5' && '✨ ChatGPT 4.5'}
                        {selectedModel === 'grok' && '🚀 Grok'}
                        {selectedModel === 'custom' && '🔧 Custom API'}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    {agentDescription || 'No description provided'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Temperature:</span>
                    <span className="text-white">{temperature}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">System Prompt:</span>
                    <span className="text-white">
                      {systemPrompt ? `${systemPrompt.length} chars` : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="btn-primary w-full inline-flex items-center justify-center gap-2">
                  <FiPlay className="w-5 h-5" />
                  Test Agent
                </button>
                <button className="btn-secondary w-full inline-flex items-center justify-center gap-2">
                  <FiSave className="w-5 h-5" />
                  Save Agent
                </button>
              </div>
            </GlassCard>

            {/* Tips */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">•</span>
                  <span>Be specific in your system prompt for better results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">•</span>
                  <span>Lower temperature for factual tasks, higher for creative</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">•</span>
                  <span>Test your agent before deploying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">•</span>
                  <span>Enable only the tools your agent needs</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
