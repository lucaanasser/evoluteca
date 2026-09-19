/* Com escala: "log" a barra anda por proporção, e não por valor. */

import { criar } from "../criar-elemento.js";

const PASSOS_DA_ESCALA_LOG = 1000;

function casasDoPasso(passo = 1) {
  const texto = String(passo);
  if (texto.includes("e-")) return Number(texto.split("e-")[1]);
  return (texto.split(".")[1] || "").length;
}

export function controleDeslizante(parametro, valorInicial, aoMudar) {
  const casas = casasDoPasso(parametro.passo);
  const escrever = (x) =>
    x.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

  const id = `par-${parametro.nome}`;
  const mostrador = criar("output", {
    class: "valor-do-parametro",
    for: id,
    texto: escrever(valorInicial),
  });

  const faixa = criar("input", { class: "controle-deslizante", type: "range", id });
  const log = parametro.escala === "log";
  if (log) {
    faixa.min = 0;
    faixa.max = PASSOS_DA_ESCALA_LOG;
    faixa.step = 1;
    faixa.value = Math.round(
      (Math.log(valorInicial / parametro.min) / Math.log(parametro.max / parametro.min)) *
        PASSOS_DA_ESCALA_LOG
    );
  } else {
    faixa.min = parametro.min;
    faixa.max = parametro.max;
    faixa.step = parametro.passo || 1;
    faixa.value = valorInicial;
  }

  function pintarTrilho() {
    const fracao = (faixa.value - faixa.min) / (faixa.max - faixa.min || 1);
    faixa.style.setProperty("--preenchido", `${fracao * 100}%`);
  }
  pintarTrilho();

  faixa.addEventListener("input", () => {
    const bruto = log
      ? parametro.min * (parametro.max / parametro.min) ** (faixa.value / PASSOS_DA_ESCALA_LOG)
      : +faixa.value;
    const v = +bruto.toFixed(casas);
    mostrador.textContent = escrever(v);
    pintarTrilho();
    aoMudar(v);
  });

  return { id, controle: faixa, mostrador };
}
