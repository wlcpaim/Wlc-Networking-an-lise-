'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { fetchTopCryptos } from '@/lib/api';
import { CryptoAsset } from '@/types/crypto';
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap } from 'lucide-react';

export default function DashboardPage() {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCryptos().then((data) => {
      setCryptos(data);
      setLoading(false);
    });
  }, []);

  const topGainers = [...cryptos].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Geral</h1>
            <p className="text-sm text-slate-400">Visão de alta performance do ecossistema cripto.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mercado Ativo (API Real)
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">Volume Global 24h</span>
              <DollarSign className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold">
              ${cryptos.reduce((acc, c) => acc + c.total_volume, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">Ativos Monitorados</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold">{cryptos.length} Criptomoedas</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">IA Status</span>
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">Pronta para Análise</div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4">Principais Altas (24h)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topGainers.map((coin) => (
            <div key={coin.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-bold uppercase">{coin.symbol}</div>
                  <div className="text-xs text-slate-400">${coin.current_price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center text-emerald-400 text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{coin.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
