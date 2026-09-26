import React from 'react';
import { HelpCircle, RotateCcw, PlusCircle, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHelp: () => void;
  onResetData: () => void;
  onNewOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHelp,
  onResetData,
  onNewOrder,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'novo_pedido', label: 'Novo Pedido' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'consultar', label: 'Consultar' },
    { id: 'cancelar', label: 'Cancelar' },
    { id: 'relatorio', label: 'Relatório' }
  ];

  return (
    <header className="h-16 px-4 md:px-8 bg-slate-950/95 border-b border-slate-800 backdrop-blur flex items-center justify-between z-30 shrink-0 sticky top-0">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2.5 hover:text-emerald-400 transition-colors cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl shadow-sm">
            🍽️
          </div>
          <div>
            <div className="leading-tight font-extrabold">Meu Restaurante</div>
            <div className="text-[10px] text-slate-400 font-normal">Culinária Amazônica & Gestão</div>
          </div>
        </button>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors relative py-1 cursor-pointer text-xs lg:text-sm ${
                isActive
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500'
                  : 'hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onResetData}
          title="Restaurar dados padrão do restaurante"
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenHelp}
          title="Sobre o sistema"
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={onNewOrder}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all cursor-pointer shadow-md shadow-emerald-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Novo Pedido</span>
        </button>
      </div>
    </header>
  );
};
