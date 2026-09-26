export interface Produto {
  codigo: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: 'Prato Principal' | 'Tradicional' | 'Bebida';
  imagem?: string;
}

export interface ItemPedido {
  codigo: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Pedido {
  numero: number; // 1-indexed for display (enumerate start=1)
  indice: number; // 0-indexed memory in python list
  cliente: string;
  itens: ItemPedido[];
  total: number;
  horario: string;
}

export interface Relatorio {
  totalPedidos: number;
  faturamento: number;
  classificacao: 'Movimento alto' | 'Movimento médio' | 'Movimento baixo';
  itensVendidos: number;
  mediaPorPedido: number;
  detalhesPorProduto: Array<{
    codigo: number;
    nome: string;
    quantidade: number;
    faturamento: number;
  }>;
}

export type StepActionType =
  | 'FUNCTION_CALL'
  | 'INPUT'
  | 'VARIABLE_UPDATE'
  | 'CONDITION_EVAL'
  | 'WHILE_ITERATION'
  | 'WHILE_BREAK'
  | 'FOR_ITERATION'
  | 'LIST_APPEND'
  | 'LIST_POP'
  | 'CALCULATION'
  | 'TRY_BLOCK'
  | 'EXCEPT_BLOCK'
  | 'PRINT_OUTPUT'
  | 'RETURN';

export interface StepEvent {
  id: string;
  stepNumber: number;
  totalSteps: number;
  functionName: string;
  codeLine: string;
  lineNumber: number;
  actionType: StepActionType;
  description: string;
  didacticExplanation: string;
  variableName?: string;
  valueBefore?: any;
  valueAfter?: any;
  conditionExpression?: string;
  conditionResult?: boolean;
  branchMessage?: string;
  loopInfo?: {
    type: 'WHILE' | 'FOR';
    iteration: number;
    totalIterations?: number;
    currentElement?: any;
  };
  listOperation?: {
    listName: string;
    operation: 'APPEND' | 'POP';
    item: any;
    index?: number;
    listBefore: any[];
    listAfter: any[];
  };
  calculation?: {
    formula: string;
    values: string;
    result: string | number;
  };
  errorInfo?: {
    errorType: string;
    inputGiven: string;
    handledBy: string;
    message: string;
  };
  terminalOutput?: string;
}

export interface SimulationState {
  currentStepIndex: number;
  steps: StepEvent[];
  isPlaying: boolean;
  isPaused: boolean;
  playbackSpeed: number; // multiplier: 0.5x, 1x, 2x
  activeFunctionName: string;
  currentLineNumber: number;
  currentVariables: Record<string, any>;
  variableHistory: Record<string, { before: any; after: any; timestamp: number }>;
  terminalLogs: Array<{
    type: 'output' | 'input' | 'error' | 'success' | 'comment';
    text: string;
    timestamp: number;
  }>;
  lastCondition?: {
    expression: string;
    result: boolean;
    branchTaken: string;
    line: number;
  };
  lastLoop?: {
    type: 'WHILE' | 'FOR';
    iteration: number;
    description: string;
  };
  lastError?: {
    type: string;
    message: string;
    inputGiven: string;
    line: number;
  };
}

export interface PythonFunctionMetadata {
  id: string;
  name: string;
  signature: string;
  lineStart: number;
  lineEnd: number;
  objective: string;
  variables: string[];
  conditionals: string[];
  loops: string[];
  lists: string[];
  inputs: string[];
  outputs: string[];
  explanation: string;
  category: 'Cardápio' | 'Pedido' | 'Consulta' | 'Relatório' | 'Controle' | 'Menu';
}
