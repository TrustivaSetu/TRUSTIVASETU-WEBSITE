/**
 * Daily auto-blog for trustivasetu.com
 *
 * Picks the freshest relevant item from the Knowledge Centre feed
 * (data/knowledge/articles.json) that has no blog yet and writes ONE post.
 * If there is nothing new, it writes the next evergreen topic instead.
 *
 * Needs ANTHROPIC_API_KEY in .env / .env.production (without it, only a short
 * factual "update" post is created for new regulatory items; evergreen is skipped).
 *
 * Usage (repo root):
 *   node scripts/auto-blog.mjs              # create and publish today's post
 *   node scripts/auto-blog.mjs --dry-run    # print what it would post, touch nothing
 * Env:
 *   BLOG_AUTO_PUBLISH=0   save as draft instead of publishing
 *   BLOG_MODEL            default claude-sonnet-5
 *   BLOG_MAX_AGE_DAYS     default 10 (how old a knowledge item may be)
 *   GEMINI_API_KEY        used when ANTHROPIC_API_KEY is not set
 *   GEMINI_MODEL          comma-separated fallback list, default gemini-3.5-flash,gemini-3.8-flash
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry-run");

// ---- load .env files (same precedence as ecosystem.config.js) ----
for (const f of [".env", ".env.production"]) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    process.env[t.slice(0, eq).trim()] = v;
  }
}

const KEY = process.env.ANTHROPIC_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const HAS_LLM = !!(KEY || GEMINI_KEY);
const MODEL = process.env.BLOG_MODEL || "claude-sonnet-5";
const PUBLISH = process.env.BLOG_AUTO_PUBLISH !== "0";
const MAX_AGE_DAYS = Number(process.env.BLOG_MAX_AGE_DAYS || 10);

// ---- DB (optional in dry-run) ----
let db = null;
try {
  const { PrismaClient } = await import("@prisma/client");
  db = new PrismaClient();
} catch (e) {
  if (!DRY) throw e;
}
async function slugExists(slug) {
  if (!db) return false;
  try { return !!(await db.blogPost.findUnique({ where: { slug } })); } catch (e) { if (DRY) return false; throw e; }
}

// ---- one auto post per day: stop if one (draft or published) was made in the last 20h ----
if (db) {
  let recent = null;
  try {
    recent = await db.blogPost.findFirst({
      where: {
        createdAt: { gte: new Date(Date.now() - 20 * 3600e3) },
        OR: [{ slug: { startsWith: "update-" } }, { slug: { startsWith: "guide-" } }],
      },
      select: { slug: true },
    });
  } catch (e) {
    if (!DRY) throw e;
  }
  if (recent) {
    console.log(`Already posted today (${recent.slug}).`);
    await db.$disconnect();
    process.exit(0);
  }
}

// ---- 1. candidates from the knowledge feed ----
const articles = JSON.parse(fs.readFileSync(path.join(root, "data/knowledge/articles.json"), "utf8"));
const NEG = /veterinar|animal|cattle|poultry|vaccine for (animal|veterinary)/i;
const POS = /digital lending|nbfc|lending|loan|credit|interest|kyc|fintech|payment|emi|consumer|grievance|ombudsman|abdm|health (id|account|record)|ayushman|nabh|accredit|hospital|clinic|fertility|ivf|assisted reproduct|dental|dermat|cosmet|hearing|ophthal|eye|medical device|price control|data protection|dpdp|privacy/i;
const cutoff = Date.now() - MAX_AGE_DAYS * 864e5;

function score(a) {
  const text = `${a.title} ${a.summary || ""} ${a.category || ""}`;
  if (NEG.test(text)) return -1;
  let s = POS.test(text) ? 2 : 0;
  if (/RBI|ABDM|NABH/i.test(a.source || "")) s += 2;
  if (/IADVL/i.test(a.source || "")) s += 1;
  if (/CDSCO/i.test(a.source || "") && !POS.test(text)) s -= 2; // most CDSCO gazette items are not relevant
  return s;
}

const fresh = articles
  .filter((a) => a.title && new Date(a.publishedAt || a.fetchedAt).getTime() >= cutoff)
  .map((a) => ({ a, s: score(a) }))
  .filter((x) => x.s >= 3)
  .sort((x, y) => y.s - x.s || new Date(y.a.publishedAt) - new Date(x.a.publishedAt));

const EVERGREEN = [
  ["no-cost-emi-vs-cash-discount", "No-Cost EMI vs Cash Discount: Which Is Cheaper for Treatment?"],
  ["how-to-read-a-key-fact-statement", "How to Read a Key Fact Statement Before Taking a Medical Loan"],
  ["fertility-treatment-budget-planning", "How to Plan a Budget for Fertility Treatment"],
  ["hearing-aid-financing-guide", "Hearing Aids on EMI: What Families Should Know"],
  ["eye-surgery-emi-lasik-cataract", "Eye Surgery on EMI: LASIK, Cataract and Other Procedures"],
  ["cosmetology-treatments-financing", "Financing Cosmetology and Skin Treatments: A Practical Guide"],
  ["cibil-score-and-medical-loans", "CIBIL Score and Medical Loans: What Really Matters"],
  ["emi-tenure-how-to-choose", "How to Choose the Right EMI Tenure for Medical Treatment"],
  ["how-clinics-can-reduce-treatment-drop-offs", "How Clinics Can Reduce Treatment Drop-Offs With Payment Options"],
  ["digital-lending-safety-tips-for-patients", "Digital Lending Safety Tips Every Patient Should Know"],
  ["insurance-vs-medical-loan-elective-care", "Health Insurance vs Medical Loan for Elective Treatments"],
  ["what-is-a-lending-service-provider", "What Is a Lending Service Provider (LSP) and Why Does It Matter?"],
  ["ivf-cost-factors-india", "What Affects the Cost of IVF in India?"],
  ["dental-implants-vs-bridges-cost-and-financing", "Dental Implants vs Bridges: Cost Considerations and Financing"],
  ["questions-to-ask-before-borrowing-for-surgery", "Questions to Ask Before Borrowing for a Planned Surgery"],
  ["patient-financing-for-small-clinics", "Patient Financing for Small and Mid-Size Clinics: Getting Started"],
  ["prepayment-and-foreclosure-explained", "Prepayment and Foreclosure of a Medical Loan Explained"],
  ["cooling-off-period-digital-loans", "Cooling-Off Period in Digital Loans: Your Right to Exit"],
  ["emi-cards-and-credit-card-loans-for-medical-bills", "Using Credit Card Loans for Medical Bills: Pros and Cons"],
  ["personal-loan-vs-medical-loan", "Personal Loan vs Medical Loan: How to Decide"],
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const DISCLAIMER =
  "\n\nThis article is for general information and is not legal, financial or medical advice. Loan approval, amount and terms depend on the lender's policies and your eligibility. Read the Key Fact Statement before accepting any loan.\n\nTo explore patient financing, visit trustivasetu.com.";

async function pageText(url) {
  try {
    if (!url || /\.pdf($|\?)/i.test(url) || /download_file/i.test(url)) return "";
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 10000);
    const r = await fetch(url, { signal: ctl.signal, headers: { "user-agent": "Mozilla/5.0 TrustivaSetuBot" } });
    clearTimeout(t);
    if (!r.ok || !/text\/html/.test(r.headers.get("content-type") || "")) return "";
    return (await r.text()).replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 6000);
  } catch { return ""; }
}

// Anthropic when ANTHROPIC_API_KEY is set, otherwise Gemini (GEMINI_MODEL is a
// comma-separated fallback list; the key goes in a header, never the URL).
async function llm(prompt) {
  let txt = "";
  if (KEY) {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 2500, messages: [{ role: "user", content: prompt }] }),
    });
    if (!r.ok) throw new Error(`Claude API ${r.status}: ${(await r.text()).slice(0, 300)}`);
    const j = await r.json();
    txt = (j.content || []).map((c) => c.text || "").join("");
  } else {
    // Each call times out after 90s. A network error or timeout moves on to the
    // next model; a 503 (model busy) gets a second try after 20s first.
    const models = (process.env.GEMINI_MODEL || "gemini-3.5-flash,gemini-3.8-flash").split(",").map((m) => m.trim()).filter(Boolean);
    const errors = [];
    for (const m of models) {
      for (let attempt = 1; attempt <= 2 && !txt; attempt++) {
        let r;
        try {
          r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, {
            method: "POST",
            headers: { "content-type": "application/json", "x-goog-api-key": GEMINI_KEY },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json", maxOutputTokens: 3000 },
            }),
            signal: AbortSignal.timeout(90000),
          });
        } catch (e) {
          errors.push(`${m}: ${e.name === "TimeoutError" ? "timeout after 90s" : `network error (${e.cause?.code || e.message})`}`);
          break;
        }
        if (r.status === 503 && attempt === 1) {
          errors.push(`${m}: 503 busy, retrying in 20s`);
          await new Promise((res) => setTimeout(res, 20000));
          continue;
        }
        if (!r.ok) {
          errors.push(`${m}: ${r.status} ${(await r.text()).slice(0, 200)}`);
          break;
        }
        const j = await r.json();
        txt = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
        if (!txt) { errors.push(`${m}: empty reply`); break; }
      }
      if (txt) break;
    }
    if (!txt) throw new Error(`Gemini API failed: ${errors.join(" | ")}`);
  }
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("No JSON in model reply");
  return JSON.parse(m[0]);
}

const STYLE = `You write for TrustivaSetu (Aarthsetu Technologies Pvt Ltd), an Indian healthcare-financing aggregator that connects clinics/hospitals and patients with regulated lending partners for IVF/fertility, dental, cosmetology, ophthalmology and hearing care.
Rules: plain text only (NO markdown, no asterisks, no # headings, no emojis); use short paragraphs and numbered lines like "1." where helpful; 350-550 words; clear, neutral, helpful English for Indian patients and clinic owners.
Never invent numbers, rates, dates, legal clauses, statistics or quotes. Never promise loan approval or specific interest rates. Do not give legal/medical advice. Mention TrustivaSetu naturally at most twice and do not claim anything about TrustivaSetu beyond: it is an aggregator/technology platform connecting clinics and patients with regulated lending partners.
Reply with ONLY a JSON object: {"title": "...", "excerpt": "one sentence under 180 chars", "content": "..."}. Escape newlines inside content as \\n.`;

let post = null;

if (fresh.length) {
  for (const { a } of fresh) {
    const slug = `update-${slugify(a.slug || a.title)}`.slice(0, 90);
    if (await slugExists(slug)) continue;
    const body = await pageText(a.url);
    if (HAS_LLM) {
      const out = await llm(`${STYLE}

Write a blog post explaining this official update for our readers: what it is, who it may affect (patients, clinics, lenders), and what a reader may sensibly do next. Use ONLY the facts below; if details are thin, say that readers should check the official source. End with a line naming the source and the date.

Source: ${a.source} (${a.category})
Title: ${a.title}
Published: ${a.publishedAt}
Link: ${a.url}
Page text (may be empty or noisy): ${body}`);
      post = { slug, ...out };
    } else {
      const d = new Date(a.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
      post = {
        slug,
        title: `Update from ${a.source}: ${a.title}`.slice(0, 140),
        excerpt: `${a.source} published a new update relevant to ${a.category.toLowerCase()}.`,
        content: `${a.source} has published the following update (${d}):\n\n${a.title}\n\nCategory: ${a.category}\n\nThis update may be relevant to patients, clinics and lenders working in healthcare financing. Please read the official notice for the complete details: ${a.url}\n\nTrustivaSetu tracks official updates from regulators and healthcare bodies in its Knowledge Centre so clinic partners and patients can stay informed.`,
      };
    }
    break;
  }
}

if (!post && HAS_LLM) {
  for (const [s, title] of EVERGREEN) {
    const slug = `guide-${s}`;
    if (await slugExists(slug)) continue;
    const out = await llm(`${STYLE}

Write an evergreen explainer with the working title: "${title}". Keep it practical (checklists, questions to ask, common mistakes). General principles only; no specific rates or numbers.`);
    post = { slug, ...out };
    break;
  }
}

if (!post) {
  console.log("Nothing to post today (no new relevant update and no API key / topics exhausted).");
  if (db) await db.$disconnect();
  process.exit(0);
}

post.content = String(post.content).replace(/\\n/g, "\n").replace(/[*#`_]{1,}/g, "").trim() + DISCLAIMER;
post.title = String(post.title).replace(/[*#`]/g, "").trim();
post.excerpt = String(post.excerpt || "").slice(0, 200);

if (DRY) {
  console.log("[dry-run]", post.slug, "\n", post.title, "\n", post.excerpt, "\n\n", post.content.slice(0, 1200));
  if (db) await db.$disconnect();
  process.exit(0);
}

await db.blogPost.create({
  data: {
    slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content,
    published: PUBLISH, publishedAt: PUBLISH ? new Date() : null,
  },
});
console.log(PUBLISH ? "Published:" : "Draft saved:", post.slug);
await db.$disconnect();
