import { PythonFunctionMetadata } from '../types/restaurant';

export const RAW_PYTHON_CODE = `pedidos = []

cardapio = {
    1: {"nome": "Tambaqui Assado", "preco": 45.00},
    2: {"nome": "Pirarucu Frito", "preco": 40.00},
    3: {"nome": "Caldeirada de Peixe", "preco": 35.00},
    4: {"nome": "Tacacá", "preco": 20.00},
    5: {"nome": "Suco de Cupuaçu", "preco": 10.00},
    6: {"nome": "Refrigerante", "preco": 7.00}
}

def mostrar_cardapio():
    print("\\n========== CARDÁPIO ==========")
    for codigo, produto in cardapio.items():
        print(f"{codigo} - {produto['nome']} - R$ {produto['preco']:.2f}")

def cadastrar_pedido():
    print("\\n========== NOVO PEDIDO ==========")
    nome_cliente = input("Digite o nome do cliente: ").strip()

    if nome_cliente == "":
        print("ERRO: o nome do cliente não pode ficar vazio.")
        return

    mostrar_cardapio()

    itens_pedido = []
    total_pedido = 0.0

    while True:
        try:
            codigo = int(input("Digite o código do produto (0 para finalizar): "))

            if codigo == 0:
                break

            if codigo not in cardapio:
                print("Produto inválido.")
                continue

            quantidade = int(input("Digite a quantidade: "))

            if quantidade <= 0:
                print("A quantidade deve ser maior que zero.")
                continue

            produto = cardapio[codigo]
            subtotal = produto["preco"] * quantidade

            item = {
                "nome": produto["nome"],
                "quantidade": quantidade,
                "subtotal": subtotal
            }

            itens_pedido.append(item)
            total_pedido += subtotal

        except ValueError:
            print("ERRO: digite apenas números válidos.")

    if len(itens_pedido) == 0:
        print("Nenhum item foi adicionado.")
        return

    pedido = {
        "cliente": nome_cliente,
        "itens": itens_pedido,
        "total": total_pedido
    }

    pedidos.append(pedido)

def listar_pedidos():
    if len(pedidos) == 0:
        print("Nenhum pedido cadastrado.")
        return

    for numero, pedido in enumerate(pedidos, start=1):
        for item in pedido["itens"]:
            print(item)

def consultar_pedido():
    nome_busca = input("Digite o nome do cliente: ").strip().lower()
    encontrado = False

    for numero, pedido in enumerate(pedidos, start=1):
        if nome_busca in pedido["cliente"].lower():
            encontrado = True

    if not encontrado:
        print("Nenhum pedido encontrado.")

def cancelar_pedido():
    while True:
        try:
            numero = int(input("Digite o número do pedido: "))

            if numero < 1 or numero > len(pedidos):
                print("Número inválido.")
                continue

            pedido_removido = pedidos.pop(numero - 1)
            print("Pedido cancelado.")
            break

        except ValueError:
            print("Digite um número válido.")

def gerar_relatorio():
    if len(pedidos) == 0:
        print("Nenhum pedido cadastrado.")
        return

    total_pedidos = len(pedidos)
    faturamento = 0.0

    for pedido in pedidos:
        faturamento += pedido["total"]

    if faturamento >= 500:
        classificacao = "Movimento alto"
    elif faturamento >= 200:
        classificacao = "Movimento médio"
    else:
        classificacao = "Movimento baixo"

def mostrar_menu():
    print("1 - Mostrar cardápio")
    print("2 - Cadastrar novo pedido")
    print("3 - Listar pedidos")
    print("4 - Consultar pedido")
    print("5 - Cancelar pedido")
    print("6 - Gerar relatório")
    print("0 - Sair")

def executar_sistema():
    while True:
        mostrar_menu()
        try:
            opcao = int(input("Escolha uma opção: "))

            if opcao == 1:
                mostrar_cardapio()
            elif opcao == 2:
                cadastrar_pedido()
            elif opcao == 3:
                listar_pedidos()
            elif opcao == 4:
                consultar_pedido()
            elif opcao == 5:
                cancelar_pedido()
            elif opcao == 6:
                gerar_relatorio()
            elif opcao == 0:
                break
            else:
                print("Opção inválida.")

        except ValueError:
            print("Digite apenas números.")

if __name__ == "__main__":
    executar_sistema()`;

export const PYTHON_CODE_LINES = RAW_PYTHON_CODE.split('\n');

export const PYTHON_FUNCTIONS_METADATA: PythonFunctionMetadata[] = [
  {
    id: 'mostrar_cardapio',
    name: 'mostrar_cardapio()',
    signature: 'def mostrar_cardapio():',
    lineStart: 12,
    lineEnd: 16,
    objective: 'Iterar sobre o dicionário cardapio e exibir todos os itens disponíveis formatados com código, nome e preço em reais.',
    variables: ['codigo (int)', 'produto (dict)', 'cardapio (dict global)'],
    conditionals: ['Nenhum (iteração incondicional sobre itens)'],
    loops: ['for codigo, produto in cardapio.items():'],
    lists: ['Iteração de chaves/valores do dicionário cardapio'],
    inputs: ['Nenhuma entrada direta do usuário'],
    outputs: ['Impressão no terminal via print() formatado com :.2f'],
    explanation: 'Demonstra o método .items() de dicionários em Python, desempacotando a tupla (chave, valor) diretamente nas variáveis codigo e produto.',
    category: 'Cardápio'
  },
  {
    id: 'cadastrar_pedido',
    name: 'cadastrar_pedido()',
    signature: 'def cadastrar_pedido():',
    lineStart: 18,
    lineEnd: 71,
    objective: 'Capturar o nome do cliente, entrar em loop interativo para adição de produtos, validar entradas, acumular itens e total, e inserir o pedido na lista global.',
    variables: ['nome_cliente (str)', 'itens_pedido (list)', 'total_pedido (float)', 'codigo (int)', 'quantidade (int)', 'subtotal (float)', 'pedido (dict)'],
    conditionals: [
      'if nome_cliente == "" (early return)',
      'if codigo == 0 (break do while)',
      'if codigo not in cardapio (continue)',
      'if quantidade <= 0 (continue)',
      'if len(itens_pedido) == 0 (early return)'
    ],
    loops: ['while True (loop infinito com break para seleção de itens)'],
    lists: ['itens_pedido.append(item)', 'pedidos.append(pedido)'],
    inputs: ['input("Digite o nome...")', 'input("Digite o código...")', 'input("Digite a quantidade...")'],
    outputs: ['Atualização de listas em memória e prints informativos'],
    explanation: 'A função mais rica do sistema: combina validação com early return, loop while True com sentinela (codigo == 0), tratamento try/except ValueError, cálculo acumulativo e append de dicionários em lista.',
    category: 'Pedido'
  },
  {
    id: 'listar_pedidos',
    name: 'listar_pedidos()',
    signature: 'def listar_pedidos():',
    lineStart: 73,
    lineEnd: 81,
    objective: 'Verificar se existem pedidos cadastrados e percorrer a estrutura aninhada (pedidos -> itens) imprimindo cada elemento.',
    variables: ['numero (int)', 'pedido (dict)', 'item (dict)'],
    conditionals: ['if len(pedidos) == 0:'],
    loops: [
      'for numero, pedido in enumerate(pedidos, start=1):',
      'for item in pedido["itens"]:'
    ],
    lists: ['Leitura indexada da lista pedidos e da sub-lista pedido["itens"]'],
    inputs: ['Nenhuma entrada necessária'],
    outputs: ['Impressão de cada item do pedido no terminal'],
    explanation: 'Demonstra o uso didático de FOR aninhado (nested loops) e a função nativa enumerate() com parâmetro start=1 para numeração humana amigável.',
    category: 'Pedido'
  },
  {
    id: 'consultar_pedido',
    name: 'consultar_pedido()',
    signature: 'def consultar_pedido():',
    lineStart: 83,
    lineEnd: 93,
    objective: 'Buscar pedidos pelo nome parcial ou completo do cliente, utilizando normalização para minúsculas e operador in.',
    variables: ['nome_busca (str)', 'encontrado (bool)', 'numero (int)', 'pedido (dict)'],
    conditionals: [
      'if nome_busca in pedido["cliente"].lower():',
      'if not encontrado:'
    ],
    loops: ['for numero, pedido in enumerate(pedidos, start=1):'],
    lists: ['Varredura linear (busca sequencial) na lista pedidos'],
    inputs: ['input("Digite o nome do cliente: ").strip().lower()'],
    outputs: ['Mensagem de encontrado ou "Nenhum pedido encontrado."'],
    explanation: 'Apresenta a técnica de busca sequencial com flag booleana (encontrado = False/True), tratamento de strings com .strip().lower() e o operador de pertinência in.',
    category: 'Consulta'
  },
  {
    id: 'cancelar_pedido',
    name: 'cancelar_pedido()',
    signature: 'def cancelar_pedido():',
    lineStart: 95,
    lineEnd: 110,
    objective: 'Solicitar o número visível de um pedido e remover o elemento exato da lista global pedidos usando pop(numero - 1).',
    variables: ['numero (int)', 'pedido_removido (dict)'],
    conditionals: [
      'if numero < 1 or numero > len(pedidos):'
    ],
    loops: ['while True (com break após cancelamento bem-sucedido)'],
    lists: ['pedidos.pop(numero - 1) — remoção por índice com deslocamento'],
    inputs: ['input("Digite o número do pedido: ")'],
    outputs: ['Mensagem "Pedido cancelado." e retorno ao chamador'],
    explanation: 'Demonstra o conceito fundamental de índice baseado em zero (0-indexed) de Python: para o usuário o pedido é 1, mas na memória da lista ele reside no índice 0 (numero - 1).',
    category: 'Pedido'
  },
  {
    id: 'gerar_relatorio',
    name: 'gerar_relatorio()',
    signature: 'def gerar_relatorio():',
    lineStart: 112,
    lineEnd: 128,
    objective: 'Calcular a quantidade de pedidos, somar o faturamento total acumulado e classificar o movimento do restaurante por faixas condicionais.',
    variables: ['total_pedidos (int)', 'faturamento (float)', 'pedido (dict)', 'classificacao (str)'],
    conditionals: [
      'if len(pedidos) == 0:',
      'if faturamento >= 500:',
      'elif faturamento >= 200:',
      'else:'
    ],
    loops: ['for pedido in pedidos: (acumulação de totais)'],
    lists: ['Medição de tamanho com len(pedidos) e agregação de valores'],
    inputs: ['Nenhuma entrada necessária'],
    outputs: ['Classificação do movimento e totalização contábil'],
    explanation: 'Apresenta a estrutura de decisão em cascata if / elif / else para categorização analítica com operadores de comparação >=.',
    category: 'Relatório'
  },
  {
    id: 'mostrar_menu',
    name: 'mostrar_menu()',
    signature: 'def mostrar_menu():',
    lineStart: 130,
    lineEnd: 138,
    objective: 'Exibir no terminal o menu principal numerado de 0 a 6 com todas as opções do sistema.',
    variables: ['Nenhuma variável interna'],
    conditionals: ['Nenhum'],
    loops: ['Nenhum'],
    lists: ['Nenhuma'],
    inputs: ['Nenhum'],
    outputs: ['Prints com as 7 opções do console CLI'],
    explanation: 'Função de interface pura de terminal para navegação do usuário.',
    category: 'Menu'
  },
  {
    id: 'executar_sistema',
    name: 'executar_sistema()',
    signature: 'def executar_sistema():',
    lineStart: 140,
    lineEnd: 169,
    objective: 'Loop principal do aplicativo (Game Loop / CLI loop), que exibe o menu, trata erros de digitação e roteia a escolha para a função correspondente.',
    variables: ['opcao (int)'],
    conditionals: [
      'if opcao == 1: mostrar_cardapio()',
      'elif opcao == 2: cadastrar_pedido()',
      'elif opcao == 3: listar_pedidos()',
      'elif opcao == 4: consultar_pedido()',
      'elif opcao == 5: cancelar_pedido()',
      'elif opcao == 6: gerar_relatorio()',
      'elif opcao == 0: break',
      'else: Opção inválida.'
    ],
    loops: ['while True (executa indefinidamente até opcao == 0)'],
    lists: ['Controla o ciclo de vida das estruturas globais'],
    inputs: ['input("Escolha uma opção: ")'],
    outputs: ['Chamada das subfunções ou encerramento'],
    explanation: 'O padrão arquitetural de "Dispatcher Loop" em Python: orquestração centralizada de todo o fluxo operacional.',
    category: 'Controle'
  }
];
