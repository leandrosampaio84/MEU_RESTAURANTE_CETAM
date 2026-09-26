import React, { useState } from 'react';
import { CARDAPIO_DETALHADO } from '../../data/cardapio';
import { Produto, Pedido } from '../../types/restaurant';
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle
} from 'lucide-react';

interface NovoPedidoViewProps {
  onFinalizeOrder: (
    cliente: string,
    itens: Array<{ produto: Produto; quantidade: number }>
  ) => void;
  pedidosExistentes: Pedido[];
  onTriggerValueErrorDemo: () => void;
  onLiveInputChange?: (varName: string, value: string) => void;
}

export const NovoPedidoView: React.FC<NovoPedidoViewProps> = ({
  onFinalizeOrder,
  pedidosExistentes,
  onTriggerValueErrorDemo,
  onLiveInputChange,
}) => {
  const [nomeCliente, setNomeCliente] = useState('João Silva');
  const [selectedCodigo, setSelectedCodigo] = useState<number>(1);
  const [quantidadeStr, setQuantidadeStr] = useState<string>('2');
  const [itensCarrinho, setItensCarrinho] = useState<Array<{ produto: Produto; quantidade: number }>>([
    { produto: CARDAPIO_DETALHADO[0], quantidade: 2 } // Initial item: 2x Tambaqui Assado
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const produtoSelecionado = CARDAPIO_DETALHADO.find((p) => p.codigo === selectedCodigo) || CARDAPIO_DETALHADO[0];

  // Cálculo de subtotal do item a ser adicionado
  const qtdNum = parseInt(quantidadeStr, 10);
  const subtotalItemAtual = !isNaN(qtdNum) && qtdNum > 0 ? produtoSelecionado.preco * qtdNum : 0;

  // Total do pedido acumulado
  const totalPedido = itensCarrinho.reduce(
    (acc, it) => acc + it.produto.preco * it.quantidade,
    0
  );

  const handleNomeChange = (val: string) => {
    setNomeCliente(val);
    setErrorMessage(null);
    if (onLiveInputChange) {
      onLiveInputChange('nome_cliente', val);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isNaN(qtdNum)) {
      setErrorMessage("ERRO: digite apenas números válidos.");
      onTriggerValueErrorDemo();
      return;
    }

    if (qtdNum <= 0) {
      setErrorMessage("A quantidade deve ser maior que zero.");
      return;
    }

    // Adiciona o item ao carrinho
    setItensCarrinho((prev) => [
      ...prev,
      { produto: produtoSelecionado, quantidade: qtdNum }
    ]);
    setQuantidadeStr('1');
  };

  const handleRemoveItem = (index: number) => {
    setItensCarrinho((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFinalize = () => {
    if (!nomeCliente || nomeCliente.trim() === '') {
      setErrorMessage("ERRO: o nome do cliente não pode ficar vazio.");
      return;
    }

    if (itensCarrinho.length === 0) {
      setErrorMessage("Nenhum item foi adicionado ao pedido.");
      return;
    }

    onFinalizeOrder(nomeCliente.trim(), itensCarrinho);
    // Reset form for next order
    setNomeCliente('');
    setItensCarrinho([]);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📝 Cadastrar Novo Pedido</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Informe o cliente e selecione os itens desejados para montar o atendimento.
          </p>
        </div>

        <button
          type="button"
          onClick={onTriggerValueErrorDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Testar Entrada Inválida ("abc")</span>
        </button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-lg animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Order Construction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Dados do Atendimento</span>
          </h3>

          {/* Nome do Cliente */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Nome do Cliente
            </label>
            <input
              type="text"
              value={nomeCliente}
              onChange={(e) => handleNomeChange(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Seleção do Produto */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Produto do Cardápio
            </label>
            <select
              value={selectedCodigo}
              onChange={(e) => setSelectedCodigo(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              {CARDAPIO_DETALHADO.map((dish) => (
                <option key={dish.codigo} value={dish.codigo}>
                  {dish.codigo}. {dish.nome} — R$ {dish.preco.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Quantidade de Porções
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={quantidadeStr}
                onChange={(e) => setQuantidadeStr(e.target.value)}
                placeholder="Ex: 2"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setQuantidadeStr('abc')}
                title="Inserir texto não numérico para testar tratamento de erros"
                className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg border border-slate-700 shrink-0 cursor-pointer"
              >
                "abc"
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Dica: clique em <strong>"abc"</strong> para testar a validação contra valores não numéricos.
            </p>
          </div>

          {/* Prévia do Subtotal */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400">Subtotal deste item:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              R$ {subtotalItemAtual.toFixed(2)}
            </span>
          </div>

          {/* Botão Adicionar Item */}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors border border-slate-700 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Adicionar Item ao Pedido</span>
          </button>
        </div>

        {/* Right Table: Order Summary */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Itens Selecionados no Pedido</span>
              </h3>
              <span className="text-xs text-slate-400">
                {itensCarrinho.length} {itensCarrinho.length === 1 ? 'item adicionado' : 'itens adicionados'}
              </span>
            </div>

            {itensCarrinho.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-400 text-xs">
                Nenhum item adicionado ainda. Escolha um produto e adicione ao pedido.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-2 px-3">Produto</th>
                      <th className="py-2 px-3 text-center">Qtd</th>
                      <th className="py-2 px-3 text-right">Preço</th>
                      <th className="py-2 px-3 text-right">Subtotal</th>
                      <th className="py-2 px-2 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {itensCarrinho.map((it, idx) => {
                      const sub = it.produto.preco * it.quantidade;
                      return (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2.5 px-3 text-white">
                            {it.produto.codigo}. {it.produto.nome}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                            {it.quantidade}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                            R$ {it.produto.preco.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                            R$ {sub.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={() => handleRemoveItem(idx)}
                              title="Remover item"
                              className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Total & Finalize Button */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">
                  Total do Pedido
                </span>
                <span className="text-[11px] text-emerald-400">
                  Soma dos subtotais
                </span>
              </div>
              <span className="text-xl md:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                R$ {totalPedido.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleFinalize}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <CheckCircle className="w-4 h-4" />
              <span>FINALIZAR PEDIDO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
