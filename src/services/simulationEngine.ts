import { StepEvent, Pedido, ItemPedido, Produto } from '../types/restaurant';
import { CARDAPIO_ORIGINAL } from '../data/cardapio';

/**
 * Utility to generate unique step IDs
 */
let stepCounter = 1;
function createStepId(): string {
  return `step-${Date.now()}-${stepCounter++}`;
}

/**
 * 1. Simulação do fluxo de CADASTRAR NOVO PEDIDO
 */
export function generateCadastrarPedidoSteps(
  nomeCliente: string,
  itens: Array<{ produto: Produto; quantidade: number }>,
  pedidosExistentes: Pedido[]
): StepEvent[] {
  const steps: StepEvent[] = [];

  // Step 1: Início da função
  steps.push({
    id: createStepId(),
    stepNumber: 1,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'def cadastrar_pedido():',
    lineNumber: 18,
    actionType: 'FUNCTION_CALL',
    description: 'Invocação da função de cadastro de pedidos',
    didacticExplanation: 'O interpretador Python entra no escopo local da função cadastrar_pedido(). Todas as variáveis criadas aqui serão locais à função.',
    terminalOutput: '\n========== NOVO PEDIDO =========='
  });

  // Step 2: print cabeçalho
  steps.push({
    id: createStepId(),
    stepNumber: 2,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'print("\\n========== NOVO PEDIDO ==========")',
    lineNumber: 19,
    actionType: 'PRINT_OUTPUT',
    description: 'Exibe o cabeçalho no console do sistema',
    didacticExplanation: 'A instrução print() envia uma string formatada para o fluxo de saída padrão (stdout).'
  });

  // Step 3: input do nome do cliente
  steps.push({
    id: createStepId(),
    stepNumber: 3,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'nome_cliente = input("Digite o nome do cliente: ").strip()',
    lineNumber: 21,
    actionType: 'INPUT',
    description: `Captura o nome do cliente via entrada interativa: "${nomeCliente}"`,
    didacticExplanation: 'A função input() aguarda a digitação do usuário e retorna uma string (str). O método .strip() remove espaços em branco antes e depois.',
    variableName: 'nome_cliente',
    valueBefore: 'None',
    valueAfter: `"${nomeCliente}"`,
    terminalOutput: `Digite o nome do cliente: > ${nomeCliente}`
  });

  // Step 4: Validação condicional do nome
  const isNomeVazio = !nomeCliente || nomeCliente.trim() === '';
  steps.push({
    id: createStepId(),
    stepNumber: 4,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'if nome_cliente == "":',
    lineNumber: 23,
    actionType: 'CONDITION_EVAL',
    description: `Verifica se a string do nome está vazia: ${isNomeVazio ? 'VERDADEIRO (Erro)' : 'FALSO (Prosseguir)'}`,
    didacticExplanation: 'Estrutura condicional de validação de guarda (guard clause). Se a condição for verdadeira, o bloco interno emite erro e sai da função.',
    conditionExpression: `"${nomeCliente}" == ""`,
    conditionResult: isNomeVazio,
    branchMessage: isNomeVazio ? 'Desvio para bloco de ERRO e return prematuro' : 'Condição FALSA: continua o fluxo'
  });

  if (isNomeVazio) {
    steps.push({
      id: createStepId(),
      stepNumber: 5,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'print("ERRO: o nome do cliente não pode ficar vazio.")',
      lineNumber: 24,
      actionType: 'PRINT_OUTPUT',
      description: 'Mensagem de erro exibida ao usuário',
      didacticExplanation: 'Feedback didático ao usuário sobre o dado inválido antes de interromper.',
      terminalOutput: 'ERRO: o nome do cliente não pode ficar vazio.'
    });
    steps.push({
      id: createStepId(),
      stepNumber: 6,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'return',
      lineNumber: 25,
      actionType: 'RETURN',
      description: 'Encerramento precoce da função com return',
      didacticExplanation: 'A instrução return sem valor devolve None e encerra imediatamente a execução da função atual.'
    });
    return finalizeStepNumbers(steps);
  }

  // Step 5: mostrar_cardapio()
  steps.push({
    id: createStepId(),
    stepNumber: 5,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'mostrar_cardapio()',
    lineNumber: 27,
    actionType: 'FUNCTION_CALL',
    description: 'Chama a subfunção mostrar_cardapio() para consulta dos códigos',
    didacticExplanation: 'Modularização: uma função chama outra função reutilizável para reaproveitar a lógica de exibição.'
  });

  // Step 6: Inicialização das variáveis itens_pedido e total_pedido
  steps.push({
    id: createStepId(),
    stepNumber: 6,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'itens_pedido = []',
    lineNumber: 29,
    actionType: 'VARIABLE_UPDATE',
    description: 'Inicializa a lista vazia itens_pedido',
    didacticExplanation: 'Criação de uma lista dinâmica mutável (list) em memória para armazenar os itens que o cliente selecionar.',
    variableName: 'itens_pedido',
    valueBefore: 'None',
    valueAfter: '[]'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 7,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'total_pedido = 0.0',
    lineNumber: 30,
    actionType: 'VARIABLE_UPDATE',
    description: 'Inicializa a variável acumuladora total_pedido com 0.0',
    didacticExplanation: 'Variável de ponto flutuante (float) usada como acumulador contábil somatório.',
    variableName: 'total_pedido',
    valueBefore: 'None',
    valueAfter: '0.00'
  });

  let runningTotal = 0.0;
  const currentItensSnapshot: any[] = [];

  // Iterar sobre cada item adicionado
  itens.forEach((entry, idx) => {
    const iterNumber = idx + 1;
    const subtotal = entry.produto.preco * entry.quantidade;
    const previousTotal = runningTotal;
    runningTotal += subtotal;

    // while True
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'while True:',
      lineNumber: 32,
      actionType: 'WHILE_ITERATION',
      description: `Início da iteração ${iterNumber} do loop while infinito`,
      didacticExplanation: 'O loop while True continua executando até que uma instrução break explícita seja encontrada.',
      loopInfo: { type: 'WHILE', iteration: iterNumber }
    });

    // try:
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'try:',
      lineNumber: 33,
      actionType: 'TRY_BLOCK',
      description: 'Abertura do bloco de tratamento de exceções try',
      didacticExplanation: 'Protege as conversões de tipo int() contra erros de digitação de strings não numéricas.'
    });

    // input código
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'codigo = int(input("Digite o código do produto (0 para finalizar): "))',
      lineNumber: 34,
      actionType: 'INPUT',
      description: `Lê e converte o código do produto: ${entry.produto.codigo}`,
      didacticExplanation: 'A função int() converte a string retornada por input() em um número inteiro.',
      variableName: 'codigo',
      valueBefore: 'None',
      valueAfter: String(entry.produto.codigo),
      terminalOutput: `Digite o código do produto (0 para finalizar): > ${entry.produto.codigo}`
    });

    // if codigo == 0:
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'if codigo == 0:',
      lineNumber: 36,
      actionType: 'CONDITION_EVAL',
      description: `Avalia condição de sentinela para encerramento: ${entry.produto.codigo} == 0`,
      didacticExplanation: 'O valor 0 atua como sentinela de parada. Como o código não é 0, o fluxo não executa o break.',
      conditionExpression: `${entry.produto.codigo} == 0`,
      conditionResult: false,
      branchMessage: 'Condição FALSA: continua no loop'
    });

    // if codigo not in cardapio:
    const inCardapio = !!CARDAPIO_ORIGINAL[entry.produto.codigo];
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'if codigo not in cardapio:',
      lineNumber: 39,
      actionType: 'CONDITION_EVAL',
      description: `Verifica se a chave ${entry.produto.codigo} existe no dicionário cardapio`,
      didacticExplanation: 'O operador in verifica a presença de chaves em dicionários Python em tempo constante O(1).',
      conditionExpression: `${entry.produto.codigo} not in cardapio`,
      conditionResult: !inCardapio,
      branchMessage: inCardapio ? 'Condição FALSA: produto válido no cardápio' : 'Condição VERDADEIRA: continue'
    });

    // input quantidade
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'quantidade = int(input("Digite a quantidade: "))',
      lineNumber: 43,
      actionType: 'INPUT',
      description: `Lê e converte a quantidade desejada: ${entry.quantidade}`,
      didacticExplanation: 'Captura o número de porções requisitadas pelo cliente para o item atual.',
      variableName: 'quantidade',
      valueBefore: 'None',
      valueAfter: String(entry.quantidade),
      terminalOutput: `Digite a quantidade: > ${entry.quantidade}`
    });

    // if quantidade <= 0:
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'if quantidade <= 0:',
      lineNumber: 45,
      actionType: 'CONDITION_EVAL',
      description: `Valida se quantidade > 0: ${entry.quantidade} <= 0`,
      didacticExplanation: 'Garante que quantidades negativas ou zero sejam barradas antes dos cálculos.',
      conditionExpression: `${entry.quantidade} <= 0`,
      conditionResult: entry.quantidade <= 0,
      branchMessage: entry.quantidade <= 0 ? 'VERDADEIRO: quantidade inválida' : 'FALSO: quantidade aceita'
    });

    // produto = cardapio[codigo]
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'produto = cardapio[codigo]',
      lineNumber: 49,
      actionType: 'VARIABLE_UPDATE',
      description: `Acessa o valor no dicionário cardapio[${entry.produto.codigo}]`,
      didacticExplanation: 'Busca direta por chave primária no dicionário global de itens disponíveis.',
      variableName: 'produto',
      valueBefore: 'None',
      valueAfter: `{"nome": "${entry.produto.nome}", "preco": ${entry.produto.preco}}`
    });

    // subtotal = produto["preco"] * quantidade
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'subtotal = produto["preco"] * quantidade',
      lineNumber: 50,
      actionType: 'CALCULATION',
      description: `Calcula o subtotal: R$ ${entry.produto.preco.toFixed(2)} × ${entry.quantidade} = R$ ${subtotal.toFixed(2)}`,
      didacticExplanation: 'Operação aritmética básica de multiplicação entre o float do preço unitário e o int da quantidade.',
      calculation: {
        formula: 'subtotal = produto["preco"] * quantidade',
        values: `${entry.produto.preco.toFixed(2)} * ${entry.quantidade}`,
        result: subtotal.toFixed(2)
      },
      variableName: 'subtotal',
      valueBefore: '0.0',
      valueAfter: subtotal.toFixed(2)
    });

    // item = { ... }
    const newItem = {
      nome: entry.produto.nome,
      quantidade: entry.quantidade,
      subtotal: subtotal
    };
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'item = {"nome": produto["nome"], "quantidade": quantidade, "subtotal": subtotal}',
      lineNumber: 52,
      actionType: 'VARIABLE_UPDATE',
      description: 'Monta o dicionário com os atributos do item',
      didacticExplanation: 'Cria uma estrutura de dados de par chave-valor (dict) representando uma linha de item do pedido.',
      variableName: 'item',
      valueBefore: 'None',
      valueAfter: JSON.stringify(newItem)
    });

    // itens_pedido.append(item)
    const listBefore = [...currentItensSnapshot];
    currentItensSnapshot.push(newItem);
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'itens_pedido.append(item)',
      lineNumber: 58,
      actionType: 'LIST_APPEND',
      description: `Adiciona o item à lista itens_pedido via .append()`,
      didacticExplanation: 'O método append() insere um novo elemento no final da lista em complexidade O(1) amortizada.',
      listOperation: {
        listName: 'itens_pedido',
        operation: 'APPEND',
        item: newItem,
        listBefore: listBefore,
        listAfter: [...currentItensSnapshot]
      },
      terminalOutput: `Adicionado: ${entry.quantidade}x ${entry.produto.nome} = R$ ${subtotal.toFixed(2)}`
    });

    // total_pedido += subtotal
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cadastrar_pedido()',
      codeLine: 'total_pedido += subtotal',
      lineNumber: 59,
      actionType: 'CALCULATION',
      description: `Acumula o total: R$ ${previousTotal.toFixed(2)} + R$ ${subtotal.toFixed(2)} = R$ ${runningTotal.toFixed(2)}`,
      didacticExplanation: 'Operador de atribuição aumentada += adiciona o subtotal ao valor já existente na variável acumuladora.',
      calculation: {
        formula: 'total_pedido += subtotal',
        values: `${previousTotal.toFixed(2)} + ${subtotal.toFixed(2)}`,
        result: runningTotal.toFixed(2)
      },
      variableName: 'total_pedido',
      valueBefore: previousTotal.toFixed(2),
      valueAfter: runningTotal.toFixed(2)
    });
  });

  // Finalização do loop com código 0 (break)
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'codigo = int(input("Digite o código do produto (0 para finalizar): "))',
    lineNumber: 34,
    actionType: 'INPUT',
    description: 'Usuário digita 0 para finalizar a inclusão de itens',
    didacticExplanation: 'O valor sentinela 0 sinaliza que todos os produtos desejados já foram inseridos.',
    variableName: 'codigo',
    valueBefore: String(itens[itens.length - 1]?.produto.codigo || 1),
    valueAfter: '0',
    terminalOutput: 'Digite o código do produto (0 para finalizar): > 0'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'if codigo == 0:',
    lineNumber: 36,
    actionType: 'CONDITION_EVAL',
    description: 'Avalia a condição de saída: 0 == 0 (VERDADEIRA)',
    didacticExplanation: 'A condição do sentinela é verdadeira; o interpretador entra no bloco e executará o break.',
    conditionExpression: '0 == 0',
    conditionResult: true,
    branchMessage: 'VERDADEIRO: executa instrução break'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'break',
    lineNumber: 37,
    actionType: 'WHILE_BREAK',
    description: 'Instrução break interrompe o loop while True',
    didacticExplanation: 'A palavra-chave break força a saída imediata do loop while mais interno, transferindo o controle para a linha seguinte fora do loop.'
  });

  // if len(itens_pedido) == 0:
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'if len(itens_pedido) == 0:',
    lineNumber: 63,
    actionType: 'CONDITION_EVAL',
    description: `Verifica se algum item foi adicionado: len(itens_pedido) = ${itens.length}`,
    didacticExplanation: 'A função nativa len() conta o número de elementos contidos na lista itens_pedido.',
    conditionExpression: `len(itens_pedido) == 0 (${itens.length} == 0)`,
    conditionResult: false,
    branchMessage: 'FALSO: lista contém itens válidos'
  });

  // pedido = { "cliente": nome_cliente, "itens": itens_pedido, "total": total_pedido }
  const novoPedidoDict = {
    cliente: nomeCliente,
    itens: currentItensSnapshot,
    total: runningTotal
  };
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'pedido = {"cliente": nome_cliente, "itens": itens_pedido, "total": total_pedido}',
    lineNumber: 67,
    actionType: 'VARIABLE_UPDATE',
    description: 'Empacota os dados em um dicionário composto pedido',
    didacticExplanation: 'Cria uma estrutura de dados aninhada: o dicionário pedido contém a lista itens_pedido com seus próprios dicionários.',
    variableName: 'pedido',
    valueBefore: 'None',
    valueAfter: `{cliente: "${nomeCliente}", itens: [${itens.length} itens], total: R$ ${runningTotal.toFixed(2)}}`
  });

  // pedidos.append(pedido)
  const pedidosBefore = [...pedidosExistentes];
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'pedidos.append(pedido)',
    lineNumber: 71,
    actionType: 'LIST_APPEND',
    description: `Adiciona o novo pedido à lista global pedidos via .append()`,
    didacticExplanation: 'Persiste o novo pedido na memória global do programa. A lista pedidos agora possui tamanho len(pedidos) = ' + (pedidosExistentes.length + 1),
    listOperation: {
      listName: 'pedidos',
      operation: 'APPEND',
      item: novoPedidoDict,
      listBefore: pedidosBefore,
      listAfter: [...pedidosBefore, novoPedidoDict]
    },
    terminalOutput: `\nPedido cadastrado com sucesso!\nCliente: ${nomeCliente} | Total: R$ ${runningTotal.toFixed(2)}`
  });

  return finalizeStepNumbers(steps);
}

/**
 * 2. Simulação de TRATAMENTO DE ERRO (try / except ValueError)
 */
export function generateValueErrorSteps(inputInvalido: string = 'abc'): StepEvent[] {
  const steps: StepEvent[] = [];

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'while True:',
    lineNumber: 32,
    actionType: 'WHILE_ITERATION',
    description: 'Loop interativo aguardando valor numérico',
    didacticExplanation: 'O loop está ativo e tenta processar uma entrada do usuário.'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'try:',
    lineNumber: 33,
    actionType: 'TRY_BLOCK',
    description: 'Início do bloco protegido try',
    didacticExplanation: 'O bloco try monitora qualquer código interno. Se ocorrer uma exceção (como ValueError), a execução saltará para o bloco except.'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: `quantidade = int(input("Digite a quantidade: "))`,
    lineNumber: 43,
    actionType: 'INPUT',
    description: `Usuário digita a string não-numérica: "${inputInvalido}"`,
    didacticExplanation: 'A função input() recebe o texto digitado. Em seguida, a função nativa int() tenta converter a string em base 10.',
    terminalOutput: `Digite a quantidade: > ${inputInvalido}`
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: `int("${inputInvalido}") -> ValueError`,
    lineNumber: 43,
    actionType: 'CALCULATION',
    description: `Falha na conversão de tipo: int("${inputInvalido}") não é um número inteiro válido!`,
    didacticExplanation: 'Em Python, passar caracteres não-dígitos para int() dispara imediatamente a exceção ValueError: invalid literal for int() with base 10.',
    errorInfo: {
      errorType: 'ValueError',
      inputGiven: inputInvalido,
      handledBy: 'except ValueError:',
      message: `invalid literal for int() with base 10: '${inputInvalido}'`
    }
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'except ValueError:',
    lineNumber: 61,
    actionType: 'EXCEPT_BLOCK',
    description: 'Captura da exceção pelo manipulador except ValueError',
    didacticExplanation: 'O interpretador intercepta o ValueError com sucesso, evitando que o programa quebre ou feche abruptamente (crash).'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cadastrar_pedido()',
    codeLine: 'print("ERRO: digite apenas números válidos.")',
    lineNumber: 62,
    actionType: 'PRINT_OUTPUT',
    description: 'Emite aviso didático no terminal orientando o usuário',
    didacticExplanation: 'A mensagem orienta o usuário amigavelmente e o loop while True continuará na iteração seguinte.',
    terminalOutput: 'ERRO: digite apenas números válidos.'
  });

  return finalizeStepNumbers(steps);
}

/**
 * 3. Simulação de CANCELAR PEDIDO (pedidos.pop(numero - 1))
 */
export function generateCancelarPedidoSteps(
  numeroPedido: number,
  pedidosExistentes: Pedido[]
): StepEvent[] {
  const steps: StepEvent[] = [];
  const indicePython = numeroPedido - 1;
  const pedidoAlvo = pedidosExistentes[indicePython];

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'def cancelar_pedido():',
    lineNumber: 95,
    actionType: 'FUNCTION_CALL',
    description: 'Inicia a função de cancelamento de pedido',
    didacticExplanation: 'Solicita e remove um pedido da lista global de pedidos por índice posicional.',
    terminalOutput: '\n========== CANCELAR PEDIDO =========='
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'while True:',
    lineNumber: 96,
    actionType: 'WHILE_ITERATION',
    description: 'Loop de validação da escolha do pedido',
    didacticExplanation: 'Garante que o usuário forneça um número de pedido existente ou tente novamente.'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'try:',
    lineNumber: 97,
    actionType: 'TRY_BLOCK',
    description: 'Bloco try para proteção contra entradas não-numéricas',
    didacticExplanation: 'Impede erros caso o usuário digite texto no lugar do número do pedido.'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'numero = int(input("Digite o número do pedido: "))',
    lineNumber: 98,
    actionType: 'INPUT',
    description: `Usuário solicita o pedido número: ${numeroPedido}`,
    didacticExplanation: 'O número informado corresponde à ordem visual exibida ao usuário (1, 2, 3...).',
    variableName: 'numero',
    valueBefore: 'None',
    valueAfter: String(numeroPedido),
    terminalOutput: `Digite o número do pedido: > ${numeroPedido}`
  });

  // if numero < 1 or numero > len(pedidos):
  const isOutOfRange = numeroPedido < 1 || numeroPedido > pedidosExistentes.length;
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'if numero < 1 or numero > len(pedidos):',
    lineNumber: 100,
    actionType: 'CONDITION_EVAL',
    description: `Verifica limites da lista: ${numeroPedido} < 1 ou ${numeroPedido} > ${pedidosExistentes.length}`,
    didacticExplanation: 'Validação de intervalo (bounds checking) para evitar o erro fatal IndexError em listas Python.',
    conditionExpression: `${numeroPedido} < 1 or ${numeroPedido} > ${pedidosExistentes.length}`,
    conditionResult: isOutOfRange,
    branchMessage: isOutOfRange ? 'VERDADEIRO: número fora do intervalo' : 'FALSO: número dentro da lista válida'
  });

  if (isOutOfRange) {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'cancelar_pedido()',
      codeLine: 'print("Número inválido.")',
      lineNumber: 101,
      actionType: 'PRINT_OUTPUT',
      description: 'Avisa número inválido e executa continue',
      didacticExplanation: 'O comando continue salta o restante do bloco e reinicia o loop.',
      terminalOutput: 'Número inválido.'
    });
    return finalizeStepNumbers(steps);
  }

  // Visualização didática do cálculo de índice 0-indexed
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: `indice_memoria = numero - 1  # (${numeroPedido} - 1 = ${indicePython})`,
    lineNumber: 104,
    actionType: 'CALCULATION',
    description: `Ajuste didático de índice: Pedido ${numeroPedido} corresponde ao índice [${indicePython}] na memória`,
    didacticExplanation: 'CONCEITO CHAVE DE PYTHON: Listas são baseadas em índice zero (0-indexed). O primeiro item tem índice 0, o segundo tem índice 1, etc. Portanto subtrai-se 1.',
    calculation: {
      formula: 'indice = numero - 1',
      values: `${numeroPedido} - 1`,
      result: indicePython
    }
  });

  // pedidos.pop(numero - 1)
  const listAfter = pedidosExistentes.filter((_, idx) => idx !== indicePython);
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'pedido_removido = pedidos.pop(numero - 1)',
    lineNumber: 104,
    actionType: 'LIST_POP',
    description: `Método .pop(${indicePython}) remove e retorna o elemento na posição [${indicePython}]`,
    didacticExplanation: 'O método pop(i) remove o elemento no índice especificado e reorganiza os ponteiros dos elementos posteriores na lista.',
    listOperation: {
      listName: 'pedidos',
      operation: 'POP',
      item: pedidoAlvo,
      index: indicePython,
      listBefore: pedidosExistentes,
      listAfter: listAfter
    },
    variableName: 'pedido_removido',
    valueBefore: 'None',
    valueAfter: `{cliente: "${pedidoAlvo?.cliente || 'Cliente'}", total: R$ ${(pedidoAlvo?.total || 0).toFixed(2)}}`
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'print("Pedido cancelado.")',
    lineNumber: 105,
    actionType: 'PRINT_OUTPUT',
    description: 'Confirma o cancelamento ao usuário',
    didacticExplanation: 'Notifica que o pedido foi desvinculado com sucesso.',
    terminalOutput: 'Pedido cancelado.'
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'cancelar_pedido()',
    codeLine: 'break',
    lineNumber: 106,
    actionType: 'WHILE_BREAK',
    description: 'Encerra o loop while True de cancelamento',
    didacticExplanation: 'A tarefa foi concluída, o break sai do loop e a função finaliza normalmente.'
  });

  return finalizeStepNumbers(steps);
}

/**
 * 4. Simulação de CONSULTAR PEDIDO
 */
export function generateConsultarPedidoSteps(
  nomeBusca: string,
  pedidos: Pedido[]
): StepEvent[] {
  const steps: StepEvent[] = [];
  const normalizedBusca = nomeBusca.trim().toLowerCase();

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'consultar_pedido()',
    codeLine: 'def consultar_pedido():',
    lineNumber: 83,
    actionType: 'FUNCTION_CALL',
    description: 'Inicia a função de busca e consulta de pedidos',
    didacticExplanation: 'Realiza busca sequencial (linear search) filtrando pelo nome do cliente.',
    terminalOutput: '\n========== CONSULTAR PEDIDO =========='
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'consultar_pedido()',
    codeLine: 'nome_busca = input("Digite o nome do cliente: ").strip().lower()',
    lineNumber: 84,
    actionType: 'INPUT',
    description: `Captura termo de busca normalizado em minúsculas: "${normalizedBusca}"`,
    didacticExplanation: 'O encadeamento de métodos .strip().lower() garante que a comparação seja insensível a maiúsculas/minúsculas (case-insensitive).',
    variableName: 'nome_busca',
    valueBefore: 'None',
    valueAfter: `"${normalizedBusca}"`,
    terminalOutput: `Digite o nome do cliente: > ${nomeBusca}`
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'consultar_pedido()',
    codeLine: 'encontrado = False',
    lineNumber: 85,
    actionType: 'VARIABLE_UPDATE',
    description: 'Inicializa a flag de controle booleano com False',
    didacticExplanation: 'Padrão didático de flag booleana: assume-se falso até que ao menos uma ocorrência confirme a presença.',
    variableName: 'encontrado',
    valueBefore: 'None',
    valueAfter: 'False'
  });

  let anyFound = false;

  pedidos.forEach((p, idx) => {
    const num = idx + 1;
    const matches = p.cliente.toLowerCase().includes(normalizedBusca);
    if (matches) anyFound = true;

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'consultar_pedido()',
      codeLine: 'for numero, pedido in enumerate(pedidos, start=1):',
      lineNumber: 87,
      actionType: 'FOR_ITERATION',
      description: `Iteração ${num}/${pedidos.length} do loop FOR: examinando pedido #${num} (${p.cliente})`,
      didacticExplanation: 'enumerate(pedidos, start=1) retorna pares (índice, elemento), gerando automaticamente a contagem amigável.',
      loopInfo: {
        type: 'FOR',
        iteration: num,
        totalIterations: pedidos.length,
        currentElement: p
      }
    });

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'consultar_pedido()',
      codeLine: 'if nome_busca in pedido["cliente"].lower():',
      lineNumber: 88,
      actionType: 'CONDITION_EVAL',
      description: `Verifica se "${normalizedBusca}" está contido em "${p.cliente.toLowerCase()}"`,
      didacticExplanation: 'O operador in para strings verifica substring (se o padrão ocorre em qualquer posição do texto).',
      conditionExpression: `"${normalizedBusca}" in "${p.cliente.toLowerCase()}"`,
      conditionResult: matches,
      branchMessage: matches ? 'VERDADEIRO: correspondência encontrada!' : 'FALSO: não corresponde'
    });

    if (matches) {
      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'consultar_pedido()',
        codeLine: 'encontrado = True',
        lineNumber: 89,
        actionType: 'VARIABLE_UPDATE',
        description: 'Atualiza a flag encontrado para True',
        didacticExplanation: 'Registra que pelo menos um pedido satisfez o critério de busca.',
        variableName: 'encontrado',
        valueBefore: 'False',
        valueAfter: 'True',
        terminalOutput: `Pedido ${num}: ${p.cliente} - R$ ${p.total.toFixed(2)}`
      });
    }
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'consultar_pedido()',
    codeLine: 'if not encontrado:',
    lineNumber: 91,
    actionType: 'CONDITION_EVAL',
    description: `Avalia se nenhum pedido foi encontrado: not ${anyFound}`,
    didacticExplanation: 'O operador lógico not inverte o valor booleano da flag encontrado.',
    conditionExpression: `not ${anyFound}`,
    conditionResult: !anyFound,
    branchMessage: !anyFound ? 'VERDADEIRO: emite aviso de não encontrado' : 'FALSO: busca teve resultados'
  });

  if (!anyFound) {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'consultar_pedido()',
      codeLine: 'print("Nenhum pedido encontrado.")',
      lineNumber: 92,
      actionType: 'PRINT_OUTPUT',
      description: 'Mensagem informativa avisando ausência de resultados',
      didacticExplanation: 'Feedback ao usuário indicando que a busca não encontrou registros correspondentes.',
      terminalOutput: 'Nenhum pedido encontrado.'
    });
  }

  return finalizeStepNumbers(steps);
}

/**
 * 5. Simulação de GERAR RELATÓRIO & DECISÃO CONDICIONAL (if / elif / else)
 */
export function generateGerarRelatorioSteps(pedidos: Pedido[]): StepEvent[] {
  const steps: StepEvent[] = [];

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'def gerar_relatorio():',
    lineNumber: 112,
    actionType: 'FUNCTION_CALL',
    description: 'Inicia a função de relatório contábil e estatístico',
    didacticExplanation: 'Calcula métricas agregadas da lista global pedidos e classifica o movimento do negócio.',
    terminalOutput: '\n========== RELATÓRIO DO DIA =========='
  });

  const isEmpty = pedidos.length === 0;
  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'if len(pedidos) == 0:',
    lineNumber: 113,
    actionType: 'CONDITION_EVAL',
    description: `Verifica se a lista pedidos está vazia: len(pedidos) == 0 (${pedidos.length} == 0)`,
    didacticExplanation: 'Guard clause para evitar divisões por zero ou relatórios vazios.',
    conditionExpression: `${pedidos.length} == 0`,
    conditionResult: isEmpty,
    branchMessage: isEmpty ? 'VERDADEIRO: sem pedidos para processar' : 'FALSO: há pedidos cadastrados'
  });

  if (isEmpty) {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'print("Nenhum pedido cadastrado.")',
      lineNumber: 114,
      actionType: 'PRINT_OUTPUT',
      description: 'Mensagem informando lista vazia',
      didacticExplanation: 'Encerra o relatório sem processar cálculos adicionais.',
      terminalOutput: 'Nenhum pedido cadastrado.'
    });
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'return',
      lineNumber: 115,
      actionType: 'RETURN',
      description: 'Retorno antecipado',
      didacticExplanation: 'Sai da função gerar_relatorio().'
    });
    return finalizeStepNumbers(steps);
  }

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'total_pedidos = len(pedidos)',
    lineNumber: 117,
    actionType: 'VARIABLE_UPDATE',
    description: `Conta o total de pedidos: len(pedidos) = ${pedidos.length}`,
    didacticExplanation: 'A função len() retorna a contagem O(1) de nós contidos na lista.',
    variableName: 'total_pedidos',
    valueBefore: 'None',
    valueAfter: String(pedidos.length)
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'faturamento = 0.0',
    lineNumber: 118,
    actionType: 'VARIABLE_UPDATE',
    description: 'Inicializa o acumulador de faturamento com 0.0',
    didacticExplanation: 'Variável float que somará o campo total de cada pedido iterado.',
    variableName: 'faturamento',
    valueBefore: 'None',
    valueAfter: '0.00'
  });

  let runningFaturamento = 0.0;
  pedidos.forEach((p, idx) => {
    const prev = runningFaturamento;
    runningFaturamento += p.total;

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'for pedido in pedidos:',
      lineNumber: 120,
      actionType: 'FOR_ITERATION',
      description: `Iterando pedido ${idx + 1}/${pedidos.length} (Cliente: ${p.cliente})`,
      didacticExplanation: 'O loop FOR simples percorre diretamente cada elemento (dicionário pedido) da lista pedidos.',
      loopInfo: {
        type: 'FOR',
        iteration: idx + 1,
        totalIterations: pedidos.length,
        currentElement: p
      }
    });

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'faturamento += pedido["total"]',
      lineNumber: 121,
      actionType: 'CALCULATION',
      description: `Acumula: R$ ${prev.toFixed(2)} + R$ ${p.total.toFixed(2)} = R$ ${runningFaturamento.toFixed(2)}`,
      didacticExplanation: 'Soma o valor contábil do pedido corrente ao montante acumulado.',
      calculation: {
        formula: 'faturamento += pedido["total"]',
        values: `${prev.toFixed(2)} + ${p.total.toFixed(2)}`,
        result: runningFaturamento.toFixed(2)
      },
      variableName: 'faturamento',
      valueBefore: prev.toFixed(2),
      valueAfter: runningFaturamento.toFixed(2)
    });
  });

  // Tomada de decisão em cascata: if / elif / else
  const isAlto = runningFaturamento >= 500;
  const isMedio = !isAlto && runningFaturamento >= 200;
  const classificacao = isAlto
    ? 'Movimento alto'
    : isMedio
    ? 'Movimento médio'
    : 'Movimento baixo';

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'if faturamento >= 500:',
    lineNumber: 123,
    actionType: 'CONDITION_EVAL',
    description: `Testa faixa alta: faturamento (${runningFaturamento.toFixed(2)}) >= 500`,
    didacticExplanation: 'Primeiro ramo condicional da cascata if / elif / else.',
    conditionExpression: `${runningFaturamento.toFixed(2)} >= 500`,
    conditionResult: isAlto,
    branchMessage: isAlto ? 'VERDADEIRO: ramo "Movimento alto" selecionado!' : 'FALSO: testa o elif seguinte'
  });

  if (isAlto) {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'classificacao = "Movimento alto"',
      lineNumber: 124,
      actionType: 'VARIABLE_UPDATE',
      description: 'Atribui string "Movimento alto"',
      didacticExplanation: 'Classificação atribuída com sucesso; os ramos elif e else são ignorados.',
      variableName: 'classificacao',
      valueBefore: 'None',
      valueAfter: '"Movimento alto"'
    });
  } else {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'gerar_relatorio()',
      codeLine: 'elif faturamento >= 200:',
      lineNumber: 125,
      actionType: 'CONDITION_EVAL',
      description: `Testa faixa intermediária: faturamento (${runningFaturamento.toFixed(2)}) >= 200`,
      didacticExplanation: 'O elif (else if) só é testado se o if anterior resultou em FALSO.',
      conditionExpression: `${runningFaturamento.toFixed(2)} >= 200`,
      conditionResult: isMedio,
      branchMessage: isMedio ? 'VERDADEIRO: ramo "Movimento médio" selecionado!' : 'FALSO: cai no ramo else residual'
    });

    if (isMedio) {
      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'gerar_relatorio()',
        codeLine: 'classificacao = "Movimento médio"',
        lineNumber: 126,
        actionType: 'VARIABLE_UPDATE',
        description: 'Atribui string "Movimento médio"',
        didacticExplanation: 'Classificação intermediária atribuída; o bloco else residual é ignorado.',
        variableName: 'classificacao',
        valueBefore: 'None',
        valueAfter: '"Movimento médio"'
      });
    } else {
      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'gerar_relatorio()',
        codeLine: 'else:',
        lineNumber: 127,
        actionType: 'CONDITION_EVAL',
        description: 'Ramo residual else acionado',
        didacticExplanation: 'Como nem o if nem o elif foram satisfeitos, o bloco else captura todos os casos residuais (< 200).',
        conditionExpression: `${runningFaturamento.toFixed(2)} < 200`,
        conditionResult: true,
        branchMessage: 'VERDADEIRO (fallback): executa bloco else'
      });

      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'gerar_relatorio()',
        codeLine: 'classificacao = "Movimento baixo"',
        lineNumber: 128,
        actionType: 'VARIABLE_UPDATE',
        description: 'Atribui string "Movimento baixo"',
        didacticExplanation: 'Classificação padrão para faturamento abaixo de 200 reais.',
        variableName: 'classificacao',
        valueBefore: 'None',
        valueAfter: '"Movimento baixo"'
      });
    }
  }

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'gerar_relatorio()',
    codeLine: 'print(f"Total: {total_pedidos} | Faturamento: R$ {faturamento:.2f} | {classificacao}")',
    lineNumber: 128,
    actionType: 'PRINT_OUTPUT',
    description: 'Exibe o sumário final do relatório',
    didacticExplanation: 'Apresenta a síntese com formatação de moeda :.2f.',
    terminalOutput: `Total de Pedidos: ${pedidos.length}\nFaturamento: R$ ${runningFaturamento.toFixed(2)}\nClassificação: ${classificacao}`
  });

  return finalizeStepNumbers(steps);
}

/**
 * 6. Simulação de MOSTRAR CARDÁPIO (for codigo, produto in cardapio.items())
 */
export function generateMostrarCardapioSteps(): StepEvent[] {
  const steps: StepEvent[] = [];

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'mostrar_cardapio()',
    codeLine: 'def mostrar_cardapio():',
    lineNumber: 12,
    actionType: 'FUNCTION_CALL',
    description: 'Inicia a função de exibição do cardápio',
    didacticExplanation: 'Percorre as chaves e valores do dicionário cardapio usando o método .items().',
    terminalOutput: '\n========== CARDÁPIO =========='
  });

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'mostrar_cardapio()',
    codeLine: 'print("\\n========== CARDÁPIO ==========")',
    lineNumber: 13,
    actionType: 'PRINT_OUTPUT',
    description: 'Imprime o cabeçalho no console',
    didacticExplanation: 'Quebra de linha inicial com caractere de escape \\n seguida do título delimitado.'
  });

  const entries = Object.entries(CARDAPIO_ORIGINAL);
  entries.forEach(([codStr, prod], idx) => {
    const cod = Number(codStr);

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'mostrar_cardapio()',
      codeLine: 'for codigo, produto in cardapio.items():',
      lineNumber: 14,
      actionType: 'FOR_ITERATION',
      description: `Iteração ${idx + 1}/6: desempacota tupla (${cod}, {"nome": "${prod.nome}", "preco": ${prod.preco.toFixed(2)}})`,
      didacticExplanation: 'Desempacotamento de tupla (tuple unpacking): a cada iteração, codigo recebe a chave (int) e produto recebe o dicionário de dados.',
      loopInfo: {
        type: 'FOR',
        iteration: idx + 1,
        totalIterations: 6,
        currentElement: { codigo: cod, produto: prod }
      },
      variableName: 'codigo',
      valueBefore: String(idx === 0 ? 'None' : cod - 1),
      valueAfter: String(cod)
    });

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'mostrar_cardapio()',
      codeLine: `print(f"{codigo} - {produto['nome']} - R$ {produto['preco']:.2f}")`,
      lineNumber: 15,
      actionType: 'PRINT_OUTPUT',
      description: `Imprime: ${cod} - ${prod.nome} - R$ ${prod.preco.toFixed(2)}`,
      didacticExplanation: 'Utiliza f-string com especificador de precisão :.2f para formatar o float com duas casas decimais.',
      terminalOutput: `${cod} - ${prod.nome} - R$ ${prod.preco.toFixed(2)}`
    });
  });

  return finalizeStepNumbers(steps);
}

/**
 * 7. Simulação de LISTAR PEDIDOS (FOR Aninhado)
 */
export function generateListarPedidosSteps(pedidos: Pedido[]): StepEvent[] {
  const steps: StepEvent[] = [];

  steps.push({
    id: createStepId(),
    stepNumber: 0,
    totalSteps: 0,
    functionName: 'listar_pedidos()',
    codeLine: 'def listar_pedidos():',
    lineNumber: 73,
    actionType: 'FUNCTION_CALL',
    description: 'Inicia a função de listagem detalhada de pedidos',
    didacticExplanation: 'Apresenta estrutura de loops aninhados (nested loops): um FOR externo para os pedidos e um FOR interno para os itens de cada pedido.',
    terminalOutput: '\n========== LISTA DE PEDIDOS =========='
  });

  if (pedidos.length === 0) {
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'listar_pedidos()',
      codeLine: 'if len(pedidos) == 0:',
      lineNumber: 74,
      actionType: 'CONDITION_EVAL',
      description: 'Verifica se a lista está vazia: len(pedidos) == 0',
      didacticExplanation: 'Condição verdadeira, encerra com aviso.',
      conditionExpression: '0 == 0',
      conditionResult: true,
      branchMessage: 'VERDADEIRO: lista vazia'
    });

    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'listar_pedidos()',
      codeLine: 'print("Nenhum pedido cadastrado.")',
      lineNumber: 75,
      actionType: 'PRINT_OUTPUT',
      description: 'Avisa que não há pedidos',
      didacticExplanation: 'Emite aviso didático.',
      terminalOutput: 'Nenhum pedido cadastrado.'
    });

    return finalizeStepNumbers(steps);
  }

  pedidos.forEach((p, idx) => {
    const num = idx + 1;

    // FOR externo
    steps.push({
      id: createStepId(),
      stepNumber: 0,
      totalSteps: 0,
      functionName: 'listar_pedidos()',
      codeLine: 'for numero, pedido in enumerate(pedidos, start=1):',
      lineNumber: 77,
      actionType: 'FOR_ITERATION',
      description: `[FOR EXTERNO] Pedido ${num}/${pedidos.length} (Cliente: ${p.cliente})`,
      didacticExplanation: 'O loop FOR mais externo seleciona cada pedido da lista sequencialmente.',
      loopInfo: {
        type: 'FOR',
        iteration: num,
        totalIterations: pedidos.length,
        currentElement: p
      },
      variableName: 'numero',
      valueBefore: String(num - 1),
      valueAfter: String(num),
      terminalOutput: `\n--- Pedido #${num} [Cliente: ${p.cliente}] ---`
    });

    // FOR interno
    p.itens.forEach((item, itemIdx) => {
      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'listar_pedidos()',
        codeLine: 'for item in pedido["itens"]:',
        lineNumber: 79,
        actionType: 'FOR_ITERATION',
        description: `  [FOR INTERNO] Item ${itemIdx + 1}/${p.itens.length}: ${item.quantidade}x ${item.nome}`,
        didacticExplanation: 'O loop FOR interno itera sobre os elementos da sub-lista pedido["itens"] associada ao pedido corrente.',
        loopInfo: {
          type: 'FOR',
          iteration: itemIdx + 1,
          totalIterations: p.itens.length,
          currentElement: item
        },
        variableName: 'item',
        valueBefore: '...',
        valueAfter: `{"nome": "${item.nome}", "quantidade": ${item.quantidade}, "subtotal": ${item.subtotal}}`
      });

      steps.push({
        id: createStepId(),
        stepNumber: 0,
        totalSteps: 0,
        functionName: 'listar_pedidos()',
        codeLine: 'print(item)',
        lineNumber: 80,
        actionType: 'PRINT_OUTPUT',
        description: `  Imprime item: ${item.quantidade}x ${item.nome} = R$ ${item.subtotal.toFixed(2)}`,
        didacticExplanation: 'A instrução print() exibe a representação textual do dicionário item.',
        terminalOutput: `  • ${item.quantidade}x ${item.nome} -> R$ ${item.subtotal.toFixed(2)}`
      });
    });
  });

  return finalizeStepNumbers(steps);
}

/**
 * Normaliza os números e total de etapas
 */
function finalizeStepNumbers(steps: StepEvent[]): StepEvent[] {
  const total = steps.length;
  return steps.map((step, idx) => ({
    ...step,
    stepNumber: idx + 1,
    totalSteps: total
  }));
}
