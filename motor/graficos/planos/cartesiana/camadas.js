/* Uma série pode vir como [y, ...], como { x, y } ou como lista de séries. */

const indicesPorTamanho = new Map();

function indices(tamanho) {
  let v = indicesPorTamanho.get(tamanho);
  if (!v) {
    v = Array.from({ length: tamanho }, (_, i) => i);
    indicesPorTamanho.set(tamanho, v);
  }
  return v;
}

function umaSerie(valor, onde) {
  if (Array.isArray(valor)) return { x: indices(valor.length), y: valor };
  if (valor && Array.isArray(valor.y)) {
    const x = Array.isArray(valor.x) ? valor.x : indices(valor.y.length);
    if (x.length !== valor.y.length) {
      throw new Error(`${onde}: x tem ${x.length} valores e y tem ${valor.y.length}.`);
    }
    return { x, y: valor.y };
  }
  throw new Error(
    `${onde}: esperava uma lista de números ou { x, y }, e veio ${typeof valor}.`
  );
}

function series(valor, onde) {
  if (valor == null) return [];
  if (!Array.isArray(valor)) return [umaSerie(valor, onde)];
  if (valor.length === 0) return [];
  const varias = Array.isArray(valor[0]) || (valor[0] && Array.isArray(valor[0].y));
  if (!varias) return [umaSerie(valor, onde)];
  return valor.map((s, i) => umaSerie(s, `${onde}, série ${i + 1}`));
}

export function prepararCamadas(dados, grafico, tipo) {
  const nomes = Object.keys(dados || {});
  const transformar = tipo.preparar ? (s) => tipo.preparar(s, grafico) : (s) => s;

  return (grafico.camadas || []).map((camada) => {
    if (!(camada.de in (dados || {}))) {
      throw new Error(
        `A camada pede "${camada.de}", mas simular() devolveu ${
          nomes.length ? nomes.map((n) => `"${n}"`).join(", ") : "nada"
        }.`
      );
    }
    return {
      ...camada,
      series: series(dados[camada.de], `camada "${camada.de}"`).map(transformar),
    };
  });
}
