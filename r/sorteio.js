/* O sorteio é um só, como no R: o motor põe a semente e conta quantos valores saíram. */

import * as nmath from "../externo/libRmath/libRmath.esm.js";

let sorteios = 0;

const reciclado = (arg, i) => (Array.isArray(arg) ? arg[i % arg.length] : arg);

export function set_seed(semente) {
  nmath.setSeed(semente);
}

export function zerarContagem() {
  sorteios = 0;
}

export function sorteiosFeitos() {
  return sorteios;
}

export function sortearNVezes(sortearUm) {
  return (n, ...args) => {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error(`O primeiro argumento é quantos valores sortear, e veio ${n}.`);
    }
    sorteios += n;
    if (n === 1) return sortearUm(...args.map((a) => reciclado(a, 0)));
    return Array.from({ length: n }, (_, i) => sortearUm(...args.map((a) => reciclado(a, i))));
  };
}
