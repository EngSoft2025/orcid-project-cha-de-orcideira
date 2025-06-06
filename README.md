# Chá de Orcideira

## Equipe

- **Rodrigo Rodrigues de Castro** – 13695362
- **Marcus Vinicius da Silva** – 13833150
- **Breno Gonçalves Rodrigues** – 11734142
- **Oliver Kenzo Kobayashi** – 13676930
- **Henrique de Oliveira Araujo** – 13863950

##
## Descrição do Projeto

**Chá de Orcideira** é um sistema web voltado tanto para pesquisadores quanto para o público geral, com foco em acompanhamento acadêmico e divulgação científica. O projeto oferece:

- **Para usuários cadastrados (pesquisadores e afins):**

  - Área pessoal com estatísticas de produção acadêmica, como:
    - Artigos publicados por ano;
    - Citações recebidas;
    - Indicadores de impacto.
  - Recomendações de *Hot Papers* (artigos em alta na área de interesse).
  - Sugestões de periódicos adequados para submissão de trabalhos.
  - Notificações automáticas quando os trabalhos forem citados.

  O cadastro e login são realizados via **ORCID**, garantindo autenticidade e segurança.
- **Para o público geral:**

  - Ferramenta de busca para obter informações sobre pesquisadores e áreas de estudo;
  - Acesso a dados como artigos relevantes, pesquisadores em destaque e periódicos influentes.

A plataforma realiza integrações automáticas com serviços como **Scopus** para garantir dados atualizados e confiáveis. Todo o sistema é desenvolvido com foco em uma interface intuitiva, responsiva e segura.

## Requisitos Técnicos

- **Frontend:**

  - React.js (ou Vue.js) + TypeScript para criação de interfaces dinâmicas e responsivas.
- **Backend:**

  - Node.js para implementação da lógica de negócios e desenvolvimento de APIs.
- **Banco de Dados:**

  - PostgreSQL (banco relacional) para armazenamento de dados estruturados.
- **Autenticação:**

  - OAuth 2.0 via ORCID para autenticação e validação de identidade.
- **Integrações:**

  - API do **Scopus**: coleta de estatísticas sobre artigos e citações.
  - API do **ORCID**: autenticação e sincronização de dados do usuário.

## Controle de Versionamento

O versionamento do projeto seguirá o modelo **Git Flow**, com as seguintes práticas:

- Uso das branches:
  - `main` (produção)
  - `develop` (desenvolvimento)
- Commits padronizados com prefixos como:
  - `feat/` para novas funcionalidades;
  - `fix/` para correções de bugs.
    nsistência e qualidade do código.
- Todas as alterações passam por validação na branch `develop` antes de serem mescladas à branch `main`.
