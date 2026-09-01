import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const items = await db.publicClinic.findMany({ orderBy: { displayOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const body = await req.json();
  const { name, city, specialty, logoUrl, published, displayOrder } = body;
  if (!name || !city || !specialty) {
    return NextResponse.json(
      { error: "name, city and specialty are required" },
      { status: 400 }
    );
  }
  const item = await db.publicClinic.create({
    data: {
      name,
      city,
      specialty,
      logoUrl,
      published: published !== false,
      displayOrder: displayOrder || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
