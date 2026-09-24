import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_FAQ } from "@/data/faq-site";
import { getSiteUrl } from "@/lib/seo";
import { orgId } from "@/lib/geo/org";

export function FaqPageJsonLd() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/duvidas-frequentes`;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: SITE_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText,
      },
    })),
    about: { "@id": orgId() },
    inLanguage: "pt-BR",
  };

  return <JsonLd data={data} />;
}
