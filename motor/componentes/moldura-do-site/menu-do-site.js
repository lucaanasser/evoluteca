import { criar } from "../criar-elemento.js";

const paginas = [
  { nome: "Início", arquivo: "index.html" },
  { nome: "Simuladores", arquivo: "catalogo.html" },
];

const endereco = (arquivo) => new URL(`../../../${arquivo}`, import.meta.url).href;

function arquivoAberto() {
  const caminho = window.location.pathname;
  return caminho.endsWith("/") ? "index.html" : caminho.split("/").pop();
}

export function menuDoSite() {
  const aberto = arquivoAberto();

  return criar(
    "nav",
    { class: "menu-do-site", "aria-label": "Páginas do site" },
    ...paginas.map(({ nome, arquivo }) =>
      criar("a", {
        class: "item-do-menu",
        href: endereco(arquivo),
        texto: nome,
        "aria-current": arquivo === aberto ? "page" : false,
      })
    )
  );
}
