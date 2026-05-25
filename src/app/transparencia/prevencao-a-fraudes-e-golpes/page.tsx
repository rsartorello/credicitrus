import React from 'react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import InfoCard from '@/components/ui/InfoCard';
import OptimizedImage from '@/components/ui/OptimizedImage';
import VideoCard from '@/components/ui/VideoCard';

const protectionTips = [
  "Desconfie de urgências: pressão para decidir na hora é indicativo de golpe.",
  "Não compartilhe senhas, códigos de SMS, token ou dados completos do cartão.",
  "Cheque o remetente em e-mails/SMS/WhatsApp e nunca clique em links suspeitos.",
  "Não realize movimentações utilizando redes wi-fi de locais públicos.",
  "Não faça transações bancárias emprestando dinheiro para conhecidos após o recebimento de mensagens de texto, sem ter certeza de quem realmente é.",
  "Sempre ative a confirmação em duas etapas para transações e contas em redes sociais",
  "Se entrarem em contato em nome da Credicitrus ou Sicoob procure o gerente de sua conta ou uma agência física.",
  "Acesse o site pelo endereço oficial digitando no navegador; evite links encurtados.",
  "Use o app oficial do Sicoob e ative alertas de transação quando possível."
];

const videos = [
  { url: 'https://www.youtube.com/watch?v=5TIIrg-fnbU', alt: 'Golpe | Motoboy' },
  { url: 'hhttps://www.youtube.com/watch?v=gl4IVpkDjzI', alt: 'Fraude' },
  { url: 'https://www.youtube.com/watch?v=f-hNb16pYCY', alt: 'Golpe | WhatsApp' },
  { url: 'https://www.youtube.com/watch?v=z5wuW5cbHJ4', alt: 'Golpe | Mão Fantasma' }
];

export default function PrevencaoFraudesGolpesPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero Section */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-prevencao-a-fraudes-e-golpes.jpg"
          titleLines={["PREVENÇÃO A", "FRAUDES E GOLPES"]}
          highlightIndices={[1]}
          buttons={[]}
        />

        {/* 2. Atenção e Selo */}
        <Section background="gray" padding="lg">
          <Container>
            {/* Top Texts */}
            <SectionHeader
              title={
                <>
                  Atenção: a Credicitrus não realiza ligações a partir de<br className="hidden md:block" />
                  números 0800 pedindo dados, senhas ou códigos.
                </>
              }
              description={
                <>
                  Em caso de dúvida, consulte sempre os canais oficiais da Credicitrus/Sicoob<br className="hidden md:block" />
                  (Central, SAC e Ouvidoria)
                </>
              }
              titleClassName="text-[1.8rem] md:text-[2rem] lg:text-[2rem]"
              descriptionClassName="text-lg md:text-xl"
              className="mb-16 md:mb-24"
            />

            {/* Selo e Texto */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-4xl mx-auto">
              <div className="w-full md:w-auto flex justify-center">
                <OptimizedImage
                  src="/soltas/1-prevencao-fraudes.png"
                  alt="Selo de Prevenção a Fraudes"
                  width={180}
                  height={250}
                  containerClassName="w-[180px]"
                />
              </div>
              <div className="w-full md:w-auto text-center md:text-left flex flex-col justify-center py-2">
                <p className="text-primary text-lg lg:text-xl font-normal leading-[1.8]">
                  Na Credicitrus, a prevenção a fraudes é<br className="hidden md:block" />
                  prioridade. Em outubro de 2024, a CNF,<br className="hidden md:block" />
                  em conjunto com a Febraban, lançou o<br className="hidden md:block" />
                  Selo de Prevenção a Fraudes, e nós<br className="hidden md:block" />
                  estamos entre as instituições certificadas,<br className="hidden md:block" />
                  com reconhecimento a processos<br className="hidden md:block" />
                  eficientes de prevenção, conscientização<br className="hidden md:block" />
                  dos cooperados e governança de<br className="hidden md:block" />
                  segurança.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Como se proteger */}
        <Section padding="lg">
          <Container>
            <SectionHeader
              title="Como se proteger dos golpes e fraudes"
              titleClassName="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-12"
            />

            <div className="flex flex-col gap-4 max-w-5xl mx-auto items-center">
              {protectionTips.map((tip, idx) => (
                <InfoCard
                  key={idx}
                  description={tip}
                  rounded="full"
                  className="w-full py-4 px-6 md:px-10 min-h-[100px] md:min-h-[110px] items-center text-center justify-center"
                  variant="gray"
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Vídeos */}
        <Section background="primary" padding="lg">
          <Container>
            <SectionHeader
              title="Assista aos vídeos e conheça alguns golpes"
              variant="white"
              titleClassName="text-lg md:text-xl lg:text-2xl font-normal mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {videos.map((video, idx) => (
                <VideoCard key={idx} url={video.url} alt={video.alt} />
              ))}
            </div>
          </Container>
        </Section>

        {/* 5. Central de Atendimento */}
        <Section padding="xl">
          <Container>
            <SectionHeader
              title="Central de atendimento"
              description={
                <>
                  <p className="mb-8">
                    Se você suspeita que tenha sofrido um golpe ou uma fraude <br className="hidden md:block" />
                    entre em contato com a gente.
                  </p>
                  <p>
                    Após o horário comercial (08h às 17:30h) e/ou finais de semana, <br className="hidden md:block" />
                    gentileza acionar o SAC 24h para tratativa, através dos contatos:
                  </p>
                </>
              }
              titleClassName="text-3xl md:text-4xl lg:text-5xl mb-12"
              descriptionClassName="text-lg md:text-xl lg:text-2xl mb-12"
            />

            <div className="grid grid-cols-2 gap-4 md:gap-10 max-w-3xl mx-auto max-w-[40rem]">
              <InfoCard
                title="Engenharia Social"
                description="Golpes que são aplicados por terceiros, com o auxílio da própria vítima."
                className="w-full"
                footer={
                  <div>
                    <p className="text-primary font-bold text-sm md:text-base">0800 724 4420</p>
                    <p className="text-primary font-normal text-sm md:text-base">(Opção 5 – Contestação)</p>
                  </div>
                }
              />

              <InfoCard
                title="Cartão"
                className="w-full"
                footer={
                  <div>
                    <p className="text-primary font-bold text-sm md:text-base">0800 724 4420</p>
                    <p className="text-primary font-normal text-sm md:text-base">(Opção 1 – Cartão)</p>
                  </div>
                }
              />
            </div>
          </Container>
        </Section>

      </main>
      <Rodape />
    </div>
  );
}
