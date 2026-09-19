import { listrasDaUsp } from "../componentes/moldura-do-site/listras-da-usp.js";
import { barraDeLogos } from "../componentes/moldura-do-site/barra-de-logos.js";
import { cabecalhoDoSite } from "../componentes/moldura-do-site/cabecalho-do-site.js";
import { rodapeDoSite } from "../componentes/moldura-do-site/rodape-do-site.js";

export function montarMoldura() {
  document.body.prepend(...listrasDaUsp(), barraDeLogos(), cabecalhoDoSite());
  document.body.append(rodapeDoSite());
}
