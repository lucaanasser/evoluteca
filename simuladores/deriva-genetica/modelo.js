import { rbinom, seq, replicate } from "r";

export const ficha = {
  titulo: "Deriva genética",
  resumo:
    "Sem nenhuma vantagem de um alelo sobre o outro, a frequência ainda assim caminha: " +
    "cada geração é uma amostra sorteada da anterior. Quanto menor a população, mais " +
    "depressa o alelo chega à perda ou à fixação.",

  parametros: [
    { nome: "N", rotulo: "Tamanho da população", min: 10, max: 5000, valor: 100, escala: "log" },
    { nome: "p0", rotulo: "Frequência inicial", min: 0.02, max: 0.98, valor: 0.5, passo: 0.01 },
    { nome: "replicas", rotulo: "Réplicas", min: 1, max: 100, valor: 20 },
    { nome: "geracoes", rotulo: "Gerações", min: 10, max: 1000, valor: 200 },
  ],

  graficos: [
    {
      tipo: "linhas",
      titulo: "Frequência ao longo das gerações",
      x: "geração",
      y: { rotulo: "frequência do alelo A", limites: [0, 1] },
      camadas: [
        { de: "demais", estilo: "feixe", rotulo: "outras {n} réplicas" },
        { de: "foco", estilo: "destaque", rotulo: "população em foco" },
      ],
    },
    {
      tipo: "histograma",
      titulo: "Frequência na última geração",
      classes: 10,
      x: { rotulo: "frequência final do alelo A", limites: [0, 1] },
      y: { rotulo: "número de populações", limites: [0, null] },
      camadas: [{ de: "finais", estilo: "preenchido" }],
    },
  ],
};

export function simular({ N, p0, geracoes, replicas }) {
  function umaPopulacao() {
    const p = [p0];
    for (const g of seq(1, geracoes)) {
      p[g] = rbinom(1, 2 * N, p[g - 1]) / (2 * N);
    }
    return p;
  }

  const populacoes = replicate(replicas, umaPopulacao);

  return {
    foco: populacoes[0],
    demais: populacoes.slice(1),
    finais: populacoes.map((p) => p[geracoes]),
  };
}
