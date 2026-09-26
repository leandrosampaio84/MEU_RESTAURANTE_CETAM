import React, { useState } from 'react';
import { Pedido } from '../../types/restaurant';
import { Trash2, AlertCircle, CornerDownRight } from 'lucide-react';

interface CancelarPedidoViewProps {
  pedidos: Pedido[];
  onConfirmCancel: (numero: number) => void;
  initialNumero?: number;
}

export const CancelarPedidoView: React.FC<CancelarPedidoViewProps> = ({
  pedidos,
  onConfirmCancel,
  initialNumero,
}) => {
  const [numeroInput, setNumeroInput] = useState<string>(
    initialNumero ? String(initialNumero) : '1'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const num = parseInt(numeroInput, 10);
  const isValid = !isNaN(num) && num >= 1 && num <= pedidos.length;
  const targetIndex = num - 1;
  const targetPedido = isValid ? pedidos[targetIndex] : null;

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isNaN(num)) {
      setErrorMsg("Digite um número válido para o pedido.");
      return;
    }

    if (num < 1 || num > pedidos.length) {
      setErrorMsg(`Número de pedido inválido. Selecione um pedido entre 1 e ${pedidos.length}.`);
      return;
    }

    onConfirmCancel(num);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🗑️ Cancelamento de Pedido</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Selecione o pedido em andamento para estornar e remover do sistema.
        </p>
      </div>

      {/* Orders selection list for quick visual pick */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Pedidos Disponíveis para Cancelamento
        </div>

        {pedidos.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg">
            Nenhum pedido em aberto no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {pedidos.map((p, idx) => {
              const orderNum = idx + 1;
              const isSelected = orderNum === num;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setNumeroInput(String(orderNum));
                    setErrorMsg(null);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-950/80 border-rose-600 text-rose-200 shadow-md ring-1 ring-rose-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">
                      Pedido #{orderNum}
                    </span>
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      R$ {p.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 truncate font-medium">
                    {p.cliente}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {p.itens.length} {p.itens.length === 1 ? 'item' : 'itens'} · {p.horario || 'Hoje'}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancellation Form */}
      <form onSubmit={handleCancelSubmit} className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
        {errorMsg && (
          <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Número do Pedido a Cancelar
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max={pedidos.length || 1}
              value={numeroInput}
              onChange={(e) => {
                setNumeroInput(e.target.value);
                setErrorMsg(null);
              }}
              disabled={pedidos.length === 0}
              className="w-32 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-rose-500"
            />

            {targetPedido && (
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  Pedido selecionado: <strong>{targetPedido.cliente}</strong> (R$ {targetPedido.total.toFixed(2)})
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pedidos.length === 0 || !isValid}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-rose-950/40"
        >
          <Trash2 className="w-4 h-4" />
          <span>Confirmar Cancelamento do Pedido</span>
        </button>
      </form>
    </div>
  );
};
