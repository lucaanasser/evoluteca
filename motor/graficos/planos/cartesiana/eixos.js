import { numerosRedondos, escreverNumero } from "../../numeros.js";

export function desenharEixos(ctx, enquadramento, grafico, aparencia) {
  const { area, xlim, ylim, px, py } = enquadramento;

  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.font = aparencia.fonte;
  ctx.lineWidth = aparencia.espessuraDaGrade;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const m of numerosRedondos(ylim[0], ylim[1], aparencia.marcasNoEixoY)) {
    const y = py(m);
    ctx.strokeStyle = aparencia.corDaGrade;
    ctx.beginPath();
    ctx.moveTo(area.esquerda, y);
    ctx.lineTo(area.direita, y);
    ctx.stroke();
    ctx.fillStyle = aparencia.corDosEixos;
    ctx.fillText(escreverNumero(m), area.esquerda - aparencia.recuoDosNumerosDoY, y);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = aparencia.corDosEixos;
  for (const m of numerosRedondos(xlim[0], xlim[1], aparencia.marcasNoEixoX)) {
    ctx.fillText(escreverNumero(m), px(m), area.baixo + aparencia.recuoDosNumerosDoX);
  }

  const meioDoX = area.esquerda + (area.direita - area.esquerda) / 2;
  ctx.fillText(grafico.x.rotulo, meioDoX, area.baixo + aparencia.recuoDoRotuloDoX);
  ctx.save();
  ctx.translate(aparencia.recuoDoRotuloDoY, area.topo + (area.baixo - area.topo) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(grafico.y.rotulo, 0, 0);
  ctx.restore();
}
