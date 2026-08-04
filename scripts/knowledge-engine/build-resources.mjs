import fs from "node:fs";

const articles = JSON.parse(
  fs.readFileSync(
    "data/knowledge/generated/index.json",
    "utf8"
  )
);

const output = articles.map(article => ({
  slug:
    article.title
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
}));

fs.writeFileSync(
  "data/knowledge/articles.json",
  JSON.stringify(output,null,2)
);

console.log(
  "Generated",
  output.length,
  "knowledge articles."
);
