/* {n} no rótulo vira o número de séries da camada. */

import { criar } from "../criar-elemento.js";
import { lerAparencia } from "../../graficos/aparencia.js";

function comNumero(rotulo, quantas) {
  return rotulo.replace("{n}", quantas.toLocaleString("pt-BR"));
}

function amostra(estilo) {
  const risco = criar("span", { class: "amostra-da-camada" });
  risco.style.opacity = estilo.opacidade;
  risco.style.background = estilo.cor;
  return risco;
}

export function itensDaLegenda(camadas) {
  const aparencia = lerAparencia();

  return camadas
    .filter((camada) => camada.rotulo && camada.series.length > 0)
    .reverse()
    .map((camada) =>
      criar(
        "span",
        { class: "legenda-item" },
        amostra(aparencia.estiloDaCamada(camada.estilo, 1)),
        criar("span", { texto: comNumero(camada.rotulo, camada.series.length) })
      )
    );
}
