export function preparar(canvas) {
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
