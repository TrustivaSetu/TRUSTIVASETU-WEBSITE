import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

// Columns that predate the `instagramUrl` addition — used as a fallback select
// so the route keeps working if it's deployed before `prisma db push` runs.
const BASE_FIELDS = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImage: true,
  published: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await db.blogPost.findFirst({ where: { slug, published: true } });
  } catch (err) {
    // P2022: column does not exist (migration pending). Retry without it.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2022") {
      post = await db.blogPost.findFirst({
        where: { slug, published: true },
        select: BASE_FIELDS,
      });
    } else {
      throw err;
    }
  }

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
