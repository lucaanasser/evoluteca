import { criar } from "../criar-elemento.js";

const inicio = new URL("../../../index.html", import.meta.url).href;

export function cabecalhoDoSite() {
  return criar(
    "header",
    { class: "cabecalho-do-site" },
    criar(
      "div",
      { class: "coluna-central" },
      criar(
        "a",
        { class: "marca", href: inicio },
        criar("span", { class: "marca-nome", texto: "Evoluteca" }),
        criar("span", { class: "marca-instituicao", texto: "Instituto de Biociências · USP" })
      )
    )
  );
}
