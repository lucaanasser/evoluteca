import { cores } from "../cores.js";
import { preparar, eixos } from "../bases/__entrada__.js";

export function linhas(canvas, series, opcoes) {
  const C = cores();
  const { ctx, largura, altura } = preparar(canvas);

  const geracoes = Math.max(1, Math.max(...series.map((s) => s.length)) - 1);
  const area = { esquerda: 54, direita: largura - 16, topo: 18, base: altura - 50 };
  const xlim = [0, geracoes];
  const ylim = opcoes.ylim;

  eixos(ctx, area, xlim, ylim, opcoes, C);

  const px = (i) => area.esquerda + (i / geracoes) * (area.direita - area.esquerda);
  const py = (v) => area.base - ((v - ylim[0]) / (ylim[1] - ylim[0])) * (area.base - area.topo);
  const tracar = (s) => {
    ctx.beginPath();
    ctx.moveTo(px(0), py(s[0]));
    for (let i = 1; i < s.length; i++) ctx.lineTo(px(i), py(s[i]));
    ctx.stroke();
  };

  ctx.save();
  ctx.beginPath();
  ctx.rect(area.esquerda - 1, area.topo - 4, area.direita - area.esquerda + 2, area.base - area.topo + 8);
  ctx.clip();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const muitas = series.length > 4;
  ctx.strokeStyle = C.feixe;
  ctx.globalAlpha = muitas ? 0.3 : 0.75;
  ctx.lineWidth = muitas ? 1.3 : 2;
  for (let k = 1; k < series.length; k++) tracar(series[k]);

  ctx.globalAlpha = 1;
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = C.foco;
  tracar(series[0]);

  ctx.restore();
}
