/* Classes como no hist() do R: regra de Sturges, fechadas à direita. */

import { numerosRedondos } from "../numeros.js";

function contarPorClasse(valores, quantasClasses) {
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const quantas = quantasClasses || Math.ceil(Math.log2(valores.length) + 1);
  const redondos = numerosRedondos(min, max, quantas);
  const passo = redondos.length >= 2 ? +(redondos[1] - redondos[0]).toFixed(10) : max - min || 1;
  const inicio = Math.floor(min / passo) * passo;
  const classes = Math.max(1, Math.ceil((max - inicio) / passo - 1e-9));

  const contagens = new Array(classes).fill(0);
  for (const v of valores) {
    const i = Math.min(classes - 1, Math.max(0, Math.ceil((v - inicio) / passo - 1e-9) - 1));
    contagens[i]++;
  }
  return {
    x: contagens.map((_, i) => inicio + (i + 0.5) * passo),
    y: contagens,
    largura: passo,
  };
}

export const histograma = {
  plano: "cartesiana",

  preparar: (serie, grafico) => (serie.y.length ? contarPorClasse(serie.y, grafico.classes) : serie),

  extremos(serie) {
    const meia = serie.largura / 2;
    return {
      x: [Math.min(...serie.x) - meia, Math.max(...serie.x) + meia],
      y: [Math.min(0, ...serie.y), Math.max(0, ...serie.y)],
    };
  },

  serie({ ctx, px, py }, serie, estilo) {
    const meia = serie.largura / 2;
    const chao = py(0);
    for (let i = 0; i < serie.y.length; i++) {
      const esquerda = px(serie.x[i] - meia) + estilo.largura / 2;
      const direita = px(serie.x[i] + meia) - estilo.largura / 2;
      ctx.fillRect(esquerda, py(serie.y[i]), Math.max(direita - esquerda, 1), chao - py(serie.y[i]));
    }
  },
};
