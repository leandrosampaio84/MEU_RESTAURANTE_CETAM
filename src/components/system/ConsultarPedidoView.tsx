import React, { useState } from 'react';
import { Pedido } from '../../types/restaurant';
import { Search, UserCheck, UserX, Clock } from 'lucide-react';

interface ConsultarPedidoViewProps {
  pedidos: Pedido[];
  onRunConsultarSimulation: (termo: string) => void;
}

export const ConsultarPedidoView: React.FC<ConsultarPedidoViewProps> = ({
  pedidos,
  onRunConsultarSimulation,
}) => {
  const [searchTerm, setSearchTerm] = useState('João');

  const normalized = searchTerm.trim().toLowerCase();
  const resultados = pedidos.filter((p) =>
    p.cliente.toLowerCase().includes(normalized)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunConsultarSimulation(searchTerm);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🔍 Consultar Pedido por Cliente</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Pesquise pedidos ativos digitando o nome ou parte do nome do cliente.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Nome do Cliente a Consultar
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: João, Maria, Silva..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar Pedidos</span>
            </button>
          </div>
        </div>

        {/* Clean status bar */}
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs flex items-center justify-between text-slate-300">
          <span>Termo de busca ativo: <strong className="text-emerald-400 font-medium">"{searchTerm}"</strong></span>
          <span className="text-slate-400">
            {resultados.length} {resultados.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </span>
        </div>
      </form>

      {/* Query Results */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Resultados da Busca ({resultados.length})
        </h3>

        {resultados.length === 0 ? (
          <div className="p-8 bg-slate-900/60 border border-dashed border-slate-800 rounded-xl text-center space-y-2">
            <UserX className="w-8 h-8 text-rose-400 mx-auto" />
            <div className="text-sm font-bold text-white">Nenhum pedido encontrado</div>
            <p className="text-xs text-slate-400">
              Nenhum pedido cadastrado corresponde ao termo pesquisado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resultados.map((pedido, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-emerald-900/60 p-4 rounded-xl space-y-2.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      {pedido.cliente}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    R$ {pedido.total.toFixed(2)}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                  {pedido.itens.map((it, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between text-[11px] text-slate-400">
                      <span>{it.quantidade}x {it.nome}</span>
                      <span className="font-mono">R$ {it.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
