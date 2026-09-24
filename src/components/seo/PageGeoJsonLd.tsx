import { JsonLd } from "@/components/seo/JsonLd";
import { getPageSeo, getSiteUrl, SITE_NAME } from "@/lib/seo";
import { orgId, websiteId } from "@/lib/geo/org";

function breadcrumbItems(path: string) {
  const siteUrl = getSiteUrl();
  const crumbs: Array<{ name: string; item: string }> = [
    { name: "Home", item: siteUrl },
  ];

  if (path === "/") return crumbs;

  const parts = path.split("/").filter(Boolean);
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    const seo = getPageSeo(acc);
    crumbs.push({
      name: seo.title || part,
      item: `${siteUrl}${acc}`,
    });
  }
  return crumbs;
}

/** WebPage + BreadcrumbList — melhora contexto para motores generativos. */
export function PageGeoJsonLd({ path }: { path: string }) {
  const siteUrl = getSiteUrl();
  const page = getPageSeo(path);
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const crumbs = breadcrumbItems(path);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: path === "/" ? `${SITE_NAME} | ${page.title}` : `${page.title} | ${SITE_NAME}`,
        description: page.description,
        isPartOf: { "@id": websiteId() },
        about: { "@id": orgId() },
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };

  return <JsonLd data={data} />;
}
