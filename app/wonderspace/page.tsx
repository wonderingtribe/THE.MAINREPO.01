'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Split from 'react-split';
import { FiFolder, FiFile, FiPlus, FiCpu, FiShoppingBag, FiZap } from 'react-icons/fi';
import { MarketplacePanel } from './MarketplacePanel';

// Monaco Editor client-side only
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

interface Tab {
  file: FileNode;
  id: string;
}

const initialFiles: FileNode[] = [
  { name: 'src', type: 'folder', children: [
      { name: 'index.tsx', type: 'file', content: '// Start coding...' },
      { name: 'App.tsx', type: 'file', content: '// React app component' },
  ]},
  { name: 'package.json', type: 'file', content: '{ "name": "wonder-space" }' },
];

export default function WonderSpacePage() {
  const [files] = useState<FileNode[]>(initialFiles);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const openFile = (file: FileNode) => {
    if (!tabs.find(t => t.file.name === file.name)) {
      const newTab = { file, id: `tab-${Date.now()}` };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    } else {
      const existingTab = tabs.find(t => t.file.name === file.name);
      if (existingTab) setActiveTabId(existingTab.id);
    }
  };

  const updateFileContent = (id: string, content: string) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, file: { ...t.file, content } } : t));
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-700 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">WonderSpace</span>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FiZap /> : <FiCpu />}
          </button>
        </div>
        <div>
          {files.map(folder => (
            <div key={folder.name} className="mb-2">
              <div className="font-semibold flex items-center gap-2"><FiFolder /> {folder.name}</div>
              <div className="ml-4">
                {folder.children?.map(file => (
                  <div key={file.name} onClick={() => openFile(file)} className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded flex items-center gap-2">
                    <FiFile /> {file.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Workspace */}
      <Split className="flex-1" sizes={[70, 30]} minSize={200} gutterSize={6} direction="horizontal">
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {tabs.map(tab => (
              <div key={tab.id} className={`px-3 py-2 cursor-pointer ${activeTabId === tab.id ? 'bg-gray-800 font-semibold' : 'hover:bg-gray-700'}`} onClick={() => setActiveTabId(tab.id)}>
                {tab.file.name}
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1">
            {tabs.map(tab => (
              activeTabId === tab.id && (
                <MonacoEditor
                  key={tab.id}
                  height="100%"
                  theme={darkMode ? 'vs-dark' : 'light'}
                  defaultLanguage="javascript"
                  value={tab.file.content}
                  onChange={(val) => updateFileContent(tab.id, val || '')}
                />
              )
            ))}
          </div>
        </div>

        {/* Marketplace Panel */}
        <MarketplacePanel darkMode={darkMode} />
      </Split>
    </div>
  );
}