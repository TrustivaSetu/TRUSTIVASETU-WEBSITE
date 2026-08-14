import * as cheerio from "cheerio";
import { fetchHtml } from "../lib/http.mjs";

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

function parseAnnouncementDate(text) {
  const match = (text || "")
    .trim()
    .match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);

  if (!match) {
    return "";
  }

  const [, day, monthName, year] = match;
  const month = MONTHS[monthName.toLowerCase()];

  if (month === undefined) {
    return "";
  }

  return new Date(Date.UTC(Number(year), month, Number(day))).toISOString();
}

export async function fetchNABH() {

  const html = await fetchHtml("https://nabh.co/");
  const $ = cheerio.load(html);

  const items = [];

  $(".announcement-card ul.list-unstyled > li").each((_, el) => {

    const link = $(el).find("a").first();
    const href = link.attr("href");

    if (!href) {
      return;
    }

    const title = (link.attr("title") || link.text()).trim();
    const dateText = $(el).find("p.color-grey").first().text();

    items.push({
      source: "NABH",
      category: "Hospital Accreditation",
      title,
      url: href,
      publishedAt: parseAnnouncementDate(dateText),
      summary: title
    });

  });

  return items.slice(0, 20);

}
