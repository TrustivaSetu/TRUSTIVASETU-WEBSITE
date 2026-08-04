import { parseStringPromise } from "xml2js";

export async function fetchRBI() {

  const response = await fetch(
    "https://rbi.org.in/notifications_rss.xml",
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const xml = await response.text();

  const rss = await parseStringPromise(xml);

  const items = rss.rss.channel[0].item || [];

  return items.slice(0,20).map(item => ({
    source: "Reserve Bank of India",
    category: "Digital Lending",
    title: item.title?.[0] || "",
    url: item.link?.[0] || "",
    publishedAt: item.pubDate?.[0] || "",
    summary: (item.description?.[0] || "")
      .replace(/<[^>]+>/g," ")
      .replace(/\s+/g," ")
      .trim()
      .substring(0,1200)
  }));

}
