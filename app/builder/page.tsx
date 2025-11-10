'use client'

import React, { useState } from 'react'
import {
  Menu, X, Save, Download, Share2, Settings, Plus, Trash2, Copy,
  Code, Eye, EyeOff, MessageCircle, Bot, Image as ImageIcon, Video,
  FileText, Layout, Container, Type, Button as ButtonIcon,
  ChevronDown, ChevronRight, Folder, File, Zap, Play, RotateCw
} from 'lucide-react'

// Types
interface Block {
  id: string
  type: 'container' | 'text' | 'button' | 'image' | 'video' | 'form'
  props: Record<string, any>
  style: Record<string, string>
  children?: Block[]
}

interface AgentStep {
  id: string
  name: string
  type: 'prompt' | 'api' | 'logic' | 'function'
  config: Record<string, any>
}

export default function BuilderPage() {
  // State: Pages & Components
  const [pages, setPages] = useState([{ id: 'page-1', name: 'Home', blocks: [] }])
  const [currentPageId, setCurrentPageId] = useState('page-1')
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [selectedAgentStepId, setSelectedAgentStepId] = useState<string | null>(null)

  // State: Agent Workflow
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([])
  const [agentName, setAgentName] = useState('My Agent')

  // State: UI Controls
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [aiProvider, setAiProvider] = useState('microsoft')
  const [aiModel, setAiModel] = useState('gpt-4')
  const [aiPrompt, setAiPrompt] = useState('')

  // Get current page
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0]

  // Helper: Add block to canvas
  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      props: { text: `${type} element` },
      style: { padding: '16px', minHeight: '40px', border: '1px solid #ccc' }
    }
    setPages(pages.map(p => 
      p.id === currentPageId 
        ? { ...p, blocks: [...p.blocks, newBlock] }
        : p
    ))
  }

  // Helper: Add agent step
  const addAgentStep = (stepType: AgentStep['type']) => {
    const newStep: AgentStep = {
      id: `step-${Date.now()}`,
      name: `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Step`,
      type: stepType,
      config: {}
    }
    setAgentSteps([...agentSteps, newStep])
  }

  // Helper: Delete agent step
  const deleteAgentStep = (id: string) => {
    setAgentSteps(agentSteps.filter(s => s.id !== id))
  }

  // Render Canvas Blocks
  const renderBlocks = (blocks: Block[], depth = 0) => (
    <div className="space-y-2">
      {blocks.map(block => (
        <div
          key={block.id}
          onClick={() => setSelectedBlockId(block.id)}
          className={`p-4 rounded border-2 cursor-pointer transition ${
            selectedBlockId === block.id
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          style={block.style}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{block.type}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPages(pages.map(p => 
                  p.id === currentPageId
                    ? { ...p, blocks: p.blocks.filter(b => b.id !== block.id) }
                    : p
                ))
              }}
              className="p-1 hover:bg-red-200 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">{block.props.text}</div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded">
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">✨ WonderSpace Builder</h1>
          <span className="text-sm text-gray-500">/ {currentPage.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition">
            {previewMode ? <Eye size={16} /> : <EyeOff size={16} />}
            {previewMode ? 'Preview' : 'Edit'}
          </button>
          <button onClick={() => setShowAIPanel(!showAIPanel)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
            <Bot size={16} /> AI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
            <Save size={16} /> Save
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition">
            <Download size={16} /> Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Toolbox */}
        {sidebarOpen && (
          <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
            {/* Pages Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-3">📄 Pages</h3>
              {pages.map(page => (
                <div
                  key={page.id}
                  onClick={() => setCurrentPageId(page.id)}
                  className={`p-2 rounded cursor-pointer transition ${
                    currentPageId === page.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{page.name}</div>
                </div>
              ))}
              <button className="w-full mt-2 p-2 text-sm border border-dashed border-gray-300 hover:border-gray-400 rounded transition text-gray-600">
                + Add Page
              </button>
            </div>

            {/* Component Palette */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-3">🧩 Components</h3>
              <div className="space-y-2">
                {[
                  { icon: <Container size={16} />, label: 'Container', type: 'container' as const },
                  { icon: <Type size={16} />, label: 'Text', type: 'text' as const },
                  { icon: <ButtonIcon size={16} />, label: 'Button', type: 'button' as const },
                  { icon: <ImageIcon size={16} />, label: 'Image', type: 'image' as const },
                  { icon: <Video size={16} />, label: 'Video', type: 'video' as const },
                  { icon: <FileText size={16} />, label: 'Form', type: 'form' as const },
                ].map(comp => (
                  <button
                    key={comp.type}
                    onClick={() => addBlock(comp.type)}
                    className="w-full flex items-center gap-2 p-3 rounded bg-gray-100 hover:bg-gray-200 transition text-left text-sm font-medium text-gray-700"
                  >
                    {comp.icon} {comp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Builder */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-3">🤖 Agent Workflow</h3>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3 text-sm"
                placeholder="Agent name"
              />
              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                {agentSteps.map(step => (
                  <div
                    key={step.id}
                    onClick={() => setSelectedAgentStepId(step.id)}
                    className={`p-2 rounded cursor-pointer transition text-sm ${
                      selectedAgentStepId === step.id
                        ? 'bg-purple-100 border border-purple-400'
                        : 'bg-gray-100 border border-gray-300'
                    } flex items-center justify-between`}
                  >
                    <span>{step.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteAgentStep(step.id)
                      }}
                      className="p-1 hover:bg-red-200 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {['prompt', 'api', 'logic', 'function'].map(type => (
                  <button
                    key={type}
                    onClick={() => addAgentStep(type as AgentStep['type'])}
                    className="w-full p-2 text-xs border border-dashed border-purple-300 hover:border-purple-500 rounded transition text-purple-700"
                  >
                    + Add {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Center: Canvas */}
        {!showAIPanel && (
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            {previewMode ? (
              <div className="text-center text-gray-500 py-12">
                <Eye size={48} className="mx-auto mb-4 opacity-50" />
                <p>Preview Mode - Design renders here</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 min-h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Page Canvas</h2>
                {currentPage.blocks.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Layout size={48} className="mx-auto mb-4 opacity-50" />
                    Drag components from the left sidebar to start building
                  </div>
                ) : (
                  renderBlocks(currentPage.blocks)
                )}
              </div>
            )}
          </main>
        )}

        {/* Right Sidebar: Properties Panel */}
        {!showAIPanel && (
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-sm p-4">
            <h3 className="font-bold text-sm text-gray-800 mb-4">⚙️ Properties</h3>
            {selectedBlockId ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Block Text</label>
                  <input type="text" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm" placeholder="Edit text" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Background Color</label>
                  <input type="color" className="w-full mt-1 h-10 border border-gray-300 rounded cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Upload Image</label>
                  <input type="file" accept="image/*,video/*" className="w-full mt-1 text-xs" />
                </div>
                <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition">
                  Delete Block
                </button>
              </div>
            ) : selectedAgentStepId ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Step Name</label>
                  <input type="text" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm" placeholder="Step name" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Configuration JSON</label>
                  <textarea className="w-full mt-1 px-3 py-2 border border-gray-300 rounded text-xs font-mono h-20" placeholder='{"key": "value"}' />
                </div>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition">
                  Test Agent Step
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Settings size={32} className="mx-auto mb-2 opacity-50" />
                Select a block or agent step to edit
              </div>
            )}
          </aside>
        )}

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <aside className="w-96 bg-gradient-to-b from-purple-900 to-indigo-900 text-white overflow-y-auto shadow-lg p-4 flex flex-col">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Bot size={20} /> AI Assistant
            </h3>
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-sm font-semibold">Provider</label>
                <select value={aiProvider} onChange={(e) => setAiProvider(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-purple-800 text-white text-sm">
                  <option value="microsoft">Microsoft AI</option>
                  <option value="openai">OpenAI</option>
                  <option value="custom">Custom API</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Model</label>
                <select value={aiModel} onChange={(e) => setAiModel(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-purple-800 text-white text-sm">
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5">GPT-3.5</option>
                  <option value="claude">Claude</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded bg-purple-800 text-white text-sm h-24 font-mono placeholder-purple-300"
                  placeholder="Describe what you want to build..."
                />
              </div>
              <div className="bg-purple-800 p-3 rounded-lg text-xs h-32 overflow-y-auto border border-purple-700">
                <p className="text-purple-200">AI Response will appear here...</p>
              </div>
            </div>
            <button className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Zap size={18} /> Generate with AI
            </button>
          </aside>
        )}
      </div>

      {/* Bottom: Terminal/Logs */}
      <footer className="bg-gray-900 text-gray-100 border-t border-gray-700 p-4 h-24 overflow-y-auto font-mono text-xs">
        <div className="text-green-400">✓ WonderSpace Builder Ready</div>
        <div className="text-gray-400">Pages: {pages.length} | Blocks: {pages.reduce((sum, p) => sum + p.blocks.length, 0)} | Agent Steps: {agentSteps.length}</div>
      </footer>
    </div>
  )
}