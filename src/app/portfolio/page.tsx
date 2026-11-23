'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { PieChart, Plus, DollarSign } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([
    { id: '1', symbol: 'BTC', amount: 0.5, buy_price: 62000, current: 67000 },
    { id: '2', symbol: 'ETH', amount: 4.2, buy_price: 3100, current: 3500 }
  ]);

  const totalValue = portfolio.reduce((acc, item) => acc + (item.amount * item.current), 0);
  const totalCost = portfolio.reduce((acc, item) => acc + (item.amount * item.buy_price), 0);
  const totalProfit = totalValue - totalCost;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PieChart className="w-6 h-6 text-indigo-400" /> Meu Portfólio
          </h1>
          <p className="text-sm text-slate-400">Acompanhe seus investimentos e rentabilidade em tempo real.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <span className="text-sm text-slate-400">Patrimônio Total</span>
            <div className="text-3xl font-bold mt-2">${totalValue.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <span className="text-sm text-slate-400">Custo Total</span>
            <div className="text-3xl font-bold mt-2">${totalCost.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <span className="text-sm text-slate-400">Lucro / Prejuízo</span>
            <div className={`text-3xl font-bold mt-2 ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-450'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6">
          <h2 className="font-bold mb-4">Ativos em Custódia</h2>
          <div className="space-y-3">
            {portfolio.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-bold uppercase text-indigo-400">{p.symbol}</div>
                <div>Qtd: {p.amount}</div>
                <div>Preço Médio: ${p.buy_price.toLocaleString()}</div>
                <div className="font-semibold text-emerald-400">Atual: ${p.current.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
