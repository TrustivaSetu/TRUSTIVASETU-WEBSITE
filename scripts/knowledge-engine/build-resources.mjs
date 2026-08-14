import { readJson, writeJson } from "./lib/storage.mjs";
import { classify } from "./lib/classifier.mjs";

const history = readJson(
  "data/knowledge/history/index.json",
  []
);

const seenSlugs = new Map();

const articles = history
  .map(article => ({
    slug: article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,"-")
      .replace(/^-|-$/g,""),
    title: article.title,
    summary: article.summary,
    source: article.source,
    category: article.category,
    url: article.url,
    publishedAt: article.publishedAt,
    fetchedAt: article.fetchedAt
  }))
  .filter(article => {
    const existing = seenSlugs.get(article.slug);

    if (!existing) {
      seenSlugs.set(article.slug, article);
      return true;
    }

    if (!existing.summary && article.summary) {
      existing.summary = article.summary;
      existing.fetchedAt = article.fetchedAt;
    }

    return false;
  })
  .map(classify);

writeJson(
  "data/knowledge/articles.json",
  articles
);

console.log(
  "Generated",
  articles.length,
  "knowledge articles."
);
