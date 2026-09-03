import { ticks, texto } from "./ticks-do-eixo.js";

export function eixos(ctx, area, xlim, ylim, rotulos, tema) {
  ctx.font = tema.fonte;
  ctx.lineWidth = tema.gradeLinha;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const m of ticks(ylim[0], ylim[1], 5)) {
    const y = area.base - ((m - ylim[0]) / (ylim[1] - ylim[0])) * (area.base - area.topo);
    ctx.strokeStyle = tema.gradeCor;
    ctx.beginPath();
    ctx.moveTo(area.esquerda, y);
    ctx.lineTo(area.direita, y);
    ctx.stroke();
    ctx.fillStyle = tema.eixoCor;
    ctx.fillText(texto(m), area.esquerda - 8, y);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = tema.eixoCor;
  for (const m of ticks(xlim[0], xlim[1], 6)) {
    const x =
      area.esquerda + ((m - xlim[0]) / (xlim[1] - xlim[0])) * (area.direita - area.esquerda);
    ctx.fillText(texto(m), x, area.base + 8);
  }

  ctx.fillText(rotulos.x, area.esquerda + (area.direita - area.esquerda) / 2, area.base + 27);
  ctx.save();
  ctx.translate(13, area.topo + (area.base - area.topo) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(rotulos.y, 0, 0);
  ctx.restore();
}
