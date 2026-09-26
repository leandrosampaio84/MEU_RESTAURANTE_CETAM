import { Produto } from '../types/restaurant';

export const CARDAPIO_ORIGINAL: Record<number, { nome: string; preco: number }> = {
  1: { nome: "Tambaqui Assado", preco: 45.00 },
  2: { nome: "Pirarucu Frito", preco: 40.00 },
  3: { nome: "Caldeirada de Peixe", preco: 35.00 },
  4: { nome: "Tacacá", preco: 20.00 },
  5: { nome: "Suco de Cupuaçu", preco: 10.00 },
  6: { nome: "Refrigerante", preco: 7.00 }
};

export const CARDAPIO_DETALHADO: Produto[] = [
  {
    codigo: 1,
    nome: "Tambaqui Assado",
    preco: 45.00,
    descricao: "Costela nobre de tambaqui da Amazônia assada na brasa, servida com vinagrete e farofa de banana.",
    categoria: "Prato Principal",
    imagem: "/src/assets/images/prato_tambaqui_assado_1790357657879.jpg"
  },
  {
    codigo: 2,
    nome: "Pirarucu Frito",
    preco: 40.00,
    descricao: "Filé do gigante das águas amazônicas empanado e frito até dourar, crocante por fora e macio por dentro.",
    categoria: "Prato Principal",
    imagem: "/src/assets/images/hero_restaurante_amazonico_1790357640510.jpg"
  },
  {
    codigo: 3,
    nome: "Caldeirada de Peixe",
    preco: 35.00,
    descricao: "Ensopado aromático tradicional de peixe fresco com tucupi, ovos cozidos, batatas e ervas amazônicas.",
    categoria: "Prato Principal",
    imagem: "/src/assets/images/hero_restaurante_amazonico_1790357640510.jpg"
  },
  {
    codigo: 4,
    nome: "Tacacá",
    preco: 20.00,
    descricao: "Caldinho fumegante servido na cuia tradicional com tucupi, goma de mandioca, jambu e camarão seco.",
    categoria: "Tradicional",
    imagem: "/src/assets/images/prato_tacaca_tucupi_1790357670175.jpg"
  },
  {
    codigo: 5,
    nome: "Suco de Cupuaçu",
    preco: 10.00,
    descricao: "Polpa fresca de cupuaçu batida na hora, cremosa, refrescante e rica em notas tropicais.",
    categoria: "Bebida",
    imagem: "/src/assets/images/suco_cupuacu_fresco_1790357680112.jpg"
  },
  {
    codigo: 6,
    nome: "Refrigerante",
    preco: 7.00,
    descricao: "Lata 350ml bem gelada (Guaraná Baré / Tradicional) servida com gelo e limão.",
    categoria: "Bebida"
  }
];

export const HERO_IMAGE = "/src/assets/images/hero_restaurante_amazonico_1790357640510.jpg";
