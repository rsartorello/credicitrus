import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { ORG, orgId, websiteId } from "@/lib/geo/org";

/** Entidade rica para GEO: CreditUnion + WebSite. */
export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "CreditUnion", "FinancialService"],
        "@id": orgId(),
        name: ORG.name,
        legalName: ORG.legalName,
        alternateName: [...ORG.alternateName],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
        },
        image: `${siteUrl}/icon.png`,
        description: ORG.description || DEFAULT_DESCRIPTION,
        taxID: ORG.taxId,
        telephone: ORG.telephone,
        sameAs: [...ORG.sameAs],
        address: {
          "@type": "PostalAddress",
          streetAddress: ORG.address.streetAddress,
          addressLocality: ORG.address.addressLocality,
          addressRegion: ORG.address.addressRegion,
          postalCode: ORG.address.postalCode,
          addressCountry: ORG.address.addressCountry,
        },
        areaServed: ORG.areaServed.map((region) => ({
          "@type": "AdministrativeArea",
          name: region,
        })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: ORG.telephone,
            contactType: "customer service",
            areaServed: "BR",
            availableLanguage: ["Portuguese"],
          },
          {
            "@type": "ContactPoint",
            telephone: ORG.ouvidoria,
            contactType: "ombudsman",
            areaServed: "BR",
            availableLanguage: ["Portuguese"],
          },
          {
            "@type": "ContactPoint",
            telephone: ORG.whatsapp,
            contactType: "customer support",
            areaServed: "BR",
            availableLanguage: ["Portuguese"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: siteUrl,
        name: ORG.name,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": orgId() },
        inLanguage: "pt-BR",
      },
    ],
  };

  return <JsonLd data={data} />;
}
