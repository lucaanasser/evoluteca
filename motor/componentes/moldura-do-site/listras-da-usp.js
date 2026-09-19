import { criar } from "../criar-elemento.js";

export function listrasDaUsp() {
  return [criar("div", { class: "listra-superior" }), criar("div", { class: "listra-inferior" })];
}
