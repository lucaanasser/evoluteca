/* limites: [0, null] prende só o chão e deixa o teto seguir os dados. */

function extremosDosPontos(serie) {
  let [xmin, xmax, ymin, ymax] = [Infinity, -Infinity, Infinity, -Infinity];
  for (const v of serie.x) {
    if (v < xmin) xmin = v;
    if (v > xmax) xmax = v;
  }
  for (const v of serie.y) {
    if (v < ymin) ymin = v;
    if (v > ymax) ymax = v;
  }
  return { x: [xmin, xmax], y: [ymin, ymax] };
}

function extremos(camadas, tipo) {
  const total = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
  for (const camada of camadas) {
    for (const serie of camada.series) {
      const e = tipo.extremos ? tipo.extremos(serie) : extremosDosPontos(serie);
      for (const eixo of ["x", "y"]) {
        if (e[eixo][0] < total[eixo][0]) total[eixo][0] = e[eixo][0];
        if (e[eixo][1] > total[eixo][1]) total[eixo][1] = e[eixo][1];
      }
    }
  }
  return total;
}

function limites([min, max], declarado = [], folga) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) [min, max] = [0, 1];
  else if (min === max) [min, max] = [min - 0.5, max + 0.5];
  else {
    const respiro = (max - min) * folga;
    [min, max] = [min - respiro, max + respiro];
  }
  const fixado = (ponta, calculado) =>
    Number.isFinite(declarado[ponta]) ? declarado[ponta] : calculado;
  return [fixado(0, min), fixado(1, max)];
}

export function enquadrar(camadas, grafico, tipo, aparencia, largura, altura) {
  const area = {
    esquerda: aparencia.margemEsquerda,
    direita: largura - aparencia.margemDireita,
    topo: aparencia.margemSuperior,
    baixo: altura - aparencia.margemInferior,
  };

  const dados = extremos(camadas, tipo);
  const xlim = limites(dados.x, grafico.x.limites, 0);
  const ylim = limites(dados.y, grafico.y.limites, aparencia.folgaEmY);

  const px = (v) =>
    area.esquerda + ((v - xlim[0]) / (xlim[1] - xlim[0])) * (area.direita - area.esquerda);
  const py = (v) => area.baixo - ((v - ylim[0]) / (ylim[1] - ylim[0])) * (area.baixo - area.topo);

  return { area, xlim, ylim, px, py };
}

export function recortar(ctx, area, aparencia, desenhar) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(
    area.esquerda - aparencia.folgaDoRecorteX,
    area.topo - aparencia.folgaDoRecorteY,
    area.direita - area.esquerda + aparencia.folgaDoRecorteX * 2,
    area.baixo - area.topo + aparencia.folgaDoRecorteY * 2
  );
  ctx.clip();
  desenhar();
  ctx.restore();
}
