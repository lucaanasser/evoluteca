import { criar } from "../criar-elemento.js";

export function cartaoDoCatalogo({ titulo, resumo, endereco }) {
  return criar(
    "a",
    { class: "cartao-do-catalogo", href: endereco },
    criar("span", { class: "titulo-do-cartao", texto: titulo }),
    resumo ? criar("span", { texto: resumo }) : null
  );
}

export function listaDeCartoes(cartoes) {
  return criar("ul", { class: "lista-de-cartoes" }, ...cartoes.map((c) => criar("li", {}, c)));
}
