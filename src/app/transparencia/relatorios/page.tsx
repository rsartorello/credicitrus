'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import DocumentAccordion, { DocumentItem } from "@/components/DocumentAccordion/DocumentAccordion";

const reportItems: DocumentItem[] = [
  {
    title: "Relatórios Anuais",
    type: "annual",
    options: [
      { label: "2024", url: "/files/transparencia/relatorios/anuais/2024.pdf" },
      { label: "2023", url: "/files/transparencia/relatorios/anuais/2023.pdf" },
      { label: "2022", url: "/files/transparencia/relatorios/anuais/2022.pdf" },
      { label: "2021", url: "/files/transparencia/relatorios/anuais/2021.pdf" },
      { label: "2019", url: "/files/transparencia/relatorios/anuais/2019.pdf" },
      { label: "2018", url: "/files/transparencia/relatorios/anuais/2018.pdf" },
      { label: "2017", url: "/files/transparencia/relatorios/anuais/2017.pdf" },
      { label: "2016", url: "/files/transparencia/relatorios/anuais/2016.pdf" },
      { label: "2015", url: "/files/transparencia/relatorios/anuais/2015.pdf" },
      { label: "2014", url: "/files/transparencia/relatorios/anuais/2014.pdf" },
      { label: "2013", url: "/files/transparencia/relatorios/anuais/2013.pdf" },
      { label: "2012", url: "/files/transparencia/relatorios/anuais/2012.pdf" },
      { label: "2011", url: "/files/transparencia/relatorios/anuais/2011.pdf" },
      { label: "2010", url: "/files/transparencia/relatorios/anuais/2010.pdf" },
      { label: "2009", url: "/files/transparencia/relatorios/anuais/2009.pdf" },
      { label: "2008", url: "/files/transparencia/relatorios/anuais/2008.pdf" },
      { label: "2007", url: "/files/transparencia/relatorios/anuais/2007.pdf" },
      { label: "2006", url: "/files/transparencia/relatorios/anuais/2006.pdf" },
      { label: "2005", url: "/files/transparencia/relatorios/anuais/2005.pdf" },
      { label: "2004", url: "/files/transparencia/relatorios/anuais/2004.pdf" },
      { label: "2003", url: "/files/transparencia/relatorios/anuais/2003.pdf" }
    ]
  },
  {
    title: "Relatórios Semestrais",
    type: "semestral",
    options: [
      { label: "2025", year: "2025", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2025_1S.pdf" },
      { label: "2024", year: "2024", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2024_1S.pdf" },
      { label: "2023", year: "2023", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2023_1S.pdf" },
      { label: "2022", year: "2022", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2022_1S.pdf" },
      { label: "2021", year: "2021", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2021_1S.pdf" },
      { label: "2020", year: "2020", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2020_1S.pdf" },
      { label: "2019", year: "2019", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2019_1S.pdf" },
      { label: "2018", year: "2018", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2018_1S.pdf" },
      { label: "2017", year: "2017", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2017_1S.pdf" },
      { label: "2016", year: "2016", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2016_1S.pdf" },
      { label: "2015", year: "2015", semester: "1S", url: "/files/transparencia/relatorios/semestrais/2015_1S.pdf" }
    ]
  },
  {
    title: "Balancete de verificação mensal",
    type: "monthly",
    options: [
      // 2026
      { label: "2026", year: "2026", month: "01", url: "/files/transparencia/relatorios/balancetes/2026_01.pdf" },
      { label: "2026", year: "2026", month: "02", url: "/files/transparencia/relatorios/balancetes/2026_02.pdf" },
      { label: "2026", year: "2026", month: "03", url: "/files/transparencia/relatorios/balancetes/2026_03.pdf" },
      // 2025
      { label: "2025", year: "2025", month: "01", url: "/files/transparencia/relatorios/balancetes/2025_01.pdf" },
      { label: "2025", year: "2025", month: "02", url: "/files/transparencia/relatorios/balancetes/2025_02.pdf" },
      { label: "2025", year: "2025", month: "03", url: "/files/transparencia/relatorios/balancetes/2025_03.pdf" },
      { label: "2025", year: "2025", month: "04", url: "/files/transparencia/relatorios/balancetes/2025_04.pdf" },
      { label: "2025", year: "2025", month: "05", url: "/files/transparencia/relatorios/balancetes/2025_05.pdf" },
      { label: "2025", year: "2025", month: "06", url: "/files/transparencia/relatorios/balancetes/2025_06.pdf" },
      { label: "2025", year: "2025", month: "07", url: "/files/transparencia/relatorios/balancetes/2025_07.pdf" },
      { label: "2025", year: "2025", month: "08", url: "/files/transparencia/relatorios/balancetes/2025_08.pdf" },
      { label: "2025", year: "2025", month: "09", url: "/files/transparencia/relatorios/balancetes/2025_09.pdf" },
      { label: "2025", year: "2025", month: "10", url: "/files/transparencia/relatorios/balancetes/2025_10.pdf" },
      { label: "2025", year: "2025", month: "11", url: "/files/transparencia/relatorios/balancetes/2025_11.pdf" },
      { label: "2025", year: "2025", month: "12", url: "/files/transparencia/relatorios/balancetes/2025_12.pdf" },
      // 2024
      { label: "2024", year: "2024", month: "01", url: "/files/transparencia/relatorios/balancetes/2024_01.pdf" },
      { label: "2024", year: "2024", month: "02", url: "/files/transparencia/relatorios/balancetes/2024_02.pdf" },
      { label: "2024", year: "2024", month: "03", url: "/files/transparencia/relatorios/balancetes/2024_03.pdf" },
      { label: "2024", year: "2024", month: "04", url: "/files/transparencia/relatorios/balancetes/2024_04.pdf" },
      { label: "2024", year: "2024", month: "05", url: "/files/transparencia/relatorios/balancetes/2024_05.pdf" },
      { label: "2024", year: "2024", month: "07", url: "/files/transparencia/relatorios/balancetes/2024_07.pdf" },
      { label: "2024", year: "2024", month: "08", url: "/files/transparencia/relatorios/balancetes/2024_08.pdf" },
      { label: "2024", year: "2024", month: "09", url: "/files/transparencia/relatorios/balancetes/2024_09.pdf" },
      { label: "2024", year: "2024", month: "10", url: "/files/transparencia/relatorios/balancetes/2024_10.pdf" },
      { label: "2024", year: "2024", month: "11", url: "/files/transparencia/relatorios/balancetes/2024_11.pdf" },
      { label: "2024", year: "2024", month: "12", url: "/files/transparencia/relatorios/balancetes/2024_12.pdf" },
      // 2023
      { label: "2023", year: "2023", month: "01", url: "/files/transparencia/relatorios/balancetes/2023_01.pdf" },
      { label: "2023", year: "2023", month: "02", url: "/files/transparencia/relatorios/balancetes/2023_02.pdf" },
      { label: "2023", year: "2023", month: "03", url: "/files/transparencia/relatorios/balancetes/2023_03.pdf" },
      { label: "2023", year: "2023", month: "04", url: "/files/transparencia/relatorios/balancetes/2023_04.pdf" },
      { label: "2023", year: "2023", month: "05", url: "/files/transparencia/relatorios/balancetes/2023_05.pdf" },
      { label: "2023", year: "2023", month: "06", url: "/files/transparencia/relatorios/balancetes/2023_06.pdf" },
      { label: "2023", year: "2023", month: "07", url: "/files/transparencia/relatorios/balancetes/2023_07.pdf" },
      { label: "2023", year: "2023", month: "08", url: "/files/transparencia/relatorios/balancetes/2023_08.pdf" },
      { label: "2023", year: "2023", month: "09", url: "/files/transparencia/relatorios/balancetes/2023_09.pdf" },
      { label: "2023", year: "2023", month: "10", url: "/files/transparencia/relatorios/balancetes/2023_10.pdf" },
      { label: "2023", year: "2023", month: "11", url: "/files/transparencia/relatorios/balancetes/2023_11.pdf" },
      { label: "2023", year: "2023", month: "12", url: "/files/transparencia/relatorios/balancetes/2023_12.pdf" },
      // 2022
      { label: "2022", year: "2022", month: "02", url: "/files/transparencia/relatorios/balancetes/2022_02.pdf" },
      { label: "2022", year: "2022", month: "03", url: "/files/transparencia/relatorios/balancetes/2022_03.pdf" },
      { label: "2022", year: "2022", month: "04", url: "/files/transparencia/relatorios/balancetes/2022_04.pdf" },
      { label: "2022", year: "2022", month: "05", url: "/files/transparencia/relatorios/balancetes/2022_05.pdf" },
      { label: "2022", year: "2022", month: "06", url: "/files/transparencia/relatorios/balancetes/2022_06.pdf" },
      { label: "2022", year: "2022", month: "07", url: "/files/transparencia/relatorios/balancetes/2022_07.pdf" },
      { label: "2022", year: "2022", month: "08", url: "/files/transparencia/relatorios/balancetes/2022_08.pdf" },
      { label: "2022", year: "2022", month: "09", url: "/files/transparencia/relatorios/balancetes/2022_09.pdf" },
      { label: "2022", year: "2022", month: "10", url: "/files/transparencia/relatorios/balancetes/2022_10.pdf" },
      { label: "2022", year: "2022", month: "11", url: "/files/transparencia/relatorios/balancetes/2022_11.pdf" },
      { label: "2022", year: "2022", month: "12", url: "/files/transparencia/relatorios/balancetes/2022_12.pdf" },
      // 2021
      { label: "2021", year: "2021", month: "01", url: "/files/transparencia/relatorios/balancetes/2021_01.pdf" },
      { label: "2021", year: "2021", month: "02", url: "/files/transparencia/relatorios/balancetes/2021_02.pdf" },
      { label: "2021", year: "2021", month: "03", url: "/files/transparencia/relatorios/balancetes/2021_03.pdf" },
      { label: "2021", year: "2021", month: "04", url: "/files/transparencia/relatorios/balancetes/2021_04.pdf" },
      { label: "2021", year: "2021", month: "05", url: "/files/transparencia/relatorios/balancetes/2021_05.pdf" },
      { label: "2021", year: "2021", month: "07", url: "/files/transparencia/relatorios/balancetes/2021_07.pdf" },
      { label: "2021", year: "2021", month: "08", url: "/files/transparencia/relatorios/balancetes/2021_08.pdf" },
      { label: "2021", year: "2021", month: "09", url: "/files/transparencia/relatorios/balancetes/2021_09.pdf" },
      { label: "2021", year: "2021", month: "10", url: "/files/transparencia/relatorios/balancetes/2021_10.pdf" },
      { label: "2021", year: "2021", month: "11", url: "/files/transparencia/relatorios/balancetes/2021_11.pdf" },
      { label: "2021", year: "2021", month: "12", url: "/files/transparencia/relatorios/balancetes/2021_12.pdf" },
      // 2020
      { label: "2020", year: "2020", month: "01", url: "/files/transparencia/relatorios/balancetes/2020_01.pdf" },
      { label: "2020", year: "2020", month: "02", url: "/files/transparencia/relatorios/balancetes/2020_02.pdf" },
      { label: "2020", year: "2020", month: "03", url: "/files/transparencia/relatorios/balancetes/2020_03.pdf" },
      { label: "2020", year: "2020", month: "04", url: "/files/transparencia/relatorios/balancetes/2020_04.pdf" },
      { label: "2020", year: "2020", month: "05", url: "/files/transparencia/relatorios/balancetes/2020_05.pdf" },
      { label: "2020", year: "2020", month: "06", url: "/files/transparencia/relatorios/balancetes/2020_06.pdf" },
      { label: "2020", year: "2020", month: "07", url: "/files/transparencia/relatorios/balancetes/2020_07.pdf" },
      { label: "2020", year: "2020", month: "08", url: "/files/transparencia/relatorios/balancetes/2020_08.pdf" },
      { label: "2020", year: "2020", month: "09", url: "/files/transparencia/relatorios/balancetes/2020_09.pdf" },
      { label: "2020", year: "2020", month: "10", url: "/files/transparencia/relatorios/balancetes/2020_10.pdf" },
      { label: "2020", year: "2020", month: "11", url: "/files/transparencia/relatorios/balancetes/2020_11.pdf" },
      { label: "2020", year: "2020", month: "12", url: "/files/transparencia/relatorios/balancetes/2020_12.pdf" },
      // 2019
      { label: "2019", year: "2019", month: "01", url: "/files/transparencia/relatorios/balancetes/2019_01.pdf" },
      { label: "2019", year: "2019", month: "02", url: "/files/transparencia/relatorios/balancetes/2019_02.pdf" },
      { label: "2019", year: "2019", month: "03", url: "/files/transparencia/relatorios/balancetes/2019_03.pdf" },
      { label: "2019", year: "2019", month: "04", url: "/files/transparencia/relatorios/balancetes/2019_04.pdf" },
      { label: "2019", year: "2019", month: "05", url: "/files/transparencia/relatorios/balancetes/2019_05.pdf" },
      { label: "2019", year: "2019", month: "06", url: "/files/transparencia/relatorios/balancetes/2019_06.pdf" },
      { label: "2019", year: "2019", month: "07", url: "/files/transparencia/relatorios/balancetes/2019_07.pdf" },
      { label: "2019", year: "2019", month: "08", url: "/files/transparencia/relatorios/balancetes/2019_08.pdf" },
      { label: "2019", year: "2019", month: "09", url: "/files/transparencia/relatorios/balancetes/2019_09.pdf" },
      { label: "2019", year: "2019", month: "10", url: "/files/transparencia/relatorios/balancetes/2019_10.pdf" },
      { label: "2019", year: "2019", month: "11", url: "/files/transparencia/relatorios/balancetes/2019_11.pdf" },
      { label: "2019", year: "2019", month: "12", url: "/files/transparencia/relatorios/balancetes/2019_12.pdf" }
    ]
  },
  {
    title: "Relatórios da Ação Social Cooperada",
    type: "annual",
    options: [
      { label: "2018", url: "/files/transparencia/relatorios/acao-social/2018.pdf" },
      { label: "2017", url: "/files/transparencia/relatorios/acao-social/2017.pdf" },
      { label: "2016", url: "/files/transparencia/relatorios/acao-social/2016.pdf" },
      { label: "2015", url: "/files/transparencia/relatorios/acao-social/2015.pdf" },
      { label: "2014", url: "/files/transparencia/relatorios/acao-social/2014.pdf" },
      { label: "2013", url: "/files/transparencia/relatorios/acao-social/2013.pdf" },
      { label: "2012", url: "/files/transparencia/relatorios/acao-social/2012.pdf" },
      { label: "2011", url: "/files/transparencia/relatorios/acao-social/2011.pdf" },
      { label: "2010", url: "/files/transparencia/relatorios/acao-social/2010.pdf" }
    ]
  },
  {
    title: "Relatórios da Ouvidoria",
    type: "annual",
    options: [
      { label: "2025 (2º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2025_2S.pdf" },
      { label: "2024 (2º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2024_2S.pdf" },
      { label: "2024 (1º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2024_1S.pdf" },
      { label: "2023 (2º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2023_2S.pdf" },
      { label: "2023 (1º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2023.pdf" },
      { label: "2022 (2º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2022.pdf" },
      { label: "2022 (1º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2022_1S.pdf" },
      { label: "2021 (1º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2021_1S.pdf" },
      { label: "2020 (2º Semestre)", url: "/files/transparencia/relatorios/ouvidoria/2020.pdf" }
    ]
  },
  {
    title: "Relatórios do Canal de Conduta Ética",
    type: "annual",
    options: [
      { label: "2025 (2º Semestre)", url: "/files/transparencia/relatorios/etica/2025_2S.pdf" },
      { label: "2025 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2025_1S.pdf" },
      { label: "2024 (2º Semestre)", url: "/files/transparencia/relatorios/etica/2024_2S.pdf" },
      { label: "2024 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2024_1S.pdf" },
      { label: "2023 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2023_1S.pdf" },
      { label: "2022 (2º Semestre)", url: "/files/transparencia/relatorios/etica/2022_2S.pdf" },
      { label: "2022 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2022_1S.pdf" },
      { label: "2021 (2º Semestre)", url: "/files/transparencia/relatorios/etica/2021_2S.pdf" },
      { label: "2021 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2021_1S.pdf" },
      { label: "2020 (2º Semestre)", url: "/files/transparencia/relatorios/etica/2020_2S.pdf" },
      { label: "2020 (1º Semestre)", url: "/files/transparencia/relatorios/etica/2020_1S.pdf" }
    ]
  },
  {
    title: "Relatórios de Transparência Salarial",
    type: "annual",
    options: [
      { label: "2026 (1º Semestre)", url: "/files/transparencia/relatorios/transparencia-salarial/2026.pdf" },
      { label: "2025 (2º Semestre)", url: "/files/transparencia/relatorios/transparencia-salarial/2025_2S.pdf" },
      { label: "2025 (1º Semestre)", url: "/files/transparencia/relatorios/transparencia-salarial/2025_1S.pdf" },
      { label: "2024 (2º Semestre)", url: "/files/transparencia/relatorios/transparencia-salarial/2024_2S.pdf" }
    ]
  }
];

export default function RelatoriosCredicitrus1Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-relatorios.webp"
          titleLines={["RELATÓRIOS", "CREDICITRUS"]}
          highlightIndices={[1]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[]}
        />

        {/* 2. Document List Section */}
        <DocumentAccordion
          subtitle="RELATÓRIOS"
          title={"Veja online ou faça o\ndownload dos documentos"}
          items={reportItems}
        />
      </main>
      <Rodape />
    </div>
  );
}
