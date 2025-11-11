'use client'

import { useState } from 'react'

interface AIResponse {
  prompt: string
  result: string
}

export default function AIPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState<AIResponse[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) throw new Error(`Error: ${res.statusText}`)

      const data = await res.json()
      const result = data.text || data.result || ''

      setResponses((prev) => [{ prompt, result }, ...prev])
      setPrompt('')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-red-400">WonderAI</h1>
      <p className="text-gray-300 mb-6">Ask AI to generate code, components, or ideas for your projects.</p>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100"
          placeholder="Enter your AI prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Responses History */}
      <div className="flex-1 overflow-auto space-y-6">
        {responses.length === 0 && (
          <p className="text-gray-400">No AI responses yet. Try a prompt above!</p>
        )}

        {responses.map((r, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <p className="text-gray-300 italic mb-2">Prompt: {r.prompt}</p>
            <pre className="text-white whitespace-pre-wrap">{r.result}</pre>
          </div>
        ))}
      </div>
    </div>
  )
        }
