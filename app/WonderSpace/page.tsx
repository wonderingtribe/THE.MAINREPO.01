'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, FileText, Folder, Plus, Save, Play, X } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  expanded?: boolean
  children?: string[]
  parent?: string
}

export default function WonderSpace() {
  const [selectedFile, setSelectedFile] = useState('index.jsx')
  const [openTabs, setOpenTabs] = useState(['index.jsx', 'styles.css'])

  const [fileTree, setFileTree] = useState<FileItem[]>([
    { id: '1', name: 'src', type: 'folder', expanded: true, children: ['2', '3', '4'] },
    { id: '2', name: 'index.jsx', type: 'file', parent: '1' },
    { id: '3', name: 'styles.css', type: 'file', parent: '1' },
    { id: '4', name: 'App.jsx', type: 'file', parent: '1' },
    { id: '5', name: 'package.json', type: 'file' },
  ])

  const [fileContents, setFileContents] = useState({
    'index.jsx': `import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <h1>Welcome to WonderSpace</h1>
      <p>Your multi-platform code editor & builder</p>
      <p className="tagline">Build, edit, and deploy across all platforms</p>
    </div>
  );
}

export default App;`,
    'styles.css': `.container {
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

p {
  margin: 5px 0;
  font-size: 1.1rem;
  opacity: 0.95;
}

.tagline {
  font-size: 0.9rem;
  margin-top: 15px;
  font-style: italic;
  opacity: 0.8;
}`,
    'App.jsx': 'export default function App() { return <h1>App Component</h1> }',
    'package.json': '{"name": "wonderspace", "version": "1.0.0", "description": "Multi-platform code editor"}',
  })

  const toggleFolder = (id: string) => {
    setFileTree(
      fileTree.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    )
  }

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName)
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName])
    }
  }

  const closeTab = (fileName: string) => {
    const newTabs = openTabs.filter((tab) => tab !== fileName)
    setOpenTabs(newTabs)
    if (selectedFile === fileName && newTabs.length > 0) {
      setSelectedFile(newTabs[0])
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFileContents((prev) => ({
        ...prev,
        [selectedFile]: value,
      }))
    }
  }

  const getFileLanguage = (filename: string): string => {
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.json')) return 'json'
    return 'javascript'
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 border-b border-purple-700 px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ✨ WonderSpace
          </h1>
          <p className="text-xs text-gray-300">Multi-platform Code Editor & Builder</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition transform hover:scale-105">
            <Play size={16} /> Run
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition transform hover:scale-105">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto shadow-inner">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm text-gray-200">📁 Explorer</h2>
              <Plus size={18} className="cursor-pointer hover:text-blue-400 transition" />
            </div>

            {/* File Tree */}
            <div className="space-y-1">
              {fileTree
                .filter((item) => !item.parent)
                .map((item) => (
                  <RenderFileItem
                    key={item.id}
                    item={item}
                    allItems={fileTree}
                    selectedFile={selectedFile}
                    onSelect={handleFileSelect}
                    onToggleFolder={toggleFolder}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto shadow">
            {openTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setSelectedFile(tab)}
                className={`px-4 py-3 cursor-pointer border-r border-gray-700 flex items-center gap-2 transition whitespace-nowrap ${
                  selectedFile === tab
                    ? 'bg-gray-700 border-b-2 border-blue-400 text-blue-300'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <FileText size={14} />
                <span className="text-sm font-medium">{tab}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab)
                  }}
                  className="ml-1 hover:text-red-400 transition hover:bg-red-900 rounded p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            {selectedFile && (
              <Editor
                height="100%"
                language={getFileLanguage(selectedFile)}
                value={fileContents[selectedFile as keyof typeof fileContents] || ''}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                }}
              />
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 overflow-auto shadow-inner">
          <h3 className="font-semibold mb-4 text-sm text-gray-200 flex items-center gap-2">
            👁️ Preview
          </h3>
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-6 rounded-lg shadow-lg space-y-4">
            <h1 className="text-3xl font-bold">Welcome to WonderSpace</h1>
            <p className="text-gray-200">Your multi-platform code editor & builder</p>
            <p className="text-sm text-gray-300 italic">Build, edit, and deploy across all platforms</p>
            <div className="border-t border-purple-700 pt-4 mt-4">
              <p className="text-xs text-gray-400">ℹ️ Live preview integration coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal/Bottom Panel */}
      <div className="bg-gray-900 border-t border-gray-700 p-4 h-24 overflow-y-auto shadow-inner">
        <div className="text-xs text-gray-400 space-y-1 font-mono">
          <div>$ npm run dev</div>
          <div className="text-green-400">✓ Server running on http://localhost:3000</div>
          <div>✓ WonderSpace ready</div>
        </div>
      </div>
    </div>
  )
}

// File Item Component
interface RenderFileItemProps {
  item: FileItem
  allItems: FileItem[]
  selectedFile: string
  onSelect: (name: string) => void
  onToggleFolder: (id: string) => void
}

function RenderFileItem({
  item,
  allItems,
  selectedFile,
  onSelect,
  onToggleFolder,
}: RenderFileItemProps) {
  if (item.type === 'folder') {
    const children = item.children ? allItems.filter((i) => item.children?.includes(i.id)) : []

    return (
      <div key={item.id}>
        <div
          onClick={() => onToggleFolder(item.id)}
          className="flex items-center gap-1 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded transition"
        >
          {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <Folder size={16} className="text-yellow-400" />
          <span className="text-sm text-gray-200">{item.name}</span>
        </div>

        {item.expanded && (
          <div className="ml-4 space-y-1">
            {children.map((child) => (
              <RenderFileItem
                key={child.id}
                item={child}
                allItems={allItems}
                selectedFile={selectedFile}
                onSelect={onSelect}
                onToggleFolder={onToggleFolder}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(item.name)}
      className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition ${
        selectedFile === item.name
          ? 'bg-blue-600 text-blue-100'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      <FileText size={16} className={selectedFile === item.name ? 'text-blue-300' : 'text-gray-400'} />
      <span className="text-sm">{item.name}</span>
    </div>
  )
}