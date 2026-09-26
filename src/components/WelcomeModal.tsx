import React from 'react';
import { X, Rocket, CheckCircle2, Utensils, ShoppingBag, FileText, Search, Trash2 } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSystem: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartSystem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-6 md:p-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded-md">
            <span>SISTEMA DE GESTÃO GASTRONÔMICA</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            🍽️ MEU RESTAURANTE
          </h1>
          <p className="text-slate-300 font-medium text-sm md:text-base">
            Gerenciador Completo de Pedidos, Cardápio e Atendimento
          </p>
          <p className="text-emerald-400/90 text-sm">
            Especializado na autêntica gastronomia amazônica com operação rápida e intuitiva.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Utensils className="w-4 h-4" />
              <span>Cardápio Regional</span>
            </div>
            <p className="text-xs text-slate-300">
              6 especialidades típicas amazônicas completas com preços, categorias e fotos.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
              <ShoppingBag className="w-4 h-4" />
              <span>Lançamento de Pedidos</span>
            </div>
            <p className="text-xs text-slate-300">
              Inclusão ágil de múltiplos pratos, cálculo automático de subtotal e totalização.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <Search className="w-4 h-4" />
              <span>Consulta por Cliente</span>
            </div>
            <p className="text-xs text-slate-300">
              Localização instantânea de pedidos ativos pelo nome completo ou parcial.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
              <Trash2 className="w-4 h-4" />
              <span>Cancelamento e Estornos</span>
            </div>
            <p className="text-xs text-slate-300">
              Controle seguro para remover pedidos e atualizar o fluxo de caixa em tempo real.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => {
              onClose();
              onStartSystem();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30"
          >
            <Rocket className="w-4 h-4" />
            <span>Acessar o Painel de Controle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
