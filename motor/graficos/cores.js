export function cores() {
  const estilo = getComputedStyle(document.documentElement);
  const v = (nome, padrao) => (estilo.getPropertyValue(nome) || padrao).trim();
  return {
    foco: v("--navy", "#142560"),
    feixe: v("--teal", "#1094ab"),
    grade: v("--borda", "#e5e5e5"),
    eixo: v("--tinta-suave", "#6b6b6b"),
    fonte: `12px ${v("--fonte", "sans-serif")}`,
  };
}
