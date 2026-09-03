export function lerVariaveis(mapa) {
  const estilo = getComputedStyle(document.documentElement);
  const valores = {};
  for (const [chave, nome] of Object.entries(mapa)) {
    valores[chave] = estilo.getPropertyValue(nome).trim();
  }
  return valores;
}

export function lerNumeros(mapa) {
  const valores = lerVariaveis(mapa);
  for (const chave of Object.keys(valores)) valores[chave] = +valores[chave];
  return valores;
}
