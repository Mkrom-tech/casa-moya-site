import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

const BASE_URL = "https://www.casa-moya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["nl", "en", "es", "it", "de"] as const;

  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/properties/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  );

  return [...homeEntries, ...propertyEntries];
}
