import React from 'react';
import { Pedido } from '../../types/restaurant';
import { RefreshCw, Trash2, Clock, User, PackageOpen, ArrowRight } from 'lucide-react';

interface PedidosListViewProps {
  pedidos: Pedido[];
  onTriggerListarSimulation: () => void;
  onRequestCancelOrder: (numero: number) => void;
  onNavigateTab: (tab: string) => void;
}

export const PedidosListView: React.FC<PedidosListViewProps> = ({
  pedidos,
  onTriggerListarSimulation,
  onRequestCancelOrder,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📦 Pedidos Registrados</span>
            <span className="text-xs font-normal text-slate-400">· Atendimento em tempo real</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {pedidos.length} {pedidos.length === 1 ? 'pedido ativo registrado no sistema' : 'pedidos ativos registrados no sistema'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerListarSimulation}
            disabled={pedidos.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar Lista</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      {pedidos.length === 0 ? (
        <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-xl p-12 text-center space-y-3">
          <PackageOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Nenhum pedido cadastrado</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Não há pedidos em aberto neste momento. Inicie um novo atendimento para registrar os pratos.
          </p>
          <button
            onClick={() => onNavigateTab('novo_pedido')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            <span>Cadastrar Pedido</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido, index) => {
            const numeroHumano = index + 1;

            return (
              <div
                key={index}
                className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                {/* Order Header */}
                <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                      #{numeroHumano}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-white text-sm">
                          {pedido.cliente}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>Horário: {pedido.horario || 'Hoje'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-wider">
                        Total
                      </div>
                      <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                        R$ {pedido.total.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => onRequestCancelOrder(numeroHumano)}
                      title={`Cancelar pedido #${numeroHumano}`}
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors border border-transparent hover:border-rose-900 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-4 bg-slate-900/40">
                  <div className="text-xs text-slate-300 font-medium mb-2 flex items-center justify-between">
                    <span>Itens do Pedido</span>
                    <span className="text-slate-400 text-[11px]">
                      {pedido.itens.length} {pedido.itens.length === 1 ? 'porção' : 'porções'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {pedido.itens.map((it, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-medium text-slate-200 block">
                            {it.nome}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {it.quantidade}x R$ {it.precoUnitario?.toFixed(2) || (it.subtotal / it.quantidade).toFixed(2)}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 tabular-nums">
                          R$ {it.subtotal.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
