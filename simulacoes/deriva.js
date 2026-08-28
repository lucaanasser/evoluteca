import { rbinom, seq } from "r";

export const meta = {
  titulo: "Deriva genética",
  parametros: [
    { nome: "N", rotulo: "Tamanho da população", min: 10, max: 5000, valor: 100, escala: "log" },
    { nome: "p0", rotulo: "Frequência inicial", min: 0.02, max: 0.98, valor: 0.5, passo: 0.01 },
    { nome: "replicas", rotulo: "Réplicas", min: 1, max: 100, valor: 20 },
    { nome: "geracoes", rotulo: "Gerações", min: 10, max: 1000, valor: 200 },
  ],
  grafico: { x: "geração", y: "frequência do alelo A", ylim: [0, 1] },
};

export function simular({ N, p0, geracoes, replicas }, rng) {
  const series = [];
  for (const r of seq(1, replicas)) {
    const p = [p0];
    for (const g of seq(1, geracoes)) {
      p[g] = rbinom(2 * N, p[g - 1], rng) / (2 * N);
    }
    series.push(p);
  }
  return series;
}
