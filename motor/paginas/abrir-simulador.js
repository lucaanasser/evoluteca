/* simulador.html?s=nome abre simuladores/nome/modelo.js. */

import { tituloDaPagina } from "../componentes/comuns/titulo-da-pagina.js";
import { montarSimulador } from "./pagina-do-simulador.js";

const pastaDe = (nome) => new URL(`../../simuladores/${nome}/`, import.meta.url);

export function carregarModelo(nome) {
  return import(new URL("modelo.js", pastaDe(nome)).href);
}

export function enderecoDoSimulador(nome) {
  return `simulador.html?s=${encodeURIComponent(nome)}`;
}

export async function abrirSimulador(raiz, catalogo) {
  const pedido = new URLSearchParams(location.search).get("s");
  const nome = catalogo.includes(pedido) ? pedido : catalogo[0];
  try {
    await montarSimulador(raiz, await carregarModelo(nome));
  } catch (erro) {
    console.error(erro);
    raiz.replaceChildren(
      tituloDaPagina({ titulo: "Este simulador não abriu.", resumo: String(erro.message || erro) })
    );
  }
}
