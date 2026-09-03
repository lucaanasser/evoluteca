import { criarGerador } from "r";
import { linhas } from "../graficos/__entrada__.js";
import { criar } from "./criar-html.js";
import { slider } from "./controles/__entrada__.js";
import { legenda } from "./mostradores/__entrada__.js";

export function montarSimulador(raiz, modelo) {
  const { meta, simular } = modelo;
  const valores = {};
  for (const p of meta.parametros) valores[p.nome] = p.valor;

  let semente = 1 + Math.floor(Math.random() * 99999);
  let series = null;

  const canvas = criar("canvas", {
    class: "grafico",
    role: "img",
    "aria-label": `${meta.grafico.y} por ${meta.grafico.x}`,
  });
  const rodape = criar("div", { class: "legenda" });

  function desenhar() {
    linhas(canvas, series, meta.grafico);
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

  const botao = criar("button", { class: "botao", type: "button", texto: "Rodar de novo" });
  botao.addEventListener("click", () => {
    semente = 1 + Math.floor(Math.random() * 99999);
    rodar();
  });

  const parametros = criar("div", { class: "parametros" });
  for (const p of meta.parametros) parametros.append(slider(p, valores, agendar));

  raiz.append(
    criar("h1", { texto: meta.titulo }),
    criar(
      "section",
      { class: "painel", "aria-label": "Parâmetros" },
      criar("div", { class: "painel-topo" }, criar("h2", { texto: "Parâmetros" }), botao),
      parametros
    ),
    criar("section", { class: "area-da-simulacao", "aria-label": "Simulação" }, canvas, rodape)
  );

  document.title = `${meta.titulo} · Evoluteca`;

  let atraso = null;
  window.addEventListener("resize", () => {
    clearTimeout(atraso);
    atraso = setTimeout(desenhar, 150);
  });

  rodar();
}
