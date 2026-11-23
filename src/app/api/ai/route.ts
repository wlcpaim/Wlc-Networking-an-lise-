import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ answer: 'OpenAI API key not configured on server.' }, { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Você é o WLC AI, um assistente especialista em criptomoedas, análise técnica (RSI, MACD, EMA), gerenciamento de risco e tendências de mercado. Responda em português de forma clara, profissional e analítica.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Sem resposta da IA.';

    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
