import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.teamMember.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(items);
}

