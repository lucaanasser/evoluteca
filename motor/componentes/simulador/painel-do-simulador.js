import { criar } from "../criar-elemento.js";

export function painelDoSimulador({ titulo, rotulo, deControles = false, acoes = [] }, ...conteudo) {
  const topo =
    titulo || acoes.length
      ? criar(
          "div",
          { class: "topo-do-painel" },
          titulo ? criar("h2", { class: "titulo-de-secao", texto: titulo }) : null,
          ...acoes
        )
      : null;

  return criar(
    "section",
    {
      class: deControles ? "painel-do-simulador painel-de-controles" : "painel-do-simulador",
      "aria-label": rotulo || titulo,
    },
    topo,
    ...conteudo
  );
}
