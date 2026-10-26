import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
 
// PUT: update a post
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
 
  const { id } = await params;
  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, instagramUrl, published } = body;
 
  const existing = await db.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
 
  const post = await db.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage?.trim() || null,
      instagramUrl: instagramUrl?.trim() || null,
      published: !!published,
      // set publishedAt the first time a draft goes live; keep it once set
      publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
  });
 
  return NextResponse.json(post);
}
 
// DELETE: remove a post
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch (res) {
    return res as Response;
  }
 
  const { id } = await params;
  await db.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
