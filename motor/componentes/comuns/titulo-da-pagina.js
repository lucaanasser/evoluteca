import { criar } from "../criar-elemento.js";

export function tituloDaPagina({ titulo, resumo }) {
  return criar(
    "header",
    { class: "titulo-da-pagina" },
    criar("h1", { texto: titulo }),
    resumo ? criar("p", { class: "introducao", texto: resumo }) : null
  );
}
