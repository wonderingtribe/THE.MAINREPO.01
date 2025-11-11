'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, ChevronRight, FileText, Folder, Plus, X, Play, Save, Bot, Zap, Eye, EyeOff } from 'lucide-react'

// Monaco Editor
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// File type
interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  expanded?: boolean
  children?: string[]
  parent?: string
}

// WonderSpace Component
export default function WonderSpace() {
  const [selectedFile, setSelectedFile] = useState('index.jsx')
  const [openTabs, setOpenTabs] = useState(['index.jsx', 'styles.css'])
  const [fileTree, setFileTree] = useState<FileItem[]>([
    { id: '1', name: 'src', type: 'folder', expanded: true, children: ['2','3','4'] },
    { id: '2', name: 'index.jsx', type: 'file', parent: '1' },
    { id: '3', name: 'styles.css', type: 'file', parent: '1' },
    { id: '4', name: 'App.jsx', type: 'file', parent: '1' },
    { id: '5', name: 'package.json', type: 'file' },
  ])
  const [fileContents, setFileContents] = useState({
    'index.jsx': `import React from "react";
import "./styles.css";

export default function App() {
  return <h1>Welcome to WonderSpace</h1>
}`,
    'styles.css': `body { background-color: #0d1117; color: #58a6ff; font-family: monospace; }`,
    'App.jsx': `export default function App() { return <h1>App Component</h1> }`,
    'package.json': `{"name": "wonderspace","version":"1.0.0"}`
  })
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(false)

  // File tree toggle
  const toggleFolder = (id: string) => {
    setFileTree(fileTree.map(f => f.id === id ? { ...f, expanded: !f.expanded } : f))
  }

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName)
    if (!openTabs.includes(fileName)) setOpenTabs([...openTabs, fileName])
  }

  const closeTab = (fileName: string) => {
    const newTabs = openTabs.filter(t => t !== fileName)
    setOpenTabs(newTabs)
    if (selectedFile === fileName && newTabs.length > 0) setSelectedFile(newTabs[0])
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) setFileContents(prev => ({ ...prev, [selectedFile]: value }))
  }

  const getFileLanguage = (filename: string) => {
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.json')) return 'json'
    return 'javascript'
  }

  // File item rendering
  const RenderFileItem = ({ item, allItems }: { item: FileItem; allItems: FileItem[] }) => {
    if (item.type === 'folder') {
      const children = item.children ? allItems.filter(i => item.children?.includes(i.id)) : []
      return (
        <div>
          <div onClick={() => toggleFolder(item.id)} className="flex items-center gap-1 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded transition">
            {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">{item.name}</span>
          </div>
          {item.expanded && <div className="ml-4 space-y-1">{children.map(c => <RenderFileItem key={c.id} item={c} allItems={allItems} />)}</div>}
        </div>
      )
    }
    return (
      <div onClick={() => handleFileSelect(item.name)} className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition ${selectedFile === item.name ? 'bg-blue-900 text-blue-300' : 'text-gray-300 hover:bg-gray-800'}`}>
        <FileText size={16} /> <span className="text-sm">{item.name}</span>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-black text-blue-300">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">✨ WonderSpace</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-1 px-3 py-1 bg-blue-800 hover:bg-blue-700 rounded text-sm">
            {previewMode ? <Eye size={16} /> : <EyeOff size={16} />} {previewMode ? 'Preview' : 'Edit'}
          </button>
          <button onClick={() => setShowAIPanel(!showAIPanel)} className="flex items-center gap-1 px-3 py-1 bg-blue-800 hover:bg-blue-700 rounded text-sm">
            <Bot size={16} /> AI
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded text-sm">
            <Save size={16} /> Save
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded text-sm">
            <Play size={16} /> Run
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">📁 Explorer</span>
            <Plus size={16} className="cursor-pointer" />
          </div>
          <div className="space-y-1">
            {fileTree.filter(f => !f.parent).map(f => <RenderFileItem key={f.id} item={f} allItems={fileTree} />)}
          </div>
        </aside>

        {/* Editor + Preview */}
        <main className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-800 bg-gray-900">
            {openTabs.map(tab => (
              <div key={tab} className={`flex items-center gap-1 px-3 py-1 cursor-pointer border-r border-gray-800 ${selectedFile === tab ? 'bg-blue-800 text-blue-100' : 'text-gray-300 hover:bg-gray-800'}`}>
                {tab} <X size={14} onClick={() => closeTab(tab)} className="cursor-pointer" />
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 flex overflow-hidden">
            {!previewMode ? (
              <Editor
                height="100%"
                language={getFileLanguage(selectedFile)}
                value={fileContents[selectedFile]}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            ) : (
              <div className="flex-1 bg-gray-900 text-blue-300 flex items-center justify-center text-lg">Preview rendering...</div>
            )}
          </div>
        </main>

        {/* AI Panel */}
        {showAIPanel && (
          <aside className="w-96 bg-gray-900 border-l border-gray-800 p-4 flex flex-col text-blue-300">
            <h3 className="font-bold mb-2 flex items-center gap-2"><Bot size={16} /> AI Assistant</h3>
            <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Enter prompt..." className="w-full h-32 p-2 bg-gray-800 rounded text-blue-300 mb-2 font-mono"/>
            <div className="flex-1 bg-gray-800 rounded p-2 overflow-auto text-sm">{aiResponse || 'AI response will appear here...'}</div>
            <button className="mt-2 py-2 bg-blue-700 hover:bg-blue-600 rounded flex items-center justify-center gap-2" onClick={() => setAiResponse(`Generated result for: ${aiPrompt}`)}>
              <Zap size={16} /> Generate
            </button>
          </aside>
        )}
      </div>

      {/* Terminal */}
      <footer className="h-24 bg-gray-900 border-t border-gray-800 p-2 font-mono text-xs overflow-auto text-blue-300">
        <div>$ npm start</div>
        <div>✓ WonderSpace Ready</div>
      </footer>
    </div>
  )
}
