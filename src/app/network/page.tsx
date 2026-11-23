'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Users, Heart, MessageSquare, Share2 } from 'lucide-react';

export default function NetworkPage() {
  const [posts, setPosts] = useState([
    { id: '1', author: 'SatoshiFan', content: 'Bitcoin testando resistência importante hoje. Olho no volume da Binance!', likes: 24, time: '2h atrás' },
    { id: '2', author: 'CryptoAnalyst', content: 'Ethereum com forte acumulação institucional. O staking líquido continua crescendo.', likes: 41, time: '4h atrás' }
  ]);
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    setPosts([{ id: Date.now().toString(), author: 'Você', content, likes: 0, time: 'Agora' }, ...posts]);
    setContent('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-2">Networking Cripto</h1>
        <p className="text-sm text-slate-400 mb-6">Conecte-se com traders, analistas e entusiastas do mercado.</p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
          <textarea
            rows={3}
            placeholder="Compartilhe sua análise ou visão de mercado..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handlePost}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            >
              Publicar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-indigo-400">@{p.author}</span>
                <span className="text-xs text-slate-500">{p.time}</span>
              </div>
              <p className="text-sm text-slate-200 mb-4">{p.content}</p>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <button className="flex items-center gap-1.5 hover:text-indigo-400">
                  <Heart className="w-4 h-4" /> {p.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-indigo-400">
                  <MessageSquare className="w-4 h-4" /> Comentar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
