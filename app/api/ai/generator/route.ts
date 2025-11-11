import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const prompt = body.prompt

    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })

    const OPENAI_KEY = process.env.OPENAI_GITHUB_MODULE
    if (!OPENAI_KEY) throw new Error('OpenAI key is missing')

    // Example call to OpenAI API
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    const text = data.choices?.[0]?.text || 'No result'

    return NextResponse.json({ text })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
