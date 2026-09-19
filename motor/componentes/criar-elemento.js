/* criar("a", { class: "x", href: "y", texto: "z" }, ...filhos) */

export function criar(tag, atributos = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [chave, valor] of Object.entries(atributos)) {
    if (valor === undefined || valor === null || valor === false) continue;
    if (chave === "texto") n.textContent = valor;
    else n.setAttribute(chave, valor === true ? "" : valor);
  }
  n.append(...filhos.filter((f) => f !== null && f !== undefined));
  return n;
}
