import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
 
// GET: list ALL posts (published + drafts) for the admin panel
export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}
 
// POST: create a new post
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
 
  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, published } = body;
 
  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug, content are required" }, { status: 400 });
  }
 
  const post = await db.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published: !!published,
      publishedAt: published ? new Date() : null,
    },
  });
 
  return NextResponse.json(post, { status: 201 });
}
