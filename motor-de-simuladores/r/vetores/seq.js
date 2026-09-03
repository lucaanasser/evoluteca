export function seq(de, ate, passo = 1) {
  const v = [];
  const n = Math.floor((ate - de) / passo + 1e-9);
  for (let i = 0; i <= n; i++) v.push(de + i * passo);
  return v;
}
