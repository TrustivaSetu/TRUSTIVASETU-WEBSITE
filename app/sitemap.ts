import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.trustivasetu.com";

const staticPages = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "join-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "founders", changeFrequency: "monthly", priority: 0.8 },
  { path: "investors", changeFrequency: "monthly", priority: 0.8 },
  { path: "partners/doctors", changeFrequency: "monthly", priority: 0.8 },
  { path: "partners/nbfc", changeFrequency: "monthly", priority: 0.8 },
  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "disclaimer", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const landingDir = path.join(process.cwd(), "data", "landing-content");

  const landingPages = fs
    .readdirSync(landingDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, "") + "-loan");

  return [
    ...staticPages.map((page) => ({
      url: page.path ? `${BASE_URL}/${page.path}` : BASE_URL,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    ...landingPages.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
