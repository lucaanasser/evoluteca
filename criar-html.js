export function criar(tag, atributos = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [chave, valor] of Object.entries(atributos)) {
    if (chave === "texto") n.textContent = valor;
    else n.setAttribute(chave, valor);
  }
  n.append(...filhos);
  return n;
}
