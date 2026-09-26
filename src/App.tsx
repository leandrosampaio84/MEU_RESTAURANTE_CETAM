/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Pedido, Relatorio, Produto } from './types/restaurant';
import { CARDAPIO_DETALHADO } from './data/cardapio';
import { Header } from './components/Header';
import { WelcomeModal } from './components/WelcomeModal';
import { DashboardView } from './components/system/DashboardView';
import { CardapioView } from './components/system/CardapioView';
import { NovoPedidoView } from './components/system/NovoPedidoView';
import { PedidosListView } from './components/system/PedidosListView';
import { ConsultarPedidoView } from './components/system/ConsultarPedidoView';
import { CancelarPedidoView } from './components/system/CancelarPedidoView';
import { RelatorioView } from './components/system/RelatorioView';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  PlusCircle, 
  ShoppingBag, 
  Search, 
  Trash2, 
  BarChart3 
} from 'lucide-react';

// Dados iniciais realistas para permitir demonstração imediata
const INITIAL_PEDIDOS: Pedido[] = [
  {
    numero: 1,
    indice: 0,
    cliente: "João Silva",
    itens: [
      { codigo: 1, nome: "Tambaqui Assado", quantidade: 2, precoUnitario: 45.00, subtotal: 90.00 },
      { codigo: 5, nome: "Suco de Cupuaçu", quantidade: 2, precoUnitario: 10.00, subtotal: 20.00 }
    ],
    total: 110.00,
    horario: "12:15"
  },
  {
    numero: 2,
    indice: 1,
    cliente: "Maria Souza",
    itens: [
      { codigo: 4, nome: "Tacacá", quantidade: 2, precoUnitario: 20.00, subtotal: 40.00 },
      { codigo: 6, nome: "Refrigerante", quantidade: 2, precoUnitario: 7.00, subtotal: 14.00 }
    ],
    total: 54.00,
    horario: "12:30"
  },
  {
    numero: 3,
    indice: 2,
    cliente: "Carlos Lima",
    itens: [
      { codigo: 2, nome: "Pirarucu Frito", quantidade: 2, precoUnitario: 40.00, subtotal: 80.00 },
      { codigo: 3, nome: "Caldeirada de Peixe", quantidade: 1, precoUnitario: 35.00, subtotal: 35.00 }
    ],
    total: 115.00,
    horario: "12:45"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [cancelOrderTargetNum, setCancelOrderTargetNum] = useState<number | undefined>(undefined);

  // Business state
  const [pedidos, setPedidos] = useState<Pedido[]>(INITIAL_PEDIDOS);

  // Calcular métricas de relatório
  const calculateRelatorio = useCallback((): Relatorio => {
    const total = pedidos.reduce((acc, p) => acc + p.total, 0);
    const totalItens = pedidos.reduce(
      (acc, p) => acc + p.itens.reduce((sum, it) => sum + it.quantidade, 0),
      0
    );

    let classif: 'Movimento alto' | 'Movimento médio' | 'Movimento baixo' = 'Movimento baixo';
    if (total >= 500) {
      classif = 'Movimento alto';
    } else if (total >= 200) {
      classif = 'Movimento médio';
    }

    const detalhes = CARDAPIO_DETALHADO.map((dish) => {
      let qtd = 0;
      pedidos.forEach((p) => {
        p.itens.forEach((it) => {
          if (it.codigo === dish.codigo || it.nome === dish.nome) {
            qtd += it.quantidade;
          }
        });
      });
      return {
        codigo: dish.codigo,
        nome: dish.nome,
        quantidade: qtd,
        faturamento: qtd * dish.preco
      };
    });

    return {
      totalPedidos: pedidos.length,
      faturamento: total,
      classificacao: classif,
      itensVendidos: totalItens,
      mediaPorPedido: pedidos.length > 0 ? total / pedidos.length : 0,
      detalhesPorProduto: detalhes
    };
  }, [pedidos]);

  const relatorio = calculateRelatorio();

  // Handlers funcionais do sistema:

  // 1. Cadastrar Pedido
  const handleFinalizeOrder = (
    cliente: string,
    itens: Array<{ produto: Produto; quantidade: number }>
  ) => {
    const total = itens.reduce((acc, it) => acc + it.produto.preco * it.quantidade, 0);
    const novoPedido: Pedido = {
      numero: pedidos.length + 1,
      indice: pedidos.length,
      cliente,
      itens: itens.map((it) => ({
        codigo: it.produto.codigo,
        nome: it.produto.nome,
        quantidade: it.quantidade,
        precoUnitario: it.produto.preco,
        subtotal: it.produto.preco * it.quantidade
      })),
      total,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setPedidos((prev) => [...prev, novoPedido]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    setActiveTab('pedidos');
  };

  // 2. Cancelar Pedido
  const handleConfirmCancelOrder = (numero: number) => {
    const idx = numero - 1;
    if (idx < 0 || idx >= pedidos.length) return;

    setPedidos((prev) => {
      const filtered = prev.filter((_, i) => i !== idx);
      return filtered.map((p, i) => ({
        ...p,
        numero: i + 1,
        indice: i
      }));
    });

    setActiveTab('pedidos');
  };

  // 3. Demo rápida de pedido
  const handleQuickDemo = () => {
    setActiveTab('novo_pedido');
    handleFinalizeOrder('Novo Cliente', [
      { produto: CARDAPIO_DETALHADO[0], quantidade: 2 },
      { produto: CARDAPIO_DETALHADO[4], quantidade: 2 }
    ]);
  };

  // 4. Restaurar dados padrão do restaurante
  const handleResetData = () => {
    setPedidos(INITIAL_PEDIDOS);
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cardapio', label: 'Cardápio', icon: UtensilsCrossed },
    { id: 'novo_pedido', label: 'Novo Pedido', icon: PlusCircle },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag, badge: pedidos.length },
    { id: 'consultar', label: 'Consultar', icon: Search },
    { id: 'cancelar', label: 'Cancelar', icon: Trash2 },
    { id: 'relatorio', label: 'Relatório', icon: BarChart3 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHelp={() => setIsWelcomeModalOpen(true)}
        onResetData={handleResetData}
        onNewOrder={() => setActiveTab('novo_pedido')}
      />

      {/* Secondary Sticky Nav on Mobile / Tablets */}
      <div className="md:hidden sticky top-16 z-20 bg-slate-900/95 border-b border-slate-800 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/60 font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            pedidos={pedidos}
            relatorio={relatorio}
            onNavigateTab={setActiveTab}
            onTriggerDemoOrder={handleQuickDemo}
            onTriggerValueErrorDemo={() => setActiveTab('novo_pedido')}
            onTriggerRelatorioSimulation={() => setActiveTab('relatorio')}
          />
        )}

        {activeTab === 'cardapio' && (
          <CardapioView
            onSelectProductForOrder={(_prod) => {
              setActiveTab('novo_pedido');
            }}
            onRunMostrarCardapioSimulation={() => {}}
          />
        )}

        {activeTab === 'novo_pedido' && (
          <NovoPedidoView
            onFinalizeOrder={handleFinalizeOrder}
            pedidosExistentes={pedidos}
            onTriggerValueErrorDemo={() => {}}
          />
        )}

        {activeTab === 'pedidos' && (
          <PedidosListView
            pedidos={pedidos}
            onTriggerListarSimulation={() => {}}
            onRequestCancelOrder={(numero) => {
              setCancelOrderTargetNum(numero);
              setActiveTab('cancelar');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'consultar' && (
          <ConsultarPedidoView
            pedidos={pedidos}
            onRunConsultarSimulation={(_termo) => {}}
          />
        )}

        {activeTab === 'cancelar' && (
          <CancelarPedidoView
            pedidos={pedidos}
            onConfirmCancel={handleConfirmCancelOrder}
            initialNumero={cancelOrderTargetNum}
          />
        )}

        {activeTab === 'relatorio' && (
          <RelatorioView
            pedidos={pedidos}
            relatorio={relatorio}
            onRunRelatorioSimulation={() => {}}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🍽️ <strong>Meu Restaurante</strong> — Gestão Gastronômica Amazônica</span>
          <span className="text-slate-400">Cardápio Típico · Pedidos em Tempo Real · Relatório Diário</span>
        </div>
      </footer>

      {/* Information Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onStartSystem={() => {
          setActiveTab('dashboard');
        }}
      />
    </div>
  );
}
