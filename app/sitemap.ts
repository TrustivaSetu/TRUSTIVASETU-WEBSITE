import type { MetadataRoute } from "next";
import knowledge from "@/data/knowledge/articles.json";

export default function sitemap(): MetadataRoute.Sitemap {

  const base = "https://www.trustivasetu.com";

  return [

    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },

    {
      url: base + "/resources",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },

    ...knowledge.map(article => ({
      url: `${base}/resources/${article.slug}`,
      lastModified: new Date(article.fetchedAt),
      changeFrequency: "daily" as const,
      priority: 0.8
    }))

  ];

}
