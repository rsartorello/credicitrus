import Hero from "@/components/Hero/Hero";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import StatsSection from "@/components/StatsSection/StatsSection";
import SolucoesFinanceiras from "@/components/SolucoesFinanceiras/SolucoesFinanceiras";
import AppSicoob from "@/components/AppSicoob/AppSicoob";
import Depoimentos from "@/components/Depoimentos/Depoimentos";
import Iniciativa from "@/components/Iniciativa/Iniciativa";
import Informativo from "@/components/Informativo/Informativo";
import AcessoRapido from "@/components/AcessoRapido/AcessoRapido";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import Rodape from "@/components/Rodape/Rodape";

export default function Home() {
  return (
    <>
      <Hero
        isHome
        backgroundImage={[
          "/soltas/hero-home.webp",
          "/soltas/hero-home.webp"
        ]}
        mobileBackgroundImage={[
          "/soltas/hero-home-mobile.webp",
          "/soltas/hero-home-mobile.webp"
        ]}
        isSlider={true}
      />

      <SolucoesFinanceiras />

      <FeatureSection
        subtitle="SOBRE NÓS"
        title="Por que escolher a Credicitrus?"
        highlightText={<>MODELO<br />COOPERATIVO<br />QUE CONECTA<br />E TRANSFORMA</>}
        description="Na Credicitrus, somos muito mais que uma instituição financeira. Nosso cooperativismo coloca as pessoas no centro, valorizando cada associado e impulsionando o desenvolvimento econômico e social da sua região"
        imageSrc="/sobrenos/maos-unidas.webp"
        imageAlt="Mãos unidas, cooperativismo"
        bgColor="bg-[#ffffff]"
        reverseOnMobile={true}
      />

      <FeatureSection
        subtitle="SOBRE NÓS"
        title="Por que escolher a Credicitrus?"
        imagePosition="left"
        highlightText={<>VOCÊ,<br />ASSOCIADO,<br />É PARTE<br />ESSENCIAL<br />DO NEGÓCIO</>}
        description="Aqui, você não é apenas um cliente, é dono da cooperativa! Sua voz tem poder nas decisões, contribuindo ativamente para o direcionamento da Credicitrus e o impacto positivo na sua comunidade"
        imageSrc="/sobrenos/voce-associado.webp"
        imageAlt="Rosto de uma mulher sorrindo (Associada)"
        bgColor="bg-[#f8f8f8]"
        reverseOnMobile={true}
      />

      <FeatureSection
        subtitle="SOBRE NÓS"
        title="Por que escolher a Credicitrus?"
        highlightText={<>CRESCIMENTO<br />SUSTENTÁVEL<br />PARA A<br />ECONOMIA<br />LOCAL</>}
        description="Acreditamos no potencial da nossa comunidade. Por isso, os recursos da Credicitrus são reinvestidos localmente, fortalecendo negócios, gerando prosperidade e promovendo o desenvolvimento regional."
        imageSrc="/sobrenos/crescimento-sustentavel.webp"
        imageAlt="Empreendedora sorrindo no seu comércio local"
        bgColor="bg-white"
        reverseOnMobile={true}
      />

      <FeatureSection
        subtitle="SOBRE NÓS"
        title="Por que escolher a Credicitrus?"
        imagePosition="left"
        highlightText={<>CONFIANÇA<br />MÚTUA:<br />ATENDIMENTO<br />PRÓXIMO E<br />GENUÍNO</>}
        description="Valorizamos o contato humano. Na Credicitrus, você encontra um atendimento personalizado, feito de pessoa para pessoa, construído na confiança, no respeito e na busca pelas melhores soluções para você"
        imageSrc="/sobrenos/confianca-mutua.webp"
        imageAlt="Atendimento personalizado de confiança mútua"
        bgColor="bg-[#f8f8f8]"
        reverseOnMobile={true}
      />

      <StatsSection
        subtitle="SOBRE NÓS"
        title="Por que escolher a Credicitrus?"
        highlightTitle={"PRESENÇA\nQUE GERA VALOR"}
        cards={[
          {
            id: 'ativos',
            icon: "/soltas/icone-ativos-financeiros-00ae9d.svg",
            topText: 'Mais de',
            highlightText: '15 Bi',
            bottomText: 'em ativos\nfinanceiros',
            href: '#'
          },
          {
            id: 'cooperados',
            icon: "/soltas/icone-cooperados-00ae9d.svg",
            topText: 'Mais de',
            highlightText: '170',
            bottomText: 'mil\ncooperados',
            href: '#'
          },
          {
            id: 'cidades',
            icon: "/soltas/icone-cidades-00ae9d.svg",
            topText: 'Presente em',
            highlightText: '114',
            bottomText: 'cidades\npelo país',
            href: '#'
          },
          {
            id: 'agencias',
            icon: "/soltas/icone-agencias-00ae9d.svg",
            topText: 'Mais de',
            highlightText: '106',
            bottomText: 'agências\nno Brasil',
            href: '#'
          },
          {
            id: 'rating',
            icon: "/soltas/icone-fitch-00ae9d.svg",
            highlightText: 'AA+ (bra)',
            bottomText: 'Fitch Ratings',
            href: '#'
          }
        ]}
        description="Essa posição de destaque reforça nosso compromisso em transformar recursos em prosperidade, beneficiando associados e impulsionando as economias locais."
        buttonText="Conheça todos os diferenciais"
        buttonHref="#"
      />

      <AppSicoob withSejaAssociado={true} />
      <Depoimentos />
      <Iniciativa />
      <Informativo />
      <AcessoRapido />
      <SejaAssociado withAppSicoob={true} />
      <Rodape />
    </>
  );
}
