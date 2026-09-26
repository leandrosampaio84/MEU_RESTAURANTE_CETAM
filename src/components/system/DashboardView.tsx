import React from 'react';
import { Pedido, Relatorio } from '../../types/restaurant';
import { CARDAPIO_DETALHADO, HERO_IMAGE } from '../../data/cardapio';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  UtensilsCrossed, 
  TrendingUp, 
  PlusCircle, 
  FileText, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface DashboardViewProps {
  pedidos: Pedido[];
  relatorio: Relatorio;
  onNavigateTab: (tab: string) => void;
  onTriggerDemoOrder: () => void;
  onTriggerValueErrorDemo: () => void;
  onTriggerRelatorioSimulation: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  pedidos,
  relatorio,
  onNavigateTab,
  onTriggerDemoOrder,
  onTriggerValueErrorDemo,
  onTriggerRelatorioSimulation,
}) => {
  // Clientes únicos
  const clientesUnicos = new Set(pedidos.map((p) => p.cliente.trim().toLowerCase())).size;

  // Itens mais vendidos
  const vendasPorProduto = CARDAPIO_DETALHADO.map((produto) => {
    let qtd = 0;
    pedidos.forEach((p) => {
      p.itens.forEach((it) => {
        if (it.codigo === produto.codigo || it.nome === produto.nome) {
          qtd += it.quantidade;
        }
      });
    });
    return {
      codigo: produto.codigo,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: qtd,
      faturamento: qtd * produto.preco
    };
  }).sort((a, b) => b.quantidade - a.quantidade);

  const maxQtd = Math.max(1, ...vendasPorProduto.map((v) => v.quantidade));

  // Classificação badge styling
  const classificacaoColor = 
    relatorio.classificacao === 'Movimento alto'
      ? 'text-emerald-400 bg-emerald-950/70 border-emerald-800'
      : relatorio.classificacao === 'Movimento médio'
      ? 'text-amber-400 bg-amber-950/70 border-amber-800'
      : 'text-sky-400 bg-sky-950/70 border-sky-800';

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={HERO_IMAGE}
            alt="Culinária Amazônica do Meu Restaurante"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-2">
              <span>GASTRONOMIA AMAZÔNICA TRADICIONAL</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Painel de Controle do Restaurante
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
              Gestão de pedidos em tempo real para controle do cardápio típico, fluxo de clientes e faturamento diário.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('novo_pedido')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-900/30 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Novo Pedido</span>
            </button>
            <button
              onClick={onTriggerRelatorioSimulation}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Atualizar Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Pedidos */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Pedidos</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {pedidos.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Pedidos registrados
          </div>
        </div>

        {/* Clientes Atendidos */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Clientes</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {clientesUnicos}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Únicos atendidos
          </div>
        </div>

        {/* Faturamento */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Faturamento</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            R$ {relatorio.faturamento.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Receita total do dia
          </div>
        </div>

        {/* Itens Vendidos */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Itens Vendidos</span>
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {relatorio.itensVendidos}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Porções preparadas
          </div>
        </div>

        {/* Movimento Classificação */}
        <div className="col-span-2 sm:col-span-1 bg-slate-900/90 border border-slate-800/90 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Classificação</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-sm font-bold text-white leading-tight">
            {relatorio.classificacao}
          </div>
          <div className={`inline-block mt-1 px-1.5 py-0.5 text-[10px] font-semibold border rounded ${classificacaoColor}`}>
            {relatorio.faturamento >= 500
              ? '≥ R$ 500'
              : relatorio.faturamento >= 200
              ? '≥ R$ 200'
              : '< R$ 200'}
          </div>
        </div>
      </div>

      {/* Two-Column Analytics & Sales Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Produtos Mais Vendidos */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Mais Vendidos no Cardápio</h3>
              <p className="text-xs text-slate-400">Distribuição por quantidade de porções</p>
            </div>
            <button
              onClick={() => onNavigateTab('cardapio')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Cardápio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {vendasPorProduto.slice(0, 5).map((prod) => {
              const percent = maxQtd > 0 ? (prod.quantidade / maxQtd) * 100 : 0;
              return (
                <div key={prod.codigo} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">
                      {prod.codigo}. {prod.nome}
                    </span>
                    <span className="text-slate-400 font-mono tabular-nums">
                      {prod.quantidade} un · R$ {prod.faturamento.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demonstrações Rápidas de Funcionalidades */}
        <div className="bg-slate-900/90 border border-slate-800/90 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Ações Rápidas do Sistema</h3>
            <p className="text-xs text-slate-400 mb-4">
              Atalhos operacionais para testar e demonstrar as rotinas do restaurante:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={onTriggerDemoOrder}
                className="w-full flex items-center justify-between p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                    1. Simular Novo Pedido Completo
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Cadastra um novo pedido com múltiplos pratos e atualiza a contabilidade.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" />
              </button>

              <button
                onClick={onTriggerValueErrorDemo}
                className="w-full flex items-center justify-between p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    2. Simular Teste de Entrada Inválida
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Testa a validação com digitação incorreta no campo de quantidade.
                  </div>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-400 transition-colors shrink-0" />
              </button>

              <button
                onClick={() => onNavigateTab('consultar')}
                className="w-full flex items-center justify-between p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300">
                    3. Consultar Pedido por Cliente
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Localiza pedidos em andamento através do nome do cliente.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors shrink-0" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Módulo Administrativo</span>
            <span className="text-emerald-400 font-medium">Operação em Tempo Real</span>
          </div>
        </div>
      </div>
    </div>
  );
};
