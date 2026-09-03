import { criar } from "../criar-elemento.js";

export function legenda(quantas) {
  const item = (classe, texto) =>
    criar("span", { class: "legenda-item" }, criar("span", { class: classe }), criar("span", { texto }));
  if (quantas === 1) return [item("marca-foco", "frequência do alelo")];
  return [
    item("marca-foco", `população em foco (1 de ${quantas})`),
    item("marca-feixe", `outras ${quantas - 1} réplicas`),
  ];
}
