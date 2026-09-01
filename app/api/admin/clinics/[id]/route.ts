import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const { id } = await params;
  const body = await req.json();
  const { name, city, specialty, logoUrl, published, displayOrder } = body;
  const item = await db.publicClinic.update({
    where: { id },
    data: {
      name,
      city,
      specialty,
      logoUrl,
      published: !!published,
      displayOrder: displayOrder || 0,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const { id } = await params;
  await db.publicClinic.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
