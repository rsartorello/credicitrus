import { JsonLd } from "@/components/seo/JsonLd";
import { agenciasData } from "@/components/AgenciasMap/agenciasData";
import { getSiteUrl } from "@/lib/seo";
import { ORG, orgId } from "@/lib/geo/org";

/**
 * Lista de pontos de atendimento para GEO local.
 * Usa apenas dados já existentes em agenciasData (sem lat/lng inventados).
 */
export function AgenciasJsonLd() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/nossas-agencias`;

  const branches = agenciasData.map((ag, index) => ({
    "@type": "BankOrCreditUnion",
    "@id": `${pageUrl}#pa-${ag.id}`,
    name: `${ORG.legalName} — ${ag.pa}`,
    parentOrganization: { "@id": orgId() },
    taxID: ag.cnpj || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: [ag.endereco, ag.numero].filter(Boolean).join(", "),
      addressLocality: ag.cidade,
      addressRegion: ag.estado,
      postalCode: ag.cep?.replace(/\s/g, "") || undefined,
      addressCountry: "BR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    telephone: ORG.telephone,
    url: pageUrl,
    position: index + 1,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#agencias`,
    name: "Agências Credicitrus",
    description:
      "Pontos de atendimento da Sicoob Credicitrus em São Paulo, Minas Gerais e Mato Grosso do Sul.",
    numberOfItems: branches.length,
    itemListElement: branches.map((branch, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: branch,
    })),
  };

  return <JsonLd data={data} />;
}
