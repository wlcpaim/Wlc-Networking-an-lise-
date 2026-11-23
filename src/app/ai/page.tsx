'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Cpu, Send } from 'lucide-react';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou a WLC AI. Como posso analisar o mercado ou tendências de criptomoedas para você hoje?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;
    const userMsg = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer || 'Erro ao processar.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro de conexão com o servidor de IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <header className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="font-bold">WLC Intelligence AI</h1>
            <p className="text-xs text-slate-400">Assistente avançado em criptomoedas e análise técnica</p>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl rounded-xl p-4 text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-sm text-slate-500 animate-pulse">WLC AI está analisando o mercado...</div>}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-950">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Ex: Analise o RSI e a tendência atual do Bitcoin..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-lg text-white font-medium flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
