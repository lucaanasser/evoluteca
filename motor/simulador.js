import { criarGerador } from "r";
import { desenharLinhas } from "./grafico.js";

const PASSOS_LOG = 1000;

function el(tag, atributos = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [chave, valor] of Object.entries(atributos)) {
    if (chave === "texto") n.textContent = valor;
    else n.setAttribute(chave, valor);
  }
  n.append(...filhos);
  return n;
}

function escrever(x, parametro) {
  const casas = parametro.passo && parametro.passo < 1 ? 2 : 0;
  return x.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

function slider(parametro, valores, aoMudar) {
  const id = `par-${parametro.nome}`;
  const mostrador = el("output", {
    class: "valor",
    for: id,
    texto: escrever(valores[parametro.nome], parametro),
  });

  const faixa = el("input", { type: "range", id });
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
    mostrador.textContent = escrever(v, parametro);
    aoMudar();
  });

  return el(
    "div",
    { class: "parametro" },
    el("label", { for: id }, el("span", { texto: parametro.rotulo }), mostrador),
    faixa
  );
}

function legenda(quantas) {
  const item = (classe, texto) =>
    el("span", { class: "legenda-item" }, el("span", { class: classe }), el("span", { texto }));
  if (quantas === 1) return [item("marca-foco", "frequência do alelo")];
  return [
    item("marca-foco", `população em foco (1 de ${quantas})`),
    item("marca-feixe", `outras ${quantas - 1} réplicas`),
  ];
}

export function montarSimulador(raiz, modelo) {
  const { meta, simular } = modelo;
  const valores = {};
  for (const p of meta.parametros) valores[p.nome] = p.valor;

  let semente = 1 + Math.floor(Math.random() * 99999);
  let series = null;

  const tela = el("canvas", {
    class: "grafico",
    role: "img",
    "aria-label": `${meta.grafico.y} por ${meta.grafico.x}`,
  });
  const rodape = el("div", { class: "legenda" });

  function desenhar() {
    desenharLinhas(tela, series, meta.grafico);
    rodape.replaceChildren(...legenda(series.length));
  }

  function rodar() {
    series = simular({ ...valores }, criarGerador(semente));
    desenhar();
  }

  let pedido = null;
  function agendar() {
    if (pedido) return;
    pedido = requestAnimationFrame(() => {
      pedido = null;
      rodar();
    });
  }

  const botao = el("button", { class: "botao", type: "button", texto: "Rodar de novo" });
  botao.addEventListener("click", () => {
    semente = 1 + Math.floor(Math.random() * 99999);
    rodar();
  });

  const parametros = el("div", { class: "parametros" });
  for (const p of meta.parametros) parametros.append(slider(p, valores, agendar));

  raiz.append(
    el("h1", { texto: meta.titulo }),
    el(
      "section",
      { class: "painel", "aria-label": "Parâmetros" },
      el("div", { class: "painel-topo" }, el("h2", { texto: "Parâmetros" }), botao),
      parametros
    ),
    el("section", { class: "quadro", "aria-label": "Simulação" }, tela, rodape)
  );

  document.title = `${meta.titulo} · Evoluteca`;

  let atraso = null;
  window.addEventListener("resize", () => {
    clearTimeout(atraso);
    atraso = setTimeout(desenhar, 150);
  });

  rodar();
}
