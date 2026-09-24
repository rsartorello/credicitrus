import type { MetadataRoute } from "next";
import {
  getSiteUrl,
  isPublicIndexingEnabled,
  PUBLIC_PAGES,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicIndexingEnabled()) {
    return [];
  }

  const siteUrl = getSiteUrl();
  const now = new Date();

  return PUBLIC_PAGES.map((page) => ({
    url: `${siteUrl}${page.path === "/" ? "" : page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "daily" : "weekly",
    priority: page.path === "/" ? 1 : page.path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
