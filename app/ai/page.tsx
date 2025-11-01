'use client';

import React, { useState } from 'react';
import { FiCpu, FiCode, FiMessageCircle, FiFileText, FiLayers, FiZap, FiStar, FiLock } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

type AIProvider = 'microsoft' | 'chatgpt4' | 'chatgpt4.5' | 'grok' | 'custom';
type UserTier = 'free' | 'pro';

export default function MicrosoftAIPage() {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('microsoft');
  const [userTier] = useState<UserTier>('free'); // This would come from user context
  const [prompt, setPrompt] = useState('');
  const [customApiKey, setCustomApiKey] = useState('');
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const aiProviders = [
    { 
      id: 'microsoft' as AIProvider, 
      name: 'Microsoft AI', 
      description: 'Azure OpenAI Service',
      icon: '🔷',
      isPremium: false
    },
    { 
      id: 'chatgpt4' as AIProvider, 
      name: 'ChatGPT 4.0', 
      description: 'OpenAI GPT-4',
      icon: '🤖',
      isPremium: true
    },
    { 
      id: 'chatgpt4.5' as AIProvider, 
      name: 'ChatGPT 4.5', 
      description: 'Latest OpenAI Model',
      icon: '✨',
      isPremium: true
    },
    { 
      id: 'grok' as AIProvider, 
      name: 'Grok', 
      description: 'xAI Grok',
      icon: '🚀',
      isPremium: true
    },
    { 
      id: 'custom' as AIProvider, 
      name: 'Custom API', 
      description: 'Bring your own AI',
      icon: '🔧',
      isPremium: false
    },
  ];

  const features = [
    { icon: <FiCode className="w-6 h-6" />, title: 'Code Generation', description: 'Generate React components and functions' },
    { icon: <FiMessageCircle className="w-6 h-6" />, title: 'Chat Assistant', description: 'Get instant help and answers' },
    { icon: <FiFileText className="w-6 h-6" />, title: 'Content Creation', description: 'Generate copy and documentation' },
    { icon: <FiLayers className="w-6 h-6" />, title: 'Component Builder', description: 'Build UI components with AI' },
  ];

  const handleGenerate = () => {
    if (userTier === 'free' && selectedProvider !== 'microsoft' && selectedProvider !== 'custom') {
      alert('This AI provider requires a Pro subscription. Upgrade to access premium features!');
      return;
    }
    // Handle AI generation
    console.log('Generating with:', selectedProvider, prompt);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Tie-Dye Theme */}
        <div className="mb-8">
          <GlassCard className="p-8 tie-dye-gradient border-2 border-white/30">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Microsoft AI Assistant
              </h1>
              <p className="text-white/90 text-xl mb-6">
                What can I build for you today? ✨
              </p>
              
              {/* Main AI Prompt with Model Selector */}
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build... (e.g., 'Create a contact form with validation')"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none pr-32"
                    rows={4}
                  />
                  
                  {/* AI Model Selector Dropdown - Small, positioned in textarea */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      <button
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 border border-white/40 rounded-lg text-white font-medium flex items-center gap-2 transition-all"
                      >
                        <FiCpu className="w-3 h-3" />
                        {aiProviders.find(p => p.id === selectedProvider)?.name}
                        <span className="text-white/70">▼</span>
                      </button>
                      
                      {showModelDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl overflow-hidden z-50">
                          {aiProviders.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => {
                                if (provider.isPremium && userTier === 'free') {
                                  alert('This AI provider requires a Pro subscription. Upgrade to access premium features!');
                                } else {
                                  setSelectedProvider(provider.id);
                                  setShowModelDropdown(false);
                                }
                              }}
                              className={`w-full px-4 py-2.5 text-left hover:bg-purple-100 transition-colors flex items-center justify-between gap-2 ${
                                selectedProvider === provider.id ? 'bg-purple-50' : ''
                              } ${provider.isPremium && userTier === 'free' ? 'opacity-60' : ''}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{provider.icon}</span>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    {provider.name}
                                    {provider.isPremium && userTier === 'free' && (
                                      <FiLock className="w-3 h-3 text-gray-500" />
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-600">{provider.description}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    className="btn-primary mt-4 inline-flex items-center gap-2 text-lg"
                  >
                    <FiZap className="w-5 h-5" />
                    Generate with AI
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Provider Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Choose Your AI Provider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiProviders.map((provider) => (
              <GlassCard
                key={provider.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedProvider === provider.id 
                    ? 'ring-2 ring-white/50 bg-white/20' 
                    : 'hover:bg-white/10'
                } ${provider.isPremium && userTier === 'free' ? 'opacity-75' : ''}`}
                onClick={() => {
                  if (provider.isPremium && userTier === 'free') {
                    alert(`${provider.name} requires a Pro subscription!`);
                  } else {
                    setSelectedProvider(provider.id);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{provider.icon}</span>
                  {provider.isPremium && (
                    <span className="flex items-center gap-1 text-yellow-300 text-sm">
                      {userTier === 'free' ? <FiLock className="w-4 h-4" /> : <FiStar className="w-4 h-4" />}
                      Pro
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {provider.name}
                </h3>
                <p className="text-white/80 text-sm">{provider.description}</p>
                {selectedProvider === provider.id && (
                  <div className="mt-3 text-white/90 text-sm font-medium">
                    ✓ Selected
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Custom API Configuration */}
        {selectedProvider === 'custom' && (
          <div className="mb-8">
            <GlassCard className="p-6 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20">
              <h3 className="text-xl font-bold text-white mb-4">Custom API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 font-medium mb-2">API Endpoint</label>
                  <input
                    type="text"
                    placeholder="https://api.example.com/v1/chat"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-white/90 font-medium mb-2">API Key</label>
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <p className="mt-2 text-white/70 text-sm">Your API key is stored securely and never shared</p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-6">
                <div className="icon-container text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {userTier === 'free' && (
          <GlassCard className="p-8 bg-gradient-to-br from-yellow-400/30 via-orange-400/30 to-pink-400/30 border-2 border-yellow-300/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300/30 rounded-full mb-4">
                <FiStar className="w-8 h-8 text-yellow-300" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Upgrade to Pro</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Unlock premium AI providers like ChatGPT 4.0, ChatGPT 4.5, and Grok. 
                Get faster responses, more generation credits, and priority support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary inline-flex items-center gap-2 text-lg">
                  <FiStar className="w-5 h-5" />
                  Upgrade to Pro - $29/month
                </button>
                <button className="btn-secondary inline-flex items-center gap-2 text-lg">
                  See All Plans
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span className="text-white/90 text-sm">All premium AI providers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span className="text-white/90 text-sm">10x more generation credits</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span className="text-white/90 text-sm">Priority support & updates</span>
                </div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
}
