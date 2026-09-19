export function prepararCanvas(tela) {
  let canvas = tela.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    tela.replaceChildren(canvas);
  }
  const dpr = window.devicePixelRatio || 1;
  const largura = tela.clientWidth;
  const altura = tela.clientHeight;
  canvas.width = Math.round(largura * dpr);
  canvas.height = Math.round(altura * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, largura, altura);
  return { ctx, largura, altura };
}

export function aplicarEstilo(ctx, estilo) {
  ctx.strokeStyle = estilo.cor;
  ctx.fillStyle = estilo.cor;
  ctx.lineWidth = estilo.largura;
  ctx.globalAlpha = estilo.opacidade;
  ctx.setLineDash([]);
}
