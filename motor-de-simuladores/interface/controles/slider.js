import { criar } from "criar-html";

const PASSOS_LOG = 1000;

function escrever(x, parametro) {
  const casas = parametro.passo && parametro.passo < 1 ? 2 : 0;
  return x.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

export function slider(parametro, valores, aoMudar) {
  const id = `par-${parametro.nome}`;
  const valor = criar("output", {
    class: "valor",
    for: id,
    texto: escrever(valores[parametro.nome], parametro),
  });

  const faixa = criar("input", { type: "range", id });
  const log = parametro.escala === "log";
  if (log) {
    faixa.min = 0;
    faixa.max = PASSOS_LOG;
    faixa.step = 1;
    faixa.value = Math.round(
      (Math.log(valores[parametro.nome] / parametro.min) /
        Math.log(parametro.max / parametro.min)) *
        PASSOS_LOG
    );
  } else {
    faixa.min = parametro.min;
    faixa.max = parametro.max;
    faixa.step = parametro.passo || 1;
    faixa.value = valores[parametro.nome];
  }

  faixa.addEventListener("input", () => {
    const bruto = log
      ? parametro.min * (parametro.max / parametro.min) ** (faixa.value / PASSOS_LOG)
      : +faixa.value;
    const v = parametro.passo && parametro.passo < 1 ? +bruto.toFixed(2) : Math.round(bruto);
    valores[parametro.nome] = v;
    valor.textContent = escrever(v, parametro);
    aoMudar();
  });

  return criar(
    "div",
    { class: "parametro" },
    criar("label", { for: id }, criar("span", { texto: parametro.rotulo }), valor),
    faixa
  );
}
