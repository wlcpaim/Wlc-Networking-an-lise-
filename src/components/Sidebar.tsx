'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Cpu, Newspaper, PieChart, Users, Settings, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Mercado & Gráficos', href: '/markets', icon: TrendingUp },
  { name: 'IA & Análises', href: '/ai', icon: Cpu },
  { name: 'Notícias', href: '/news', icon: Newspaper },
  { name: 'Portfólio', href: '/portfolio', icon: PieChart },
  { name: 'Networking', href: '/network', icon: Users },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white">
            W
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            WLC CRYPTO
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-900">
        <button
          onClick={() => alert('Sessão encerrada')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Desconectar
        </button>
      </div>
    </aside>
  );
}
