# Guia de Estilo (Style Guide)

Este documento centraliza as diretrizes de design e estilo para o projeto, garantindo consistência visual e de código.

## 1. Tipografia

- **Fonte Principal:** Montserrat
- **Tamanhos de Fonte (em `pt` ou `px`):**
  - H1 (Titulo Banner): `52pt`
  - H2 (Titulo Sessao): `52pt`
  - H3 (Subtitulo): `30,50pt`
  - H4 (Nome Sessao): `20pt`
  - Padrão: `30pt` (Peso: Regular)
  - **Pesos da Fonte:**
  - Light: `300`
  - Regular: `400`
  - Medium: `500`
  - SemiBold: `600`
  - Bold: `700`
  - ExtraBold: `800`
  
**Conversão e Aplicação no Tailwind:**
- O tamanho de fonte original deve ser convertido proporcionalmente em relação ao layout base (2912px).
- Após o cálculo, deve-se buscar uma classe nativa do Tailwind (ex: `text-xl`, `text-2xl`) que mais se aproxime do valor.
- Caso o valor seja muito específico, utilizar classes arbitrárias (ex: `text-[28px]`) ou criar uma classe personalizada.
- Toda aplicação de tamanhos deve prever responsividade utilizando os prefixos nativos (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).


## 2. Cores

- **Paleta de Cores:**
  - Primaria: `#003641`
  - Secundaria: `#359e91`
  - VerdeCredicitrus: `#8fb534`
- **Cores de Texto:**
  - Padrão: `003641`
- **Cores de Fundo:**
  - Principal: `#ffffff`


## 3. Estrutura e Espaçamento

- **Regra de Proporção de Layout:** O layout de referência está em **2912px** de largura. Todas as imagens, tamanhos, espaçamentos, margens e posições devem ser proporcionais ao container máximo do Tailwind.
  - *Cálculo da Escala:* Multiplicar a medida original por `(Largura do Container / 2912)`.
  - *Exemplo:* Para um container máximo de `1920px`, aplica-se uma escala de aproximadamente `66%` (`1920 / 2912 = 0.659`), ou `64%` caso o cálculo considere margens de segurança.
- **Responsividade (Margens e Containers):** As margens e containers deverão seguir a responsividade do Tailwind, deixando ele aplicar os melhores valores para cada resolução. Sempre utilizando as classes já existentes (padrões).
- **Largura Máxima do Container:** O container (`.container`) acompanha os breakpoints padrões do Tailwind:
  - `sm` (640px): `max-width: 640px`
  - `md` (768px): `max-width: 768px`
  - `lg` (1024px): `max-width: 1024px`
  - `xl` (1280px): `max-width: 1280px`
  - `2xl` (1536px): `max-width: 1536px`
- **Escala de Espaçamento (se aplicável):**
  - Ex: `8px`, `16px`, `24px`, `32px`...
- **Padrões Condicionais (Fallback):**
  - Se não for solicitada ou não for passada uma cor, atribua a **cor de texto padrão** (`#003641`).
  - Se não for informado o peso da fonte, aplique o padrão que será **Regular** (`400`).

## 4. Componentes Específicos

- **Títulos (Headings):**
  - **H2 (Título de Sessão):** Padrão estabelecido com tamanho de fonte `52pt` (sujeito à regra de proporção), peso **ExtraBold** (`800`) e cor **Primária** (`#003641`).
  - **H3 (Subtítulo):** Padrão estabelecido com tamanho de fonte `30,50pt` (sujeito à regra de proporção), peso **Bold** (`700`) e cor **Secundária** (`#359e91`).
  - **H4 (Nome Sessão):** Padrão estabelecido com tamanho de fonte `20pt` (sujeito à regra de proporção), peso **Medium** (`500`) e cor **VerdeCredicitrus** (`#8fb534`).

- **Sliders (Swipe):**
  - Sempre que um "slider" for solicitado, refere-se ao comportamento de "swipe" (ex: utilização da biblioteca Swiper ou similar nativo).
  - **Navegação Personalizada:** A navegação dos slides é customizada. As setas e linhas (paginação) ficam sempre posicionadas **abaixo** das imagens do slide, e não sobrepostas. Essa regra deve ser aplicada a qualquer componente que possua um slider.

- **Cards:**
  - **Comportamento de Hover:** Sempre que existir um card no layout, o comportamento de `hover` deverá incluir uma sombra projetada na cor `#201c1c` com `15%` de opacidade.
  - *Nota:* A sombra deve ser aplicada **somente** no estado de `hover`. Não aplicar sombra no estado padrão (default) a menos que isso exista explicitamente no layout enviado.

- **Botões:**
  - **Padrão:** O background (fundo) inicial é a cor **secundária**. No estado de `hover`, o background muda para a cor **primária**.
  - **Invertido:** Quando solicitado um botão invertido, a ordem se inverte: o background inicial é a cor **primária** e, no estado de `hover`, passa a ser a cor **secundária**.

## 5. Assets e Imagens

- **Repositório de Origem:** As imagens individuais originais do layout ficam armazenadas na pasta **`soltas`**.
- **Uso na Aplicação:** As imagens que forem efetivamente utilizadas na construção de um componente ou página deverão ser **copiadas para a pasta `public`**.
- **Organização/Nomenclatura:** Ao copiar para a `public`, deve-se organizá-las ou renomeá-las de preferência utilizando o nome do componente ou da página correspondente (ex: `/public/header/logo.png` ou `/public/home-hero-bg.png`).

## 6. Notas Adicionais do Projeto
- **Menu e Campo de Busca:** A construção do campo de busca e do menu principal do Header foi definida para ser abordada em um momento posterior, após as definições iniciais de tipografia e estrutura.
