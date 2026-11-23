'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { fetchTopCryptos } from '@/lib/api';
import { CryptoAsset } from '@/types/crypto';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketsPage() {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTopCryptos().then(setCryptos);
  }, []);

  const filtered = cryptos.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">Mercado & Cotações</h1>
        <p className="text-sm text-slate-400 mb-6">Dados atualizados em tempo real do ecossistema global.</p>

        <input
          type="text"
          placeholder="Pesquisar criptomoeda..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 mb-6 focus:outline-none focus:border-indigo-500"
        />

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase">
                <th className="p-4">Ativo</th>
                <th className="p-4">Preço</th>
                <th className="p-4">24h %</th>
                <th className="p-4">Volume 24h</th>
                <th className="p-4">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filtered.map((coin) => {
                const isUp = coin.price_change_percentage_24h >= 0;
                return (
                  <tr key={coin.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-7 h-7" />
                      <div>
                        <span className="font-bold">{coin.name}</span>
                        <span className="ml-2 text-xs text-slate-400 uppercase">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">${coin.current_price.toLocaleString()}</td>
                    <td className={`p-4 flex items-center ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="p-4 text-slate-300">${coin.total_volume.toLocaleString()}</td>
                    <td className="p-4 text-slate-300">${coin.market_cap.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
