import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const items = await db.teamMember.findMany({ orderBy: { displayOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const body = await req.json();
  const { name, designation, bio, photoUrl, linkedinUrl, published, displayOrder } = body;
  if (!name || !designation) {
    return NextResponse.json({ error: "name and designation are required" }, { status: 400 });
  }
  const item = await db.teamMember.create({
    data: { name, designation, bio, photoUrl, linkedinUrl, published: published !== false, displayOrder: displayOrder || 0 },
  });
  return NextResponse.json(item, { status: 201 });
}

