import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    // Simple AI stub: replace this with OpenAI or your AI backend
    // Example: call OpenAI GPT API with server-side key
    const result = `AI Response for: "${prompt}"`

    return NextResponse.json({ result })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 })
  }
  }
