import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Service-to-service webhook: the LMS server calls this when a clinic is
// approved, to push it into the public clinics list on the website.
// Auth is a shared secret header (x-webhook-secret), NOT the admin session
// cookie used by /api/admin/* — this endpoint is hit by a server, not a browser.

export async function POST(req: NextRequest) {
  const secret = process.env.CLINIC_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { externalId, name, city, specialty, logoUrl } = (body ?? {}) as {
    externalId?: string;
    name?: string;
    city?: string;
    specialty?: string;
    logoUrl?: string;
  };

  if (!externalId || !name || !city || !specialty) {
    return NextResponse.json(
      { error: "externalId, name, city and specialty are required" },
      { status: 400 }
    );
  }

  const existing = await db.publicClinic.findUnique({ where: { externalId } });

  let clinic;
  if (existing) {
    clinic = await db.publicClinic.update({
      where: { externalId },
      data: { name, city, specialty, logoUrl: logoUrl ?? null },
    });
  } else {
    const count = await db.publicClinic.count();
    clinic = await db.publicClinic.create({
      data: {
        externalId,
        name,
        city,
        specialty,
        logoUrl: logoUrl ?? null,
        published: true,
        displayOrder: count + 1,
      },
    });
  }

  return NextResponse.json({ success: true, clinic });
}
