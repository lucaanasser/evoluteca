/* Controle: (parametro, valorInicial, aoMudar) → { id, controle, mostrador }. */

import { criar } from "../criar-elemento.js";
import { controleDeslizante } from "./controle-deslizante.js";

const controles = { deslizante: controleDeslizante };

export function controleDeParametro(declarado, valores, aoMudar) {
  const tipo = declarado.tipo || "deslizante";
  const criarControle = controles[tipo];
  if (!criarControle) {
    throw new Error(
      `O parâmetro "${declarado.nome}" pede um controle de tipo "${tipo}", que não existe. ` +
        `Os tipos são: ${Object.keys(controles).join(", ")}.`
    );
  }

  const { id, controle, mostrador } = criarControle(declarado, valores[declarado.nome], (v) => {
    valores[declarado.nome] = v;
    aoMudar();
  });

  return criar(
    "div",
    { class: "controle-de-parametro" },
    criar("label", { for: id }, criar("span", { texto: declarado.rotulo }), mostrador),
    controle
  );
}

export function listaDeParametros(declarados, valores, aoMudar) {
  return criar(
    "div",
    { class: "lista-de-parametros" },
    ...declarados.map((p) => controleDeParametro(p, valores, aoMudar))
  );
}
