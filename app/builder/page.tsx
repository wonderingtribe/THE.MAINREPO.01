'use client'

import React, { useState, useEffect } from 'react'
import { 
  Save, Code, Eye, EyeOff, Image as ImageIcon, FileCode,
  Layers, Sparkles, Terminal, Shield, Activity, GitBranch,
  MessageSquare, MessageCircle, FileText, Layout, Check, Bot, Lock, Settings
} from 'lucide-react'

type ComponentType = 'container' | 'text' | 'button' | 'image' | 'input'

interface Component {
  id: string
  type: ComponentType
  props: Record<string, any>
  styles: Record<string, string>
}

interface Page {
  id: string
  name: string
  components: Component[]
}

let componentCounter = 0

const getDefaultProps = (type: ComponentType): Record<string, string | number | boolean> => {
  switch (type) {
    case 'text':
      return { children: 'Text content' }
    case 'button':
      return { children: 'Button' }
    case 'image':
      return { src: '/placeholder.jpg', alt: 'Image' }
    case 'input':
      return { type: 'text', placeholder: 'Enter text...' }
    default:
      return {}
  }
}

const getDefaultStyles = (type: ComponentType): Record<string, string> => {
  switch (type) {
    case 'container':
      return { padding: '20px', minHeight: '100px', border: '1px dashed #ccc' }
    case 'text':
      return { fontSize: '16px', margin: '10px 0' }
    case 'button':
      return {
        padding: '10px 20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }
    default:
      return {}
  }
}

export default function BuilderPage() {
  // App builder state
  const [currentPage, setCurrentPage] = useState<Page>({
    id: 'page-1',
    name: 'Home',
    components: [],
  })
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'builder' | 'marketplace' | 'ai'>('builder')
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [aiProvider, setAIProvider] = useState('microsoft')
  const [aiCapability, setAICapability] = useState<string | null>(null)

  // Marketplace/AI configuration
  const aiProviders = [
    { id: 'microsoft', name: 'Microsoft AI', subtitle: 'Azure OpenAI Service', isPro: false },
    { id: 'chatgpt4', name: 'ChatGPT 4.0', subtitle: 'OpenAI GPT-4', isPro: true },
    { id: 'chatgpt45', name: 'ChatGPT 4.5', subtitle: 'Latest OpenAI Model', isPro: true },
    { id: 'grok', name: 'Grok', subtitle: 'xAI Grok', isPro: true },
    { id: 'custom', name: 'Custom API', subtitle: 'Bring your own AI', isPro: false },
  ]
  const capabilities = [
    { 
      id: 'code-generation', icon: <Code size={24} />, 
      name: 'Code Generation', description: 'Generate React components and functions',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'chat-assistant', icon: <MessageCircle size={24} />, 
      name: 'Chat Assistant', description: 'Get instant help and answers',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'content-creation', icon: <FileText size={24} />, 
      name: 'Content Creation', description: 'Generate copy and documentation',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'component-builder', icon: <Layout size={24} />, 
      name: 'Component Builder', description: 'Build UI components with AI',
      color: 'from-orange-500 to-red-500'
    },
  ]
  const marketplaceCategories = [
    { icon: <Terminal size={20} />, name: 'CI/CD Tools', color: 'bg-blue-500', description: 'Automate your build, test, and deployment workflows' },
    { icon: <Code size={20} />, name: 'Code Quality', color: 'bg-green-500', description: 'Improve code quality with linting and analysis tools' },
    { icon: <Shield size={20} />, name: 'Security', color: 'bg-red-500', description: 'Scan for vulnerabilities and secure your codebase' },
    { icon: <GitBranch size={20} />, name: 'Project Management', color: 'bg-purple-500', description: 'Plan, track, and manage your projects effectively' },
    { icon: <Activity size={20} />, name: 'Monitoring', color: 'bg-yellow-500', description: 'Monitor your applications and infrastructure' },
    { icon: <MessageSquare size={20} />, name: 'Chat & Collaboration', color: 'bg-indigo-500', description: 'Integrate with Slack, Teams, and other chat platforms' },
  ]

  // Add component to page
  const addComponent = (type: ComponentType) => {
    componentCounter += 1
    const newComponent: Component = {
      id: `component-${componentCounter}`,
      type,
      props: getDefaultProps(type),
      styles: getDefaultStyles(type),
    }
    setCurrentPage((prev) => ({
      ...prev,
      components: [...prev.components, newComponent]
    }))
  }

  // Render
  if (activeTab === 'builder') {
    return (
      <div className="h-screen flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              Frontend Builder
            </h1>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-300">
              {currentPage.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('marketplace')} className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 text-sm"><Layers size={16} /> Marketplace</button>
            <button onClick={() => setActiveTab('ai')} className="flex items-center gap-2 px-4 py-2 bg-pink-600 rounded hover:bg-pink-700 text-sm"><Sparkles size={16} /> AI Tools</button>
            <button onClick={()=>setPreviewMode(!previewMode)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm">
              {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button onClick={()=>setShowExport(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"><FileCode size={16} /> Export</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-sm"><Save size={16} /> Save</button>
          </div>
        </div>

        {/* Main Builder */}
        <div className="flex-1 flex overflow-hidden">
          {/* Palette */}
          {!previewMode && (
            <div className="w-64 bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto">
              <h3 className="text-white font-bold mb-4">Components</h3>
              <div className="space-y-2">
                {(['container', 'text', 'button', 'image', 'input'] as ComponentType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => addComponent(type)}
                    className="w-full text-left px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition capitalize"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Canvas */}
          <div className="flex-1 bg-white p-8 overflow-auto">
            {previewMode ? (
              <div className="text-center text-gray-500">Preview Mode - Your design will render here.</div>
            ) : (
              <div className="space-y-4">
                {currentPage.components.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp.id)}
                    className={`p-4 rounded border-2 cursor-pointer transition ${selectedComponent === comp.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    style={comp.styles}
                  >
                    <div className="text-sm text-gray-500">{comp.type}</div>
                    {comp.props.children && <div className="text-gray-800">
                      {typeof comp.props.children === 'string'
                        ? comp.props.children
                        : JSON.stringify(comp.props.children)}
                    </div>}
                  </div>
                ))}
                {currentPage.components.length === 0 && (
                  <div className="text-center text-gray-400 py-12">Click on components from the left to start building</div>
                )}
              </div>
            )}
          </div>
          {/* Side Panel */}
          {!previewMode && selectedComponent && (
            <div className="w-64 bg-gray-900 border-l border-gray-700 p-4 text-white">
              <h3 className="font-bold mb-4">Properties</h3>
              <div className="text-sm text-gray-400">Selected: {selectedComponent}</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeTab === 'marketplace') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GitHub Marketplace</h1>
            <button onClick={() => setActiveTab('builder')} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">← Back to Builder</button>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketplaceCategories.map((cat, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition cursor-pointer">
                <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center text-white mb-3`}>{cat.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{cat.name}</h4>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // AI Tab
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">✨ AI Tools</h1>
          <button onClick={() => setActiveTab('builder')} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">← Back to Builder</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your AI Provider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {aiProviders.map((provider) => (
              <div key={provider.id}
                onClick={() => setAIProvider(provider.id)}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition transform hover:scale-105 ${aiProvider === provider.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-purple-300'}`}>
                {provider.isPro &&
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Pro</span>
                }
                <div className="flex items-center gap-3 mb-2">
                  {provider.id === 'custom'
                    ? <Lock className="text-purple-600" size={24} />
                    : <Sparkles className="text-purple-600" size={24} />
                  }
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{provider.name}</h3>
                <p className="text-xs text-gray-600">{provider.subtitle}</p>
                {aiProvider === provider.id && (
                  <div className="mt-3 flex items-center gap-2 text-purple-600 text-xs font-medium"><Check size={14} /><span>Selected</span></div>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* Capabilities */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.id}
                onClick={() => setAICapability(cap.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition transform hover:scale-105 ${aiCapability === cap.id
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-purple-300'}`}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cap.color} flex items-center justify-center text-white mb-4`}>
                  {cap.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{cap.name}</h3>
                <p className="text-sm text-gray-600">{cap.description}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Custom AI integration example */}
        <section className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
              <Bot size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Bring Your Own AI</h2>
              <p className="text-purple-100">
                Connect your own AI provider or API. Supports OpenAI, Anthropic, Google AI, and custom REST APIs.
              </p>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
            <Settings size={20} />
            Configure Your AI API
          </button>
        </section>
      </div>
    </div>
  )
}
