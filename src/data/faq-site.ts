export type FaqEntry = {
  question: string;
  /** Texto puro para schema GEO / citação por IA. */
  answerText: string;
};

/** FAQ canônico do site (fonte única para UI + FAQPage JSON-LD). */
export const SITE_FAQ: FaqEntry[] = [
  {
    question: "O que é a Credicitrus?",
    answerText:
      "A Credicitrus é uma cooperativa de crédito de livre admissão, com portfólio completo de produtos e serviços financeiros para pessoas físicas, empresas e também para o agro. Quem se associa torna-se cooperado e parte do negócio.",
  },
  {
    question: "Como faço para me associar e abrir a conta?",
    answerText:
      "Para se associar, basta abrir sua conta através do nosso aplicativo ou em uma de nossas agências, apresentando seus documentos pessoais e comprovantes de renda/residência.",
  },
  {
    question: "Quais são meus direitos e deveres como cooperado?",
    answerText:
      "Como dono do negócio, você tem direito de votar nas assembleias, participar das sobras e acessar todos os nossos produtos e serviços. O dever principal é integralizar suas quotas-partes e participar ativamente da cooperativa.",
  },
  {
    question: "Qual é a diferença entre cooperativa de crédito e banco?",
    answerText:
      'Cooperativa é sociedade de pessoas: quem se associa é dono (cooperado), decide pelo princípio "1 pessoa = 1 voto" e os resultados (sobras) podem ser reinvestidos ou distribuídos aos cooperados; banco é sociedade de capital, focada em retorno aos acionistas. Ambas são autorizadas e supervisionadas pelo Banco Central.',
  },
  {
    question: 'O que são "sobras" e como funciona a distribuição?',
    answerText:
      "Nas cooperativas financeiras, os cooperados participam dos resultados da instituição. Ao final do exercício, o resultado (as \"sobras\") pode ser reinvestido na própria cooperativa e/ou distribuído aos cooperados, conforme decisão em assembleia e regras estatutárias. Essa é uma diferença importante em relação aos bancos, onde o lucro é direcionado aos acionistas.",
  },
  {
    question: "Quais são os canais oficiais de atendimento?",
    answerText:
      "Você pode falar com a Credicitrus pelos canais oficiais: telefone (17) 3345-9000, WhatsApp (17) 3344-5020, Ouvidoria 0800 770 6883, além das agências e da página Fale com a gente no site.",
  },
];
