import * as cheerio from "cheerio";
import { fetchHtml } from "../lib/http.mjs";

const BULLETIN_HEADING = "IADVL News- The Official Bulletin of IADVL";

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

function parseIssueDate(text) {
  const match = (text || "")
    .replace(/ /g, " ")
    .trim()
    .match(/^([A-Za-z]+)\s+(\d{4})$/);

  if (!match) {
    return "";
  }

  const [, monthName, year] = match;
  const month = MONTHS[monthName.toLowerCase()];

  if (month === undefined) {
    return "";
  }

  return new Date(Date.UTC(Number(year), month, 1)).toISOString();
}

export async function fetchIADVL() {

  const html = await fetchHtml("https://www.iadvl.org/newsletter");
  const $ = cheerio.load(html);

  // The bulletin heading appears twice on the page — an unused/hidden
  // "Sample carousel 2" duplicate (with placeholder href="#" items) comes
  // first, and the live carousel with real PDF links comes second.
  const heading = $("h3.carousel_title")
    .filter((_, el) => $(el).text().trim() === BULLETIN_HEADING)
    .last();

  const carousel = heading.closest(".carousel_slider");

  const items = [];

  carousel.find(".carousel_item a.news_link_block").each((_, el) => {

    const href = $(el).attr("href");

    if (!href || !href.startsWith("http")) {
      return;
    }

    const issue = $(el).find(".newsletter_title").first().text().trim();
    const volume = $(el).find(".newslletter_issue_text").first().text().trim();

    if (!issue) {
      return;
    }

    items.push({
      source: "IADVL",
      category: "Dermatology",
      title: volume
        ? `IADVL News – ${issue} (${volume})`
        : `IADVL News – ${issue}`,
      url: href,
      publishedAt: parseIssueDate(issue),
      summary: volume
        ? `IADVL News – The Official Bulletin of IADVL, ${issue} (${volume})`
        : `IADVL News – The Official Bulletin of IADVL, ${issue}`
    });

  });

  return items.slice(0, 20);

}
