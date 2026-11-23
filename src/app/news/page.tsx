'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Newspaper, ExternalLink } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState([
    { id: '1', title: 'Bitcoin ultrapassa marca importante com fluxo institucional recorde', source: 'CoinDesk', time: '1h atrás', url: '#' },
    { id: '2', title: 'Atualizações no Ethereum prometem reduzir taxas de gas em camada 2', source: 'CoinTelegraph', time: '3h atrás', url: '#' },
    { id: '3', title: 'Reguladores globais debatem novas diretrizes para stablecoins', source: 'CryptoSlate', time: '5h atrás', url: '#' }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-indigo-400" /> Notícias do Mercado
          </h1>
          <p className="text-sm text-slate-400">Fique por dentro das últimas atualizações do universo cripto.</p>
        </header>

        <div className="space-y-4">
          {news.map(item => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
                  <span className="font-semibold">{item.source}</span>
                  <span>•</span>
                  <span className="text-slate-500">{item.time}</span>
                </div>
                <h2 className="font-bold text-slate-100">{item.title}</h2>
              </div>
              <a href={item.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 p-2">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
