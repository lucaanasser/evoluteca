/* rbinom(n, size, prob), na ordem do R: n é quantos sorteios. */

import * as nmath from "../../externo/libRmath/libRmath.esm.js";
import { sortearNVezes } from "../sorteio.js";

export const rbinom = sortearNVezes((size, prob) => nmath.rbinomOne(size, prob));
