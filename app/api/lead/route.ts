import crypto from "crypto";

/**
 * Server-side proxy for LMS enquiry submissions.
 *
 * The browser must NOT call https://lms.trustivasetu.com/api/enquiries/* directly:
 * doing so forces those endpoints to be publicly writable, enabling fake-lead and
 * commission fraud. Instead the client posts to THIS route, which:
 *   1. validates input server-side,
 *   2. signs the request with an HMAC shared secret the LMS can verify,
 *   3. forwards it to the LMS over a trusted server-to-server call.
 *
 * On the LMS side, /api/enquiries/* must REJECT any request whose
 * `x-ts-signature` does not verify (and whose timestamp is stale). Until that
 * enforcement is live this proxy is forward-compatible — it already sends the
 * header.
 *
 * Required env vars:
 *   LMS_BASE_URL      e.g. https://lms.trustivasetu.com  (defaults to that)
 *   LMS_HMAC_SECRET   shared secret, also configured on the LMS
 */

const LMS_BASE_URL = process.env.LMS_BASE_URL ?? "https://lms.trustivasetu.com";
const LMS_HMAC_SECRET = process.env.LMS_HMAC_SECRET;

// Reject signatures whose timestamp drifts more than this (replay protection).
const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;

// --- Minimal in-memory rate limiter (stopgap) -------------------------------
// NOTE: in-memory state is per-instance and resets on cold start / scale-out.
// For production-grade limiting use Upstash Ratelimit or a Vercel WAF rule.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// --- Validation helpers -----------------------------------------------------
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

type LeadType = "patient" | "provider";

function buildLmsPayload(type: LeadType, body: Record<string, unknown>) {
  if (type === "patient") {
    const applicantName = str(body.fullName, 120);
    const mobile = str(body.phone, 10);
    const email = str(body.email, 160);
    if (!applicantName || !PHONE_RE.test(mobile) || !EMAIL_RE.test(email)) return null;
    const budgetRaw = str(body.budget, 20);
    const loanAmount = budgetRaw ? parseFloat(budgetRaw) || undefined : undefined;
    return {
      path: "/api/enquiries/patient",
      payload: {
        source: "WEBSITE_FORM",
        applicantName,
        mobile,
        email,
        currentCity: str(body.city, 80),
        treatmentName: str(body.treatmentType, 120),
        loanAmount,
        notes: str(body.message, 1000),
      },
    };
  }

  if (type === "provider") {
    const clinicName = str(body.clinicName, 160);
    const contactPerson = str(body.contactPerson, 120);
    const mobile = str(body.phone, 10);
    const email = str(body.email, 160);
    if (!clinicName || !contactPerson || !PHONE_RE.test(mobile) || !EMAIL_RE.test(email))
      return null;
    return {
      path: "/api/enquiries/provider",
      payload: {
        source: "WEBSITE_FORM",
        clinicName,
        contactPerson,
        mobile,
        email,
        city: str(body.city, 80),
        treatmentTypes: str(body.specialty, 200),
        notes: str(body.message, 1000),
      },
    };
  }

  return null;
}

function sign(timestamp: string, rawBody: string): string {
  return crypto
    .createHmac("sha256", LMS_HMAC_SECRET as string)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return Response.json(
      { success: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const type = str(body.type) as LeadType;
  if (type !== "patient" && type !== "provider") {
    return Response.json({ success: false, error: "Invalid enquiry type" }, { status: 400 });
  }

  const built = buildLmsPayload(type, body);
  if (!built) {
    return Response.json(
      { success: false, error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  // If the shared secret isn't configured, fail closed rather than sending an
  // unsigned request the LMS will (eventually) reject.
  if (!LMS_HMAC_SECRET) {
    return Response.json(
      { success: false, error: "Lead service not configured" },
      { status: 503 }
    );
  }

  const rawBody = JSON.stringify(built.payload);
  const timestamp = Date.now().toString();
  const signature = sign(timestamp, rawBody);

  try {
    const lmsRes = await fetch(`${LMS_BASE_URL}${built.path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ts-timestamp": timestamp,
        // Format the LMS should verify: HMAC-SHA256(`${timestamp}.${rawBody}`)
        // using LMS_HMAC_SECRET, rejecting timestamps older than 5 minutes.
        "x-ts-signature": `sha256=${signature}`,
        "x-ts-max-age-ms": String(MAX_SIGNATURE_AGE_MS),
      },
      body: rawBody,
      // Don't let a slow LMS hang the request indefinitely.
      signal: AbortSignal.timeout(8000),
    });

    if (!lmsRes.ok) {
      return Response.json(
        { success: false, error: "Lead service rejected the request" },
        { status: 502 }
      );
    }

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json(
      { success: false, error: "Could not reach the lead service" },
      { status: 502 }
    );
  }
}
