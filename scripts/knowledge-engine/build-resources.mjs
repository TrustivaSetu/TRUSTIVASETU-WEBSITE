import { readJson, writeJson } from "./lib/storage.mjs";
import { classify } from "./lib/classifier.mjs";

const generated = readJson(
  "data/knowledge/generated/index.json",
  []
);

const history = readJson(
  "data/knowledge/history/index.json",
  []
);

const source = generated.length ? generated : history;

const articles = source
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
