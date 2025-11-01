'use client';

import React from 'react';
import { FiMessageSquare, FiCode, FiMail, FiFileText, FiShoppingCart, FiCalendar, FiCpu, FiZap } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

const agentTemplates = [
  {
    icon: FiMessageSquare,
    name: 'Customer Support',
    description: 'Handle customer inquiries, FAQs, and support tickets automatically',
    category: 'Support',
    color: 'blue',
    features: ['24/7 availability', 'Multi-language', 'Ticket routing'],
    popular: true,
  },
  {
    icon: FiCode,
    name: 'Code Assistant',
    description: 'Help developers write, review, and debug code across multiple languages',
    category: 'Development',
    color: 'purple',
    features: ['Code generation', 'Bug detection', 'Best practices'],
    popular: true,
  },
  {
    icon: FiMail,
    name: 'Email Writer',
    description: 'Compose professional emails, responses, and marketing copy',
    category: 'Content',
    color: 'cyan',
    features: ['Templates', 'Tone adjustment', 'Grammar check'],
    popular: false,
  },
  {
    icon: FiFileText,
    name: 'Documentation Generator',
    description: 'Create technical documentation, guides, and API references',
    category: 'Documentation',
    color: 'green',
    features: ['Auto-generation', 'Markdown support', 'Version control'],
    popular: false,
  },
  {
    icon: FiShoppingCart,
    name: 'E-commerce Assistant',
    description: 'Product recommendations, inventory help, and order tracking',
    category: 'Sales',
    color: 'pink',
    features: ['Product search', 'Order status', 'Recommendations'],
    popular: true,
  },
  {
    icon: FiCalendar,
    name: 'Scheduling Bot',
    description: 'Manage appointments, meetings, and calendar coordination',
    category: 'Productivity',
    color: 'yellow',
    features: ['Calendar sync', 'Reminders', 'Time zone handling'],
    popular: false,
  },
  {
    icon: FiCpu,
    name: 'Data Analyst',
    description: 'Analyze data, generate insights, and create visualizations',
    category: 'Analytics',
    color: 'orange',
    features: ['Data processing', 'Visualization', 'Reports'],
    popular: false,
  },
  {
    icon: FiZap,
    name: 'Social Media Manager',
    description: 'Create posts, schedule content, and engage with followers',
    category: 'Marketing',
    color: 'indigo',
    features: ['Content creation', 'Scheduling', 'Analytics'],
    popular: false,
  },
];

const colorClasses = {
  blue: 'bg-blue-400/30 text-blue-300',
  purple: 'bg-purple-400/30 text-purple-300',
  cyan: 'bg-cyan-400/30 text-cyan-300',
  green: 'bg-green-400/30 text-green-300',
  pink: 'bg-pink-400/30 text-pink-300',
  yellow: 'bg-yellow-400/30 text-yellow-300',
  orange: 'bg-orange-400/30 text-orange-300',
  indigo: 'bg-indigo-400/30 text-indigo-300',
};

export default function AgentTemplatesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Agent Templates</h1>
          <p className="text-white/80 text-lg">
            Start with pre-built AI agents designed for common use cases
          </p>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <GlassCard className="p-8 tie-dye-gradient border-2 border-white/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">50+ Ready-to-Use Templates</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Deploy powerful AI agents in seconds. Each template is pre-configured with 
                proven prompts, settings, and integrations. Customize to match your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-primary inline-flex items-center gap-2">
                  <FiZap className="w-5 h-5" />
                  Browse All Templates
                </button>
                <button className="btn-secondary inline-flex items-center gap-2">
                  <FiCpu className="w-5 h-5" />
                  Build Custom Agent
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <GlassCard key={template.name} className="p-6 hover:scale-105 transition-transform relative">
                {template.popular && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-bold px-3 py-1 rounded-full text-xs">
                      ⭐ POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${colorClasses[template.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    <span className="text-white/60 text-sm">{template.category}</span>
                  </div>
                </div>

                <p className="text-white/80 mb-4 min-h-[3rem]">
                  {template.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-white/70 text-sm font-medium">Features:</div>
                  <ul className="space-y-1">
                    {template.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button className="btn-primary flex-1 text-sm py-2">
                    Deploy Now
                  </button>
                  <button className="btn-secondary px-4 text-sm py-2">
                    Preview
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Categories */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-md">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Support', 'Development', 'Content', 'Sales', 'Marketing', 'Analytics', 'Productivity', 'Custom'].map((category) => (
              <button
                key={category}
                className="glass-card p-4 text-white hover:bg-white/20 transition-colors rounded-lg"
              >
                <div className="font-semibold">{category}</div>
                <div className="text-sm text-white/60">
                  {Math.floor(Math.random() * 10) + 5} templates
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div>
          <GlassCard className="p-8 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-cyan-400/30">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Don't See What You Need?</h2>
              <p className="text-white/90 mb-6">
                Create your own custom agent from scratch with our visual builder
              </p>
              <button className="btn-primary inline-flex items-center gap-2">
                <FiCpu className="w-5 h-5" />
                Build Custom Agent
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
