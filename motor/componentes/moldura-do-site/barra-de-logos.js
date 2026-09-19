import { criar } from "../criar-elemento.js";

const imagem = (arquivo) => new URL(`../../../imagens/institucionais/${arquivo}`, import.meta.url).href;

function logo({ endereco, nome, arquivo, classe }) {
  return criar(
    "a",
    { class: "logo-institucional", href: endereco, title: nome },
    criar("img", { class: classe, src: imagem(arquivo), alt: nome })
  );
}

export function barraDeLogos() {
  return criar(
    "div",
    { class: "barra-de-logos" },
    criar(
      "div",
      { class: "coluna-central" },
      logo({
        endereco: "https://www.ib.usp.br",
        nome: "Instituto de Biociências da USP",
        arquivo: "icone-ib-branco.png",
        classe: "logo-do-ib",
      }),
      logo({
        endereco: "https://www5.usp.br",
        nome: "Universidade de São Paulo",
        arquivo: "logo-usp-branco.png",
        classe: "logo-da-usp",
      })
    )
  );
}
