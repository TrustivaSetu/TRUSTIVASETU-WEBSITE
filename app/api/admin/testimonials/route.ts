import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const items = await db.testimonial.findMany({ orderBy: { displayOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const body = await req.json();
  const { name, role, quote, photoUrl, published, displayOrder } = body;
  if (!name || !quote) {
    return NextResponse.json({ error: "name and quote are required" }, { status: 400 });
  }
  const item = await db.testimonial.create({
    data: { name, role, quote, photoUrl, published: published !== false, displayOrder: displayOrder || 0 },
  });
  return NextResponse.json(item, { status: 201 });
}

