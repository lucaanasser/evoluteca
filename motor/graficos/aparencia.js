/* Lê aparencia/variaveis/. Nenhum valor visual mora no motor. */

export function lerAparencia() {
  const estilo = getComputedStyle(document.documentElement);
  const texto = (nome) => estilo.getPropertyValue(nome).trim();

  function exigido(nome, arquivo) {
    const v = texto(nome);
    if (v === "") throw new Error(`Falta a variável ${nome} em aparencia/variaveis/${arquivo}.`);
    return v;
  }
  const medida = (nome) => Number(exigido(`--grafico-${nome}`, "grafico.css"));
  const cor = (nome, arquivo = "grafico.css") => exigido(nome, arquivo);

  const densoAPartirDe = Number(texto("--camadas-denso-a-partir-de") || Infinity);

  function estiloDaCamada(nome, quantasSeries) {
    const denso = quantasSeries >= densoAPartirDe;
    const propriedade = (prop) =>
      (denso && texto(`--camada-${nome}-${prop}-densa`)) || texto(`--camada-${nome}-${prop}`);

    if (propriedade("cor") === "" || propriedade("largura") === "") {
      throw new Error(
        `O estilo de camada "${nome}" não existe. Os estilos ficam em ` +
          `aparencia/variaveis/grafico.css, e cada um precisa ao menos de cor e largura.`
      );
    }

    return {
      cor: propriedade("cor"),
      largura: Number(propriedade("largura")),
      opacidade: propriedade("opacidade") === "" ? 1 : Number(propriedade("opacidade")),
    };
  }

  return {
    estiloDaCamada,

    fonte: `${exigido("--texto-do-grafico", "tipografia.css")} ${exigido("--fonte-do-texto", "tipografia.css")}`,
    corDaGrade: cor("--grafico-cor-da-grade"),
    corDosEixos: cor("--grafico-cor-dos-eixos"),
    espessuraDaGrade: medida("espessura-da-grade"),

    margemEsquerda: medida("margem-esquerda"),
    margemDireita: medida("margem-direita"),
    margemSuperior: medida("margem-superior"),
    margemInferior: medida("margem-inferior"),
    marcasNoEixoX: medida("marcas-no-eixo-x"),
    marcasNoEixoY: medida("marcas-no-eixo-y"),
    recuoDosNumerosDoX: medida("recuo-dos-numeros-do-x"),
    recuoDosNumerosDoY: medida("recuo-dos-numeros-do-y"),
    recuoDoRotuloDoX: medida("recuo-do-rotulo-do-x"),
    recuoDoRotuloDoY: medida("recuo-do-rotulo-do-y"),
    folgaEmY: medida("folga-em-y"),
    folgaDoRecorteX: medida("folga-do-recorte-x"),
    folgaDoRecorteY: medida("folga-do-recorte-y"),
  };
}
