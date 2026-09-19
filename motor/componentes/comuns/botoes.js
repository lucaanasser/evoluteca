/* Todos os botões do site. */

import { criar } from "../criar-elemento.js";

export function botaoDeAcao({ texto, aoClicar, escondido = false }) {
  const b = criar("button", { class: "botao-de-acao", type: "button", texto, hidden: escondido });
  b.addEventListener("click", aoClicar);
  return b;
}
