export function rnorm(media = 0, dp = 1, gerador) {
  const u1 = Math.max(gerador(), 1e-12);
  const u2 = gerador();
  return media + dp * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
