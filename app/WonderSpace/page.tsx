'use client'

import { useState, useCallback, useRef } from 'react'
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

interface HistoryState {
  fileTree: FileItem[]
  fileContents: Record<string, string>
}

// AI helper (stub for server endpoint)
async function callAI(prompt: string): Promise<string> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  const data = await res.json()
  return data.result
}

export default function WonderSpace() {
  // === File Tree & Editor ===
  const [selectedFile, setSelectedFile] = useState('index.jsx')
  const [openTabs, setOpenTabs] = useState(['index.jsx', 'styles.css'])
  const [fileTree, setFileTree] = useState<FileItem[]>([
    { id: '1', name: 'src', type: 'folder', expanded: true, children: ['2', '3', '4'] },
    { id: '2', name: 'index.jsx', type: 'file', parent: '1' },
    { id: '3', name: 'styles.css', type: 'file', parent: '1' },
    { id: '4', name: 'App.jsx', type: 'file', parent: '1' },
    { id: '5', name: 'package.json', type: 'file' },
  ])
  const [fileContents, setFileContents] = useState<Record<string, string>>({
    'index.jsx': `import React from "react";
import "./styles.css";
function App() { return <div>Hello WonderSpace</div> }
export default App;`,
    'styles.css': `body { font-family: sans-serif; background: #111; color: white; }`,
    'App.jsx': 'export default function App() { return <h1>App Component</h1> }',
    'package.json': '{"name":"wonderspace"}',
  })

  // === Undo/Redo History ===
  const history = useRef<HistoryState[]>([])
  const future = useRef<HistoryState[]>([])

  const saveHistory = useCallback(() => {
    history.current.push({
      fileTree: JSON.parse(JSON.stringify(fileTree)),
      fileContents: JSON.parse(JSON.stringify(fileContents)),
    })
    future.current = [] // reset redo stack
  }, [fileTree, fileContents])

  const undo = () => {
    if (!history.current.length) return
    const last = history.current.pop()!
    future.current.push({
      fileTree: JSON.parse(JSON.stringify(fileTree)),
      fileContents: JSON.parse(JSON.stringify(fileContents)),
    })
    setFileTree(last.fileTree)
    setFileContents(last.fileContents)
  }

  const redo = () => {
    if (!future.current.length) return
    const next = future.current.pop()!
    history.current.push({
      fileTree: JSON.parse(JSON.stringify(fileTree)),
      fileContents: JSON.parse(JSON.stringify(fileContents)),
    })
    setFileTree(next.fileTree)
    setFileContents(next.fileContents)
  }

  // === File / Tabs ===
  const toggleFolder = (id: string) => {
    saveHistory()
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

  const handleEditorChange = (value?: string) => {
    if (value !== undefined) {
      saveHistory()
      setFileContents(prev => ({ ...prev, [selectedFile]: value }))
    }
  }

  const getFileLanguage = (filename: string) => {
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.json')) return 'json'
    return 'javascript'
  }

  // === Marketplace Items ===
  const [marketplaceItems] = useState([
    { id: '1', name: 'Dark Theme', type: 'theme' },
    { id: '2', name: 'AI Auto Complete', type: 'plugin' },
    { id: '3', name: 'React Components Pack', type: 'plugin' },
  ])

  // === AI Prompt ===
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResult, setAiResult] = useState<string>('')

  const runAI = async () => {
    const result = await callAI(aiPrompt)
    setAiResult(result)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-red-800 border-b border-red-700 px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">🔥 WonderSpace</h1>
          <p className="text-xs text-gray-300">Multi-platform IDE & Builder</p>
        </div>
        <div className="flex gap-2">
          <button onClick={undo} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Undo</button>
          <button onClick={redo} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Redo</button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2">
            <Play size={16} /> Run
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm text-gray-200">📁 Explorer</h2>
              <Plus size={18} className="cursor-pointer hover:text-red-400" />
            </div>
            {fileTree.filter(f => !f.parent).map(item => (
              <RenderFileItem key={item.id} item={item} allItems={fileTree} selectedFile={selectedFile} onSelect={handleFileSelect} onToggleFolder={toggleFolder} />
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
            {openTabs.map(tab => (
              <div key={tab} onClick={() => setSelectedFile(tab)}
                className={`px-4 py-3 cursor-pointer border-r border-gray-700 flex items-center gap-2 transition whitespace-nowrap ${selectedFile===tab?'bg-gray-700 border-b-2 border-red-400 text-red-300':'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}>
                <FileText size={14} /> <span>{tab}</span>
                <button onClick={e=>{e.stopPropagation(); closeTab(tab)}} className="ml-1 hover:text-red-400 rounded p-0.5"><X size={14}/></button>
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {selectedFile && <Editor
              height="100%"
              language={getFileLanguage(selectedFile)}
              value={fileContents[selectedFile]}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{ minimap:{enabled:false}, fontSize:13, automaticLayout:true }}
            />}
          </div>
        </div>

        {/* Marketplace Panel */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-2">🛒 Marketplace</h3>
          <div className="space-y-2">
            {marketplaceItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 cursor-pointer">
                <span>{item.name}</span>
                <button className="text-green-400 hover:text-green-300">Install</button>
              </div>
            ))}
          </div>

          {/* AI Panel */}
          <div className="mt-6">
            <h3 className="font-semibold text-sm mb-2">🤖 AI Assistant</h3>
            <input
              type="text"
              placeholder="Ask AI..."
              className="w-full px-2 py-1 rounded text-black"
              value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
            />
            <button onClick={runAI} className="mt-2 w-full bg-red-600 hover:bg-red-700 py-1 rounded text-white">Run AI</button>
            {aiResult && <pre className="mt-2 bg-gray-900 p-2 rounded text-xs overflow-auto">{aiResult}</pre>}
          </div>
        </div>
      </div>

      {/* Terminal / Bottom Panel */}
      <div className="bg-gray-900 border-t border-gray-700 p-2 h-24 overflow-y-auto text-xs font-mono text-gray-400">
        <div>$ npm run dev</div>
        <div className="text-green-400">✓ Server running</div>
        <div>✓ WonderSpace ready</div>
      </div>
    </div>
  )
}

// File Item Component
function RenderFileItem({ item, allItems, selectedFile, onSelect, onToggleFolder }: any) {
  if (item.type==='folder') {
    const children = item.children? allItems.filter(i=>item.children.includes(i.id)): []
    return (
      <div>
        <div onClick={()=>onToggleFolder(item.id)} className="flex items-center gap-1 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded">
          {item.expanded?<ChevronDown size={16}/>:<ChevronRight size={16}/>} <Folder size={16} className="text-yellow-400"/> <span className="text-sm text-gray-200">{item.name}</span>
        </div>
        {item.expanded && <div className="ml-4 space-y-1">{children.map(child=><RenderFileItem key={child.id} item={child} allItems={allItems} selectedFile={selectedFile} onSelect={onSelect} onToggleFolder={onToggleFolder}/>)}</div>}
      </div>
    )
  }
  return (
    <div onClick={()=>onSelect(item.name)} className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition ${selectedFile===item.name?'bg-red-600 text-red-100':'text-gray-300 hover:bg-gray-700'}`}>
      <FileText size={16} className={selectedFile===item.name?'text-red-300':'text-gray-400'}/> <span className="text-sm">{item.name}</span>
    </div>
  )
                         }
