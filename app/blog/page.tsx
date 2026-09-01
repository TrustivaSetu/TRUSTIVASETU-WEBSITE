"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
 
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
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "2rem" }}>TrustivaSetu Blog</h1>
      {loading ? (
        <p style={{ color: "#e5e5e5" }}>Loading...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: "#e5e5e5" }}>No articles published yet. Check back soon.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              style={{
                display: "block",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1.2rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {p.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverImage}
                  alt={p.title}
                  style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.8rem" }}
                />
              )}
              <h2 style={{ color: "#ffffff", margin: "0 0 0.4rem" }}>{p.title}</h2>
              {p.excerpt && <p style={{ color: "#cccccc", margin: 0 }}>{p.excerpt}</p>}
              {p.publishedAt && (
                <p style={{ color: "#999", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  {new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
