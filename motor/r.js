export function criarRng(semente) {
  let a = semente >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function rnorm(media = 0, dp = 1, rng) {
  const u1 = Math.max(rng(), 1e-12);
  const u2 = rng();
  return media + dp * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export function rbinom(n, p, rng) {
  if (p <= 0) return 0;
  if (p >= 1) return n;
  if (n <= 256) {
    let k = 0;
    for (let i = 0; i < n; i++) if (rng() < p) k++;
    return k;
  }
  const k = Math.round(rnorm(n * p, Math.sqrt(n * p * (1 - p)), rng));
  return Math.max(0, Math.min(n, k));
}

export function seq(de, ate, passo = 1) {
  const v = [];
  const n = Math.floor((ate - de) / passo + 1e-9);
  for (let i = 0; i <= n; i++) v.push(de + i * passo);
  return v;
}
