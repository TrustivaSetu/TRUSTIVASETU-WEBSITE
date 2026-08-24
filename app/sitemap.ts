import type { MetadataRoute } from "next";
import knowledge from "@/data/knowledge/articles.json";
import { founders } from "@/data/founders";
import { landingData } from "@/lib/landing-data";

const STATIC_ROUTES = [
  "/about",
  "/solutions",
  "/for-clinics",
  "/for-patients",
  "/why-we-win",
  "/contact",
  "/join-us",
  "/founders",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/refund-cancellation-policy",
  "/partners/doctors",
  "/partners/nbfc",
  "/investors",
];

export default function sitemap(): MetadataRoute.Sitemap {

  const base = "https://www.trustivasetu.com";

  return [

    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },

    ...STATIC_ROUTES.map(route => ({
      url: base + route,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),

    ...founders.map(f => ({
      url: `${base}/founders/${f.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5
    })),

    ...Object.keys(landingData).map(slug => ({
      url: `${base}/${slug}-loan`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),

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
