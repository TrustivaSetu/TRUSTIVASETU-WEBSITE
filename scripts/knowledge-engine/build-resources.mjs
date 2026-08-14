import crypto from "node:crypto";
import { readJson, writeJson } from "./lib/storage.mjs";
import { classify } from "./lib/classifier.mjs";

const history = readJson(
  "data/knowledge/history/index.json",
  []
);

const seenSlugs = new Map();

const MAX_SLUG_LENGTH = 100;

function buildSlug(title) {
  const raw = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");

  if (raw.length <= MAX_SLUG_LENGTH) {
    return raw;
  }

  const hash = crypto.createHash("md5").update(title).digest("hex").slice(0, 8);
  return `${raw.slice(0, MAX_SLUG_LENGTH).replace(/-+$/,"")}-${hash}`;
}

const articles = history
  .map(article => ({
    slug: buildSlug(article.title),
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
