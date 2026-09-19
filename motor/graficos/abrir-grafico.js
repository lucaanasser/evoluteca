import { tipos } from "./tipos/__pacote__.js";
import { carregarPlano } from "./planos/__pacote__.js";
import { lerAparencia } from "./aparencia.js";

export async function abrirGrafico(declarado) {
  const nome = declarado.tipo || "linhas";
  const tipo = tipos[nome];
  if (!tipo) {
    throw new Error(
      `Gráfico de tipo "${nome}" não existe. Os tipos são: ${Object.keys(tipos).join(", ")}.`
    );
  }
  const plano = await carregarPlano(tipo.plano);
  let conteudo = null;

  return {
    descricao: plano.descrever(declarado),

    receber(dados) {
      conteudo = plano.preparar(dados, declarado, tipo);
      return conteudo.camadas || [];
    },

    desenhar(tela) {
      if (conteudo) plano.desenhar(tela, conteudo, declarado, tipo, lerAparencia());
    },
  };
}
