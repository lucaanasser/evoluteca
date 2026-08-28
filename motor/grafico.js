function cores() {
  const estilo = getComputedStyle(document.documentElement);
  const v = (nome, padrao) => (estilo.getPropertyValue(nome) || padrao).trim();
  return {
    foco: v("--navy", "#142560"),
    feixe: v("--teal", "#1094ab"),
    grade: v("--borda", "#e5e5e5"),
    eixo: v("--tinta-suave", "#6b6b6b"),
    fonte: `12px ${v("--fonte", "sans-serif")}`,
  };
}

function preparar(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const largura = canvas.clientWidth || 600;
  const altura = canvas.clientHeight || 400;
  canvas.width = Math.round(largura * dpr);
  canvas.height = Math.round(altura * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, largura, altura);
  return { ctx, largura, altura };
}

function marcas(min, max, alvo) {
  const mag = 10 ** Math.floor(Math.log10((max - min) / alvo || 1));
  const passo =
    [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => (max - min) / p <= alvo) || mag * 10;
  const v = [];
  for (let t = Math.ceil(min / passo) * passo; t <= max + 1e-9; t += passo) v.push(+t.toFixed(10));
  return v;
}

function texto(x) {
  if (Math.abs(x) >= 1000) return x.toLocaleString("pt-BR");
  return (+x.toFixed(4)).toString().replace(".", ",");
}

function eixos(ctx, area, xlim, ylim, rotulos, C) {
  ctx.font = C.fonte;
  ctx.lineWidth = 1;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const m of marcas(ylim[0], ylim[1], 5)) {
    const y = area.base - ((m - ylim[0]) / (ylim[1] - ylim[0])) * (area.base - area.topo);
    ctx.strokeStyle = C.grade;
    ctx.beginPath();
    ctx.moveTo(area.esquerda, y);
    ctx.lineTo(area.direita, y);
    ctx.stroke();
    ctx.fillStyle = C.eixo;
    ctx.fillText(texto(m), area.esquerda - 8, y);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = C.eixo;
  for (const m of marcas(xlim[0], xlim[1], 6)) {
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

export function desenharLinhas(canvas, series, opcoes) {
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
