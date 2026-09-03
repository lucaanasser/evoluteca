import { lerTema } from "../ler-tema.js";
import { preparar, eixos } from "../bases/__entrada__.js";

export function linhas(canvas, series, opcoes) {
  const tema = lerTema();
  const { ctx, largura, altura } = preparar(canvas);

  const geracoes = Math.max(1, Math.max(...series.map((s) => s.length)) - 1);
  const area = { esquerda: 54, direita: largura - 16, topo: 18, base: altura - 50 };
  const xlim = [0, geracoes];
  const ylim = opcoes.ylim;

  eixos(ctx, area, xlim, ylim, opcoes, tema);

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
  ctx.strokeStyle = tema.feixeCor;
  ctx.globalAlpha = muitas ? tema.feixeOpacidadeDenso : tema.feixeOpacidade;
  ctx.lineWidth = muitas ? tema.feixeLinhaDenso : tema.feixeLinha;
  for (let k = 1; k < series.length; k++) tracar(series[k]);

  ctx.globalAlpha = 1;
  ctx.lineWidth = tema.focoLinha;
  ctx.strokeStyle = tema.focoCor;
  tracar(series[0]);

  ctx.restore();
}
