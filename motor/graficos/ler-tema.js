import { lerVariaveis, lerNumeros } from "../../tema/__entrada__.js";

export function lerTema() {
  return {
    ...lerVariaveis({
      fonte: "--grafico-fonte",
      focoCor: "--grafico-foco-cor",
      feixeCor: "--grafico-feixe-cor",
      gradeCor: "--grafico-grade-cor",
      eixoCor: "--grafico-eixo-cor",
    }),
    ...lerNumeros({
      focoLinha: "--grafico-foco-linha",
      feixeLinha: "--grafico-feixe-linha",
      feixeLinhaDenso: "--grafico-feixe-linha-denso",
      feixeOpacidade: "--grafico-feixe-opacidade",
      feixeOpacidadeDenso: "--grafico-feixe-opacidade-denso",
      gradeLinha: "--grafico-grade-linha",
    }),
  };
}
