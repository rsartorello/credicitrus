# Changelog

## [2026-03-31] - Otimização e Refatoração de Componentes

### Adicionado
- Componente `Hero.tsx` unificado que suporta colagens de imagens, títulos em blocos e botões de ação.
- Componente `Faq.tsx` genérico para todas as seções de dúvidas frequentes.
- Componente `FeatureSection.tsx` para seções de destaque com imagem alternada (ex: Sobre Nós).
- Componente `StatsSection.tsx` para exibição de indicadores e cards de presença.
- Componentes de interface base em `src/components/ui/`: `Button.tsx` e `SectionHeader.tsx`.

### Alterado
- Refatoração completa das páginas principais para utilizar componentes reutilizáveis:
  - `Home (page.tsx)`
  - `Abra sua conta`
  - `Crédito Rural`
  - `Empresa`
  - `Empréstimo`
  - `Empréstimo PJ`
  - `Fale Conosco`
  - `Investimento`
  - `Parceiro`
- Melhoria na estrutura de dados das páginas, movendo conteúdo fixo de dentro dos componentes para as rotas.
- Otimização de Server/Client Components para garantir build estático sem erros de serialização.

### Removido
- Mais de 20 diretórios de componentes redundantes:
  - Variações individuais de `Hero*` (HeroHome, HeroAbraSuaConta, etc).
  - Variações individuais de `Faq*` (FaqAbraSuaConta, FaqCreditoRural, etc).
  - Variações de `SobreNos1` a `SobreNos5`.

### Segurança / Performance
- Redução significativa de código duplicado e arquivos CSS fixos.
- Padronização de tags semânticas (H1, H2, H4) em todas as seções.
