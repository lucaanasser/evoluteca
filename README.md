# Evoluteca

Projeto de extensão do para o Ciclo Avancado do curso de Ciencias Moleculares USP

Para rodar localmente:

    python3 -m http.server 8000

## Pastas

| Pasta | O que tem |
|---|---|
| `simuladores/` | Um simulador por pasta, com o modelo em `modelo.js`. A lista de modelos está em `catalogo.js`. |
| `r/` | Funções do R para escrever simuladores. |
| `aparencia/` | Todo o visual. Cor, medida e fonte. |
| `motor/` | Transforma um simulador em página.  |
| `externo/` | [libRmath.js](https://github.com/R-js/libRmath.js). |
| `ferramentas/`, `r/testes/` | Para testes e manutencao no futuro |

`__pacote__` é o arquivo que reúne o que uma pasta oferece para fora.
