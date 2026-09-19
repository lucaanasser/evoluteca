export const paginasDoSite = [
  { nome: "Início", arquivo: "index.html" },
  { nome: "Simuladores", arquivo: "catalogo.html" },
];

export function enderecoDaPagina(arquivo) {
  return new URL(`../../../${arquivo}`, import.meta.url).href;
}
