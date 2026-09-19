import { criar } from "../criar-elemento.js";
import { paginasDoSite, enderecoDaPagina } from "./paginas-do-site.js";

const imagem = (arquivo) => new URL(`../../../imagens/institucionais/${arquivo}`, import.meta.url).href;

const instituicoes = [
  {
    nome: "Instituto de Biociências",
    endereco: "https://www.ib.usp.br",
    arquivo: "logo-ib-branco.png",
    classe: "logo-do-ib-no-rodape",
  },
  {
    nome: "Universidade de São Paulo",
    endereco: "https://www5.usp.br",
    arquivo: "logo-usp-branco.png",
    classe: "logo-da-usp-no-rodape",
  },
];

function colunaDeLinks(titulo, links) {
  return criar(
    "div",
    {},
    criar("h2", { class: "titulo-do-rodape", texto: titulo }),
    criar(
      "ul",
      { class: "lista-do-rodape" },
      ...links.map(({ nome, endereco }) => criar("li", {}, criar("a", { href: endereco, texto: nome })))
    )
  );
}

function logo({ nome, endereco, arquivo, classe }) {
  return criar(
    "a",
    { href: endereco, title: nome },
    criar("img", { class: classe, src: imagem(arquivo), alt: nome })
  );
}

export function rodapeDoSite() {
  return criar(
    "footer",
    { class: "rodape-do-site" },
    criar(
      "div",
      { class: "coluna-central colunas-do-rodape" },
      colunaDeLinks(
        "Evoluteca",
        paginasDoSite.map(({ nome, arquivo }) => ({ nome, endereco: enderecoDaPagina(arquivo) }))
      ),
      colunaDeLinks("Institucional", instituicoes),
      criar("div", { class: "logos-do-rodape" }, ...instituicoes.map(logo))
    ),
    criar(
      "div",
      { class: "base-do-rodape" },
      criar(
        "div",
        { class: "coluna-central" },
        criar("p", { texto: "Instituto de Biociências. Todos os direitos reservados." }),
        criar("p", {
          texto: "Rua do Matão, trav. 14, nº 321, Cidade Universitária, São Paulo - SP, CEP: 05508-090",
        })
      )
    )
  );
}
