import React from 'react';
import { CARDAPIO_DETALHADO } from '../../data/cardapio';
import { Produto } from '../../types/restaurant';
import { Plus, RefreshCw, Utensils } from 'lucide-react';

interface CardapioViewProps {
  onSelectProductForOrder: (produto: Produto) => void;
  onRunMostrarCardapioSimulation: () => void;
}

export const CardapioView: React.FC<CardapioViewProps> = ({
  onSelectProductForOrder,
  onRunMostrarCardapioSimulation,
}) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🍽️ Cardápio Amazônico</span>
            <span className="text-xs font-normal text-slate-400">· 6 opções disponíveis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Especialidades típicas preparadas com ingredientes autênticos da Amazônia
          </p>
        </div>

        <button
          onClick={onRunMostrarCardapioSimulation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sincronizar Cardápio</span>
        </button>
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDAPIO_DETALHADO.map((dish) => {
          return (
            <div
              key={dish.codigo}
              className="bg-slate-900 border border-slate-800/90 hover:border-emerald-500/50 rounded-xl overflow-hidden transition-all flex flex-col justify-between group shadow-sm hover:shadow-emerald-950/20"
            >
              {/* Image Container with Fallback */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                {dish.imagem ? (
                  <img
                    src={dish.imagem}
                    alt={dish.nome}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-4">
                    <Utensils className="w-8 h-8 text-slate-500 mb-1" />
                    <span className="text-xs font-medium text-slate-400">{dish.categoria}</span>
                  </div>
                )}

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-950/90 border border-slate-700 rounded text-xs font-medium text-emerald-400 shadow">
                  Item #{dish.codigo}
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/90 border border-slate-700 rounded text-xs font-bold text-amber-400 shadow">
                  R$ {dish.preco.toFixed(2)}
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    {dish.categoria}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {dish.nome}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {dish.descricao}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Pronto para servir
                  </span>
                  <button
                    onClick={() => onSelectProductForOrder(dish)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs rounded-md transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
