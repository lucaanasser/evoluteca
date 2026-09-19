/* pincel: { ctx, px, py, area, aparencia }. */

import { prepararCanvas, aplicarEstilo } from "../../canvas.js";
import { prepararCamadas } from "./camadas.js";
import { enquadrar, recortar } from "./enquadramento.js";
import { desenharEixos } from "./eixos.js";

function eixo(declarado) {
  if (typeof declarado === "string") return { rotulo: declarado };
  return { rotulo: "", ...declarado };
}

export const cartesiana = {
  preparar(dados, grafico, tipo) {
    return { camadas: prepararCamadas(dados, grafico, tipo) };
  },

  descrever(grafico) {
    return `${eixo(grafico.y).rotulo} por ${eixo(grafico.x).rotulo}`;
  },

  desenhar(tela, { camadas }, declarado, tipo, aparencia) {
    const grafico = { ...declarado, x: eixo(declarado.x), y: eixo(declarado.y) };
    const { ctx, largura, altura } = prepararCanvas(tela);
    const enquadramento = enquadrar(camadas, grafico, tipo, aparencia, largura, altura);
    const pincel = {
      ctx,
      px: enquadramento.px,
      py: enquadramento.py,
      area: enquadramento.area,
      aparencia,
    };

    desenharEixos(ctx, enquadramento, grafico, aparencia);

    recortar(ctx, enquadramento.area, aparencia, () => {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const camada of camadas) {
        const estilo = aparencia.estiloDaCamada(camada.estilo, camada.series.length);
        aplicarEstilo(ctx, estilo);
        for (const serie of camada.series) {
          if (serie.y.length > 0) tipo.serie(pincel, serie, estilo);
        }
      }
    });
  },
};
