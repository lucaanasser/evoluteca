export function numerosRedondos(min, max, quantos) {
  const mag = 10 ** Math.floor(Math.log10((max - min) / quantos || 1));
  const passo =
    [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => (max - min) / p <= quantos) || mag * 10;
  const v = [];
  for (let t = Math.ceil(min / passo) * passo; t <= max + 1e-9; t += passo) v.push(+t.toFixed(10));
  return v;
}

export function escreverNumero(x) {
  if (Math.abs(x) >= 1000) return x.toLocaleString("pt-BR");
  return (+x.toFixed(4)).toString().replace(".", ",");
}
