/**
 * One-off fix for the "trustivasetu-leads-processing-coming-soon" blog post.
 *
 * The Instagram reel URL was entered into the `coverImage` field (there was no
 * dedicated field for it), which rendered a broken <img> and no embed.
 *
 * Run AFTER `npx prisma db push` has added the new `instagramUrl` column:
 *   node scripts/fix-instagram-post.mjs
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const SLUG = "trustivasetu-leads-processing-coming-soon";

const post = await db.blogPost.findFirst({ where: { slug: SLUG } });
if (!post) {
  console.error(`No post found with slug "${SLUG}"`);
  process.exit(1);
}

console.log("Before:", {
  coverImage: post.coverImage,
  instagramUrl: post.instagramUrl,
});

const looksLikeInstagram =
  typeof post.coverImage === "string" && /instagram\.com/i.test(post.coverImage);

const instagramUrl = looksLikeInstagram
  ? post.coverImage.trim()
  : post.instagramUrl ??
    "https://www.instagram.com/reel/DcvRq7gz7vu/?igsi=MTRuaHpyZmZxbjk1bg==";

const updated = await db.blogPost.update({
  where: { id: post.id },
  data: {
    instagramUrl,
    // clear coverImage only if it was holding the Instagram URL
    coverImage: looksLikeInstagram ? null : post.coverImage,
  },
});

console.log("After:", {
  coverImage: updated.coverImage,
  instagramUrl: updated.instagramUrl,
});

await db.$disconnect();
