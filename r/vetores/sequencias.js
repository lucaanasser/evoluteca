/* No R: ?seq */

export function seq(from, to, by) {
  const passo = by ?? (to >= from ? 1 : -1);
  if (passo === 0 || (to - from) / passo < 0) {
    throw new Error(`seq: com by = ${passo} não se chega de ${from} a ${to}.`);
  }
  const n = Math.floor((to - from) / passo + 1e-10);
  return Array.from({ length: n + 1 }, (_, i) => from + i * passo);
}
