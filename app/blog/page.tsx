"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
};

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <BreadcrumbSchema title="Blog — Trustiva Setu" slug="blog" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24">
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Trustiva Setu Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights on healthcare financing
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              Perspectives on No-Cost EMI, clinic partnerships, lending
              infrastructure and the business of healthcare finance in India.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center max-w-xl mx-auto">
              <p className="text-gray-200 font-semibold mb-1">No articles published yet</p>
              <p className="text-gray-400 text-sm">Check back soon — we&apos;re working on it.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-lime-300/40 hover:bg-white/10"
                >
                  {p.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    {p.publishedAt && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-lime-300">
                        {new Date(p.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    <h2 className="text-lg font-semibold leading-6 text-white transition-colors group-hover:text-lime-300">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-400">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-semibold text-lime-300">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
