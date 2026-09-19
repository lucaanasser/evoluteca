import { criar } from "../criar-elemento.js";
import { paginasDoSite, enderecoDaPagina } from "./paginas-do-site.js";

function arquivoAberto() {
  const caminho = window.location.pathname;
  return caminho.endsWith("/") ? "index.html" : caminho.split("/").pop();
}

export function menuDoSite() {
  const aberto = arquivoAberto();

  return criar(
    "nav",
    { class: "menu-do-site", "aria-label": "Páginas do site" },
    ...paginasDoSite.map(({ nome, arquivo }) =>
      criar("a", {
        class: "item-do-menu",
        href: enderecoDaPagina(arquivo),
        texto: nome,
        "aria-current": arquivo === aberto ? "page" : false,
      })
    )
  );
}
