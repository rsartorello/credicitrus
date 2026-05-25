'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import ResourceGrid from "@/components/ResourceGrid/ResourceGrid";
import Faq from "@/components/Faq/Faq";

export default function RelatoriosCredicitrus2Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-seguranca-e-privacidade.jpg"
          titleLines={["RELATÓRIOS", "CREDICITRUS"]}
          highlightIndices={[1]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[]}
        />

        {/* 2. Segurança da Informação */}
        <ResourceGrid
          eyebrow="SEGURANÇA DA INFORMAÇÃO"
          description="A Segurança da Informação é constituída por um conjunto de controles, incluindo política, processos, estruturas organizacionais, normas e procedimentos de segurança. Objetiva a proteção das informações, nos seus aspectos de confidencialidade, integridade e disponibilidade."
          cards={[
            { title: "Resumo da\nPolítica de\nSegurança\nCibernética", href: "/files/transparencia/seguranca-e-privacidade/Resumo-da-Politica-de-Seguranca-Cibernetica.pdf" },
            { title: "Código de\nConduta Ética,\nde Segurança\nda Informação...", href: "/files/transparencia/seguranca-e-privacidade/Codigo-de-Conduta-Etica_-de-Seguranca-da-Informacao-e-Seguranca-Cibernetica-para-terceiros-e-prestadores-de-servicos-22-4.pdf" },
            { title: "Dicas de\nSegurança", href: "https://www.sicoob.com.br/web/sicoob/dicas-seguranca" },
            { title: "Fraudes e\nGolpes", href: "/transparencia/prevencao-a-fraudes-e-golpes" }
          ]}
        />

        {/* 3. Privacidade */}
        <ResourceGrid
          eyebrow="PRIVACIDADE"
          description="Aqui você encontrará informações sobre como coletamos e utilizamos os seus dados. Por isso, preparamos este portal para você estar por dentro de como a Sicoob Credicitrus cuida dos dados e de toda a segurança da informação."
          cards={[
            { title: "Política de\nPrivacidade e\nTratamento\nde Dados", href: "/files/transparencia/seguranca-e-privacidade/Politica-de-Privacidade-e-Tratamento-de-Dados-608.pdf" },
            { title: "Termos e\nCondições de\nUso do Site", href: "/files/transparencia/seguranca-e-privacidade/Termos-e-condicoes-de-uso-do-site-institucional-da-Sicoob-Credicitrus-439.pdf" },
            { title: "Lei 13.709/2020\nLei Geral\nde Proteção\nde Dados", href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm" }
          ]}
        />

        {/* 4. FAQ */}
        <Faq
          subtitle="FAQ"
          title={"Ficou com alguma dúvida sobre\nsegurança e privacidade de dados?"}
          sectionBgClass="bg-white"
          itemBgClass="bg-[#f8f9fa]"
          items={[
            {
              question: "O que é a Lei Geral de Proteção de Dados (LGPD)?",
              answer: ""
            },
            {
              question: "O que são dados pessoais?",
              answer: "É qualquer informação que possa levar à identificação de uma pessoa natural (pessoa física), como por exemplo nome completo, documento de identidade, endereço, filiação, dentre outros."
            },
            {
              question: "O que são dados pessoais sensíveis?",
              answer: "São informações as quais a LGPD conferiu ainda maior proteção por estarem relacionados aos aspectos mais íntimos da personalidade de um indivíduo como aqueles relativos à origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dados referentes à saúde ou à vida sexual, dados genéticos ou biométricos, quando vinculados a uma pessoa natural."
            },
            {
              question: "Quais os seus direitos perante a LGPD?",
              answer: (
                <>
                  – Acessar, requisitar e receber os seus dados pessoais;<br />
                  – Solicitar a correção dos seus dados pessoais;<br />
                  – Requerer a anonimização, bloqueio ou exclusão de dados desnecessários, excessivos ou tratados em desconformidade com o disposto na LGPD;<br />
                  – Compartilhar os dados a outro fornecedor de serviço ou produto, mediante requisição expressa.<br /><br />
                  Para exercer seus direitos previstos na LGPD (art. 18)
                </>
              )
            },
            {
              question: "Como o titular dos dados pode entrar em contato\ncom o Encarregado de Dados Pessoais?",
              answer: (
                <>
                  Para mais informações sobre o tratamento dos seus dados pessoais entre em contato conosco através do e-mail <a href="mailto:dpo@credicitrus.com.br" className="text-secondary hover:underline">dpo@credicitrus.com.br</a> ou <a href="https://www.sicoob.com.br/web/sicoob/privacidade" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">clique aqui</a>.<br /><br />
                  Encarregada pelo Tratamento de Dados Pessoais: Adrieli de Souza Freitas.
                </>
              )
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

      </main>
      <Rodape />
    </div>
  );
}
