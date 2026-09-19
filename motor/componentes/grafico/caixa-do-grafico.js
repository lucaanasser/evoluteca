import { criar } from "../criar-elemento.js";

export function caixaDoGrafico({ titulo, descricao }) {
  const tela = criar("div", { class: "tela-do-grafico", role: "img", "aria-label": descricao });
  const legenda = criar("div", { class: "legenda-do-grafico" });
  const elemento = criar(
    "figure",
    { class: "caixa-do-grafico" },
    titulo ? criar("figcaption", { class: "titulo-de-secao", texto: titulo }) : null,
    tela,
    legenda
  );
  return { elemento, tela, legenda };
}

export function gradeDeGraficos(...graficos) {
  return criar("div", { class: "grade-de-graficos" }, ...graficos);
}
