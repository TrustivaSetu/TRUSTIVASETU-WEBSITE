import * as cheerio from "cheerio";
import { fetchHtml } from "../lib/http.mjs";

const BASE_URL = "https://cdsco.gov.in";

const CATEGORY_PAGES = [
  "/opencms/opencms/en/Notifications/",
  "/opencms/opencms/en/Latest-Circulars/",
  "/opencms/opencms/en/Notifications/Alerts/",
  "/opencms/opencms/en/Notifications/Gazette-Notifications/",
  "/opencms/opencms/en/Notifications/Public-Notices/"
];

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

function parseCdscoDate(text) {
  const match = (text || "")
    .trim()
    .match(/^(\d{4})-([A-Za-z]{3})-(\d{1,2})$/);

  if (!match) {
    return "";
  }

  const [, year, monthAbbr, day] = match;
  const month = MONTHS[monthAbbr.toLowerCase()];

  if (month === undefined) {
    return "";
  }

  return new Date(Date.UTC(Number(year), month, Number(day))).toISOString();
}

async function fetchCategoryPage(path) {

  const html = await fetchHtml(`${BASE_URL}${path}`);
  const $ = cheerio.load(html);

  const items = [];

  $("table.example tbody tr").each((_, row) => {

    const cells = $(row).find("td");

    if (cells.length < 4) {
      return;
    }

    const title = $(cells[1]).text().replace(/\s+/g, " ").trim();
    const dateText = $(cells[2]).text();
    const href = $(cells[3]).find("a").attr("href");

    if (!title || !href) {
      return;
    }

    const url = href.startsWith("http") ? href : `${BASE_URL}${href}`;

    items.push({
      source: "CDSCO",
      category: "Drug Regulation",
      title,
      url,
      publishedAt: parseCdscoDate(dateText),
      summary: title
    });

  });

  return items.slice(0, 20);

}

export async function fetchCDSCO() {

  const results = await Promise.all(
    CATEGORY_PAGES.map(path => fetchCategoryPage(path))
  );

  return results.flat();

}
