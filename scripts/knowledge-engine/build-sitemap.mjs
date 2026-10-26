import fs from "node:fs";

const articles = JSON.parse(
  fs.readFileSync(
    "data/knowledge/articles.json",
    "utf8"
  )
);

const base="https://www.trustivasetu.com";

const urls=articles.map(a=>`
<url>
<loc>${base}/resources/${a.slug}</loc>
<lastmod>${new Date(a.fetchedAt).toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>0.80</priority>
</url>`).join("");

const xml=`<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(
"public/knowledge-sitemap.xml",
xml
);

console.log(
"Sitemap:",
articles.length,
"URLs"
);
