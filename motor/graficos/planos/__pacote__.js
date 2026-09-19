/* Plano: { preparar, descrever, desenhar }. */

import { cartesiana } from "./cartesiana/plano.js";

const planos = {
  cartesiana: async () => cartesiana,
};

export async function carregarPlano(nome) {
  if (!planos[nome]) {
    throw new Error(`O plano "${nome}" não existe. Os planos são: ${Object.keys(planos).join(", ")}.`);
  }
  return planos[nome]();
}
