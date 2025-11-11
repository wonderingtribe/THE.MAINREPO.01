'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, ChevronRight, FileText, Folder, Plus, Save, Play, X, Cpu, Box } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface FileItem { id: string; name: string; type: 'file' | 'folder'; expanded?: boolean; children?: string[]; parent?: string }
interface MarketplaceItem { id: string; name: string; description: string; installed?: boolean }
interface AISuggestion { id: string; prompt: string; output: string }

export default function WonderSpace() {
  const [selectedFile, setSelectedFile] = useState('index.jsx')
  const [openTabs, setOpenTabs] = useState(['index.jsx', 'styles.css'])
  const [fileTree, setFileTree] = useState<FileItem[]>([
    { id: '1', name: 'src', type: 'folder', expanded: true, children: ['2','3','4'] },
    { id: '2', name: 'index.jsx', type: 'file', parent:'1' },
    { id: '3', name: 'styles.css', type: 'file', parent:'1' },
    { id: '4', name: 'App.jsx', type: 'file', parent:'1' },
    { id: '5', name: 'package.json', type: 'file' },
  ])
  const [fileContents,setFileContents] = useState<Record<string,string>>({
    'index.jsx':`import React from "react";\nimport "./styles.css";\n\nfunction App(){return(<div className="container"><h1>Welcome to WonderSpace</h1></div>);}\nexport default App;`,
    'styles.css':`.container{padding:30px;min-height:100vh;color:white;display:flex;align-items:center;justify-content:center;}`,
    'App.jsx':'export default function App(){return <h1>App Component</h1>}',
    'package.json':'{"name":"wonderspace","version":"1.0.0"}',
  })

  const [marketplace,setMarketplace] = useState<MarketplaceItem[]>([
    {id:'ext1',name:'Prettier',description:'Code formatter'},
    {id:'ext2',name:'Tailwind IntelliSense',description:'Tailwind CSS suggestions'},
    {id:'ext3',name:'React Snippets',description:'React component snippets'},
  ])

  const [aiPrompt,setAiPrompt] = useState('')
  const [aiSuggestions,setAiSuggestions] = useState<AISuggestion[]>([])

  const handleFileSelect=(fileName:string)=>{setSelectedFile(fileName);if(!openTabs.includes(fileName)) setOpenTabs([...openTabs,fileName])}
  const closeTab=(fileName:string)=>{const newTabs=openTabs.filter(tab=>tab!==fileName);setOpenTabs(newTabs);if(selectedFile===fileName&&newTabs.length)setSelectedFile(newTabs[0])}
  const handleEditorChange=(value?:string)=>{if(value!==undefined){setFileContents(prev=>({...prev,[selectedFile]:value}))}}
  const getFileLanguage=(filename:string)=>{if(filename.endsWith('.css')) return 'css'; if(filename.endsWith('.json')) return 'json'; return 'javascript'}
  const toggleFolder=(id:string)=>{setFileTree(tree=>tree.map(item=>item.id===id?{...item,expanded:!item.expanded}:item))}
  const installExtension=(id:string)=>{setMarketplace(prev=>prev.map(item=>item.id===id?{...item,installed:true}:item))}
  const runAISuggestion=()=>{if(!aiPrompt) return; const output=`// AI Output for: ${aiPrompt}\nconsole.log("Generated code...");`; setAiSuggestions(prev=>[...prev,{id:Date.now().toString(),prompt:aiPrompt,output}]); setAiPrompt('')}
  const handleDrop=useCallback((e:React.DragEvent)=>{e.preventDefault(); const fileName=e.dataTransfer.getData('fileName'); if(fileName&&!fileContents[fileName]){setFileContents(prev=>({...prev,[fileName]:'// New file content'})); handleFileSelect(fileName)}},[fileContents])
  const handleDragOver=(e:React.DragEvent)=>e.preventDefault()

  const RenderFileItem=({item}:{item:FileItem})=>{
    if(item.type==='folder'){
      const children=item.children?.map(id=>fileTree.find(f=>f.id===id)).filter(Boolean) as FileItem[]
      return(<div key={item.id}><div onClick={()=>toggleFolder(item.id)} className="flex items-center gap-1 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded transition">{item.expanded?<ChevronDown size={16}/>:<ChevronRight size={16}/>}<Folder size={16} className="text-yellow-400"/><span className="text-sm text-gray-200">{item.name}</span></div>{item.expanded&&<div className="ml-4 space-y-1">{children.map(c=><RenderFileItem key={c.id} item={c}/> )}</div>}</div>)
    }
    return(<div onClick={()=>handleFileSelect(item.name)} className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition ${selectedFile===item.name?'bg-red-600 text-red-100':'text-gray-300 hover:bg-gray-700'}`}><FileText size={16}/><span className="text-sm">{item.name}</span></div>)
  }

  return(
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-600 border-b border-red-700 px-6 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">✨ WonderSpace</h1>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><Play size={16}/> Run</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><Save size={16}/> Save</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto shadow-inner p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-gray-200">📁 Explorer</h2>
            <Plus size={18} className="cursor-pointer hover:text-red-400 transition"/>
          </div>
          {fileTree.filter(f=>!f.parent).map(item=><RenderFileItem key={item.id} item={item}/> )}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col bg-gray-900" onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto shadow">{openTabs.map(tab=><div key={tab} className={`px-4 py-3 cursor-pointer border-r border-gray-700 flex items-center gap-2 transition whitespace-nowrap ${selectedFile===tab?'bg-gray-700 border-b-2 border-red-400 text-red-300':'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}><FileText size={14}/><span className="text-sm font-medium">{tab}</span><button onClick={e=>{e.stopPropagation();closeTab(tab)}} className="ml-1 hover:text-red-400 transition hover:bg-red-900 rounded p-0.5"><X size={14}/></button></div>)}</div>
          <div className="flex-1 overflow-hidden">{selectedFile && <Editor height="100%" language={getFileLanguage(selectedFile)} value={fileContents[selectedFile]||''} onChange={handleEditorChange} theme="vs-dark" options={{minimap:{enabled:false},fontSize:13,lineNumbers:'on',wordWrap:'on',scrollBeyondLastLine:false,automaticLayout:true}}/>}</div>
        </div>

        {/* Marketplace + AI */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-auto p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-200 flex items-center gap-2"><Box size={16}/> Marketplace</h3>
            <div className="space-y-2 mt-2">{marketplace.map(item=><div key={item.id} className="flex justify-between items-center p-2 bg-gray-700 rounded hover:bg-gray-600 transition"><div><p className="text-gray-100 font-medium">{item.name}</p><p className="text-gray-300 text-xs">{item.description}</p></div><button onClick={()=>installExtension(item.id)} className={`px-2 py-1 text-xs rounded ${item.installed?'bg-green-600':'bg-red-600'} hover:scale-105 transition`}>{item.installed?'Installed':'Install'}</button></div>)}</div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-200 flex items-center gap-2"><Cpu size={16}/> AI Assistant</h3>
            <textarea className="w-full p-2 mt-2 text-black rounded resize-none h-16" placeholder="Describe code to generate..." value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}/>
            <button onClick={runAISuggestion} className="w-full mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition">Run AI</button>
            <div className="mt-2 max-h-48 overflow-y-auto space-y-1">{aiSuggestions.map(s=><pre key={s.id} className="bg-gray-700 p-2 rounded text-xs overflow-auto">{s.output}</pre>)}</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-900 border-t border-gray-700 p-4 h-24 overflow-y-auto shadow-inner">
        <div className="text-xs text-gray-400 font-mono">
          <div>$ npm run dev</div>
          <div className="text-green-400">✓ Server running on http://localhost:3000</div>
          <div>✓ WonderSpace ready</div>
        </div>
      </div>
    </div>
  )
    }
