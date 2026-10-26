import { NextResponse } from "next/server";
import { db } from "@/lib/db";
 
// Public endpoint — used by the /blog page on the live website.
// Only ever returns published posts; drafts stay invisible to visitors.
export async function GET() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  });
  return NextResponse.json(posts);
}
