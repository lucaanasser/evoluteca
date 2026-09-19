export const linhas = {
  plano: "cartesiana",

  serie({ ctx, px, py }, serie) {
    ctx.beginPath();
    ctx.moveTo(px(serie.x[0]), py(serie.y[0]));
    for (let i = 1; i < serie.y.length; i++) ctx.lineTo(px(serie.x[i]), py(serie.y[i]));
    ctx.stroke();
  },
};
