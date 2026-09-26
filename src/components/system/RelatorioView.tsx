import React from 'react';
import { Pedido, Relatorio } from '../../types/restaurant';
import { RefreshCw, TrendingUp, DollarSign, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';

interface RelatorioViewProps {
  pedidos: Pedido[];
  relatorio: Relatorio;
  onRunRelatorioSimulation: () => void;
}

export const RelatorioView: React.FC<RelatorioViewProps> = ({
  pedidos,
  relatorio,
  onRunRelatorioSimulation,
}) => {
  const fat = relatorio.faturamento;
  const isAlto = fat >= 500;
  const isMedio = !isAlto && fat >= 200;
  const isBaixo = !isAlto && !isMedio;

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📊 Relatório Financeiro & Operacional</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Métricas consolidadas de faturamento, volume de pratos e classificação comercial.
          </p>
        </div>

        <button
          onClick={onRunRelatorioSimulation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Atualizar Relatório</span>
        </button>
      </div>

      {/* Aggregate KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 mb-1">Total de Pedidos Realizados</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {relatorio.totalPedidos}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Atendimentos finalizados
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 mb-1">Faturamento Total do Dia</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            R$ {relatorio.faturamento.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Receita bruta acumulada
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 mb-1">Classificação do Movimento</div>
          <div className="text-lg font-bold text-amber-400">
            {relatorio.classificacao}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Faixa de desempenho comercial
          </div>
        </div>
      </div>

      {/* Business Performance Tiers */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Faixas de Movimento Comercial</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            O restaurante avalia automaticamente a performance diária de acordo com as faixas de faturamento atingidas:
          </p>
        </div>

        <div className="space-y-3 text-xs">
          {/* Tier 1: Movimento Alto */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isAlto
                ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm">
                  Movimento Alto
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  (Faturamento igual ou superior a R$ 500,00)
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  isAlto ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isAlto ? '✅ ATIVO (R$ ' + fat.toFixed(2) + ')' : 'Pendente'}
              </span>
            </div>
            {isAlto && (
              <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Excelente desempenho diário. Meta máxima alcançada!</span>
              </div>
            )}
          </div>

          {/* Tier 2: Movimento Médio */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isMedio
                ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm">
                  Movimento Médio
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  (Faturamento entre R$ 200,00 e R$ 499,99)
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  isMedio ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isMedio ? '✅ ATIVO (R$ ' + fat.toFixed(2) + ')' : isAlto ? 'Superado' : 'Pendente'}
              </span>
            </div>
            {isMedio && (
              <div className="mt-2 text-xs text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Movimento regular estável. Faturamento dentro da média operacional.</span>
              </div>
            )}
          </div>

          {/* Tier 3: Movimento Baixo */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isBaixo
                ? 'bg-sky-950/80 border-sky-500 shadow-md ring-1 ring-sky-500/40'
                : 'bg-slate-950/60 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm">
                  Movimento Inicial / Baixo
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  (Faturamento inferior a R$ 200,00)
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  isBaixo ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isBaixo ? '✅ ATIVO (R$ ' + fat.toFixed(2) + ')' : 'Superado'}
              </span>
            </div>
            {isBaixo && (
              <div className="mt-2 text-xs text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Início de expediente ou baixo fluxo de pedidos.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
