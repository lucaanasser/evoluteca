import { rnorm } from "./distribuicao-normal.js";

export function rbinom(n, p, gerador) {
  if (p <= 0) return 0;
  if (p >= 1) return n;
  if (n <= 256) {
    let k = 0;
    for (let i = 0; i < n; i++) if (gerador() < p) k++;
    return k;
  }
  const k = Math.round(rnorm(n * p, Math.sqrt(n * p * (1 - p)), gerador));
  return Math.max(0, Math.min(n, k));
}
