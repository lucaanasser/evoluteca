/* O botão "Rodar de novo" só aparece se simular() sorteou alguma coisa. */

import { set_seed, zerarContagem, sorteiosFeitos } from "../../r/sorteio.js";
import { abrirGrafico } from "../graficos/__pacote__.js";
import { tituloDaPagina } from "../componentes/comuns/titulo-da-pagina.js";
import { botaoDeAcao } from "../componentes/comuns/botoes.js";
import { listaDeParametros } from "../componentes/simulador/controle-de-parametro.js";
import { painelDoSimulador } from "../componentes/simulador/painel-do-simulador.js";
import { caixaDoGrafico, gradeDeGraficos } from "../componentes/grafico/caixa-do-grafico.js";
import { itensDaLegenda } from "../componentes/grafico/legenda-do-grafico.js";

function novaSemente() {
  return 1 + Math.floor(Math.random() * 99999);
}

function graficosDeclarados(ficha) {
  const lista = ficha.graficos || (ficha.grafico ? [ficha.grafico] : []);
  if (lista.length === 0) {
    throw new Error('O simulador não declarou nenhum gráfico em ficha.graficos.');
  }
  return lista;
}

export async function montarSimulador(raiz, { ficha, simular }) {
  const valores = {};
  for (const p of ficha.parametros) valores[p.nome] = p.valor;

  let semente = novaSemente();

  const quadros = await Promise.all(
    graficosDeclarados(ficha).map(async (declarado) => {
      const desenho = await abrirGrafico(declarado);
      return { desenho, ...caixaDoGrafico({ titulo: declarado.titulo, descricao: desenho.descricao }) };
    })
  );

  const rodarDeNovo = botaoDeAcao({
    texto: "Rodar de novo",
    escondido: true,
    aoClicar: () => {
      semente = novaSemente();
      rodar();
    },
  });

  function desenharTudo() {
    for (const q of quadros) q.desenho.desenhar(q.tela);
  }

  function rodar() {
    set_seed(semente);
    zerarContagem();
    const dados = simular({ ...valores });
    rodarDeNovo.hidden = sorteiosFeitos() === 0;

    for (const q of quadros) {
      const camadas = q.desenho.receber(dados);
      q.legenda.replaceChildren(...itensDaLegenda(camadas));
    }
    desenharTudo();
  }

  let pedido = null;
  function agendar() {
    if (pedido) return;
    pedido = requestAnimationFrame(() => {
      pedido = null;
      rodar();
    });
  }

  raiz.append(
    tituloDaPagina({ titulo: ficha.titulo, resumo: ficha.resumo }),
    painelDoSimulador(
      { titulo: "Parâmetros", deControles: true, acoes: [rodarDeNovo] },
      listaDeParametros(ficha.parametros, valores, agendar)
    ),
    painelDoSimulador({ rotulo: "Simulação" }, gradeDeGraficos(...quadros.map((q) => q.elemento)))
  );

  document.title = `${ficha.titulo} · Evoluteca`;

  let atraso = null;
  window.addEventListener("resize", () => {
    clearTimeout(atraso);
    atraso = setTimeout(desenharTudo, 150);
  });

  rodar();

  document.fonts?.ready.then(desenharTudo);
}
