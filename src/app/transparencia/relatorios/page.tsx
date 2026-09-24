import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import DocumentAccordion from "@/components/DocumentAccordion/DocumentAccordion";
import { getRelatoriosAccordionItems } from "@/lib/cms";
import { relatoriosFallback } from "@/data/relatorios-fallback";

export default async function RelatoriosCredicitrus1Page() {
  const reportItems = await getRelatoriosAccordionItems(relatoriosFallback);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-transparencia-relatorios.webp"
          titleLines={["RELATÓRIOS", "CREDICITRUS"]}
          highlightIndices={[1]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[]}
        />

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
