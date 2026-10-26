import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Fallback select for when `instagramUrl` isn't in the DB yet (migration pending).
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

// GET: list ALL posts (published + drafts) for the admin panel
export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  try {
    const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2022") {
      const posts = await db.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        select: BASE_FIELDS,
      });
      return NextResponse.json(posts);
    }
    throw err;
  }
}
 
// POST: create a new post
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
 
  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, instagramUrl, published } = body;
 
  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug, content are required" }, { status: 400 });
  }
 
  const post = await db.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage?.trim() || null,
      instagramUrl: instagramUrl?.trim() || null,
      published: !!published,
      publishedAt: published ? new Date() : null,
    },
  });
 
  return NextResponse.json(post, { status: 201 });
}
