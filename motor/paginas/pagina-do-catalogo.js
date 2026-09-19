import { tituloDaPagina } from "../componentes/comuns/titulo-da-pagina.js";
import { cartaoDoCatalogo, listaDeCartoes } from "../componentes/catalogo/cartao-do-catalogo.js";
import { carregarModelo, enderecoDoSimulador } from "./abrir-simulador.js";

export async function montarCatalogo(raiz, catalogo) {
  const modelos = await Promise.all(catalogo.map(carregarModelo));

  raiz.append(
    tituloDaPagina({ titulo: "Simuladores" }),
    listaDeCartoes(
      modelos.map(({ ficha }, i) =>
        cartaoDoCatalogo({
          titulo: ficha.titulo,
          resumo: ficha.resumo,
          endereco: enderecoDoSimulador(catalogo[i]),
        })
      )
    )
  );
}
