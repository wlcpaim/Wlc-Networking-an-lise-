'use client';

import { Sidebar } from '@/components/Sidebar';
import { Settings, User, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" /> Configurações
          </h1>
          <p className="text-sm text-slate-400">Gerencie sua conta e preferências do WLC Network.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Perfil de Usuário
            </h2>
            <p className="text-sm text-slate-400 mb-4">Atualize suas informações públicas de networking.</p>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nome de Usuário</label>
                <input type="text" defaultValue="trader_pro" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Biografia</label>
                <textarea defaultValue="Entusiasta de Bitcoin e DeFi." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100" />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
