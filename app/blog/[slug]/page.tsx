"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Post = {
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Navbar />
      <div className="pt-6 sm:pt-8">{children}</div>
      <Footer />
    </div>
  );
}

const backLink = (
  <Link
    href="/blog"
    className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-lime-300"
  >
    <span aria-hidden="true">←</span> Back to Blog
  </Link>
);

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`).then(async (r) => {
      if (r.status === 404) {
        setNotFound(true);
        return;
      }
      setPost(await r.json());
    });
  }, [slug]);

  if (notFound) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 className="mb-3 text-2xl font-bold text-white">Post not found</h1>
          <p className="mb-8 text-gray-400">
            This article may have been moved or unpublished.
          </p>
          {backLink}
        </div>
      </Shell>
    );
  }

  if (!post) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <p className="text-gray-400">Loading…</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 scroll-mt-24">
        <div className="mb-8">{backLink}</div>

        <header className="mb-8">
          {post.publishedAt && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
        </header>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-8 w-full rounded-3xl border border-white/10"
          />
        )}

        {post.excerpt && (
          <section className="mb-8 rounded-3xl border border-lime-300/20 bg-white/5 p-6 sm:p-8">
            <p className="text-lg leading-8 text-gray-200">{post.excerpt}</p>
          </section>
        )}

        <div className="whitespace-pre-wrap text-lg leading-8 text-gray-200">
          {post.content}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">{backLink}</div>
      </article>
    </Shell>
  );
}
