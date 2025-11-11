 'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Code, Zap, Users, Send, X, Minimize2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! 👋 Welcome to WonderSpace', sender: 'ai', timestamp: new Date() },
    { id: 2, text: 'I can help you build amazing Websites and apps!', sender: 'ai', timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputValue,
          sender: 'user',
          timestamp: new Date(),
        },
      ])

      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'That sounds great! Ready to get started with WonderSpace? 🚀',
            sender: 'ai',
            timestamp: new Date(),
          },
        ])
      }, 500)

      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Top Banner with AI Chat */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-b-2 border-purple-500 shadow-2xl">
        {/* Collapsed Chat View */}
        {!isChatOpen && (
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold rainbow-text">🤖 Microsoft AI Assistant</p>
                <p className="text-xs text-purple-200">Ready to help...</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition"
            >
              Open Chat
            </button>
          </div>
        )}

        {/* Expanded Chat View */}
        {isChatOpen && (
          <div className="p-4 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-black-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-600 flex items-center justify-center shadow-lg">
                  <Sparkles size={24} className="text-white animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-bold rainbow-text">🤖 Microsoft AI Assistant</h3>
                  <p className="text-xs text-purple-300">Powered by Azure OpenAI</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-red-700 rounded-lg transition"
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-red-700 rounded-lg transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-black-700 text-red-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSendMessage()
                }}
                placeholder="Ask me anything about WonderSpace..."
                className="flex-1 px-4 py-2 bg-black-800 border border-purple-600 rounded-lg text-sm placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={40} className="rainbow-text glow" />
            <h1 className="text-5xl md:text-6xl font-bold rainbow-text glow">
              WonderSpace
            </h1>
          </div>
          <p className="text-xl bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-bold mb-2">
            AI-Powered No-Code Builder
          </p>
          <p className="text-lg bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Create AI agents, build beautiful UIs, and deploy with one click
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 slide-in-left">
          <div className="rainbow-border rainbow-bg card p-6 text-center hover-rainbow">
            <Code size={32} className="mx-auto mb-4 rainbow-text" />
            <h3 className="text-xl font-bold rainbow-text mb-2">Visual Builder</h3>
            <p className="text-gray-300">Drag-and-drop components. No coding needed.</p>
          </div>
          <div className="rainbow-border rainbow-bg card p-6 text-center hover-rainbow">
            <Zap size={32} className="mx-auto mb-4 rainbow-text" />
            <h3 className="text-xl font-bold rainbow-text mb-2">AI Powered</h3>
            <p className="text-gray-300">Generate code and content instantly with Microsoft AI.</p>
          </div>
          <div className="rainbow-border rainbow-bg card p-6 text-center hover-rainbow">
            <Users size={32} className="mx-auto mb-4 rainbow-text" />
            <h3 className="text-xl font-bold rainbow-text mb-2">Deploy Fast</h3>
            <p className="text-gray-300">Go from idea to live in minutes.</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/builder"
          className="flex items-center gap-2 px-8 py-4 rainbow-border rainbow-bg rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 slide-in-right rainbow-shadow hover-rainbow"
        >
          <span className="rainbow-text">Launch Builder</span>
          <ArrowRight size={24} className="rainbow-text" />
        </Link>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="rainbow-num text-3xl font-bold">1M+</p>
            <p className="text-gray-400 text-sm">Components Created</p>
          </div>
          <div>
            <p className="rainbow-num text-3xl font-bold">10K+</p>
            <p className="text-gray-400 text-sm">Active Builders</p>
          </div>
          <div>
            <p className="rainbow-num text-3xl font-bold">99.9%</p>
            <p className="text-gray-400 text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 border-t border-purple-500 py-8 mt-16">
        <div className="text-center">
          <p className="rainbow-text font-bold mb-2">Built with ❤️ by AI WONDER LABS</p>
          <p className="text-gray-400 text-sm">© 2025 WonderSpace. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="text-purple-400 hover:text-purple-300 transition">
              Privacy
            </a>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition">
              Terms
            </a>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}