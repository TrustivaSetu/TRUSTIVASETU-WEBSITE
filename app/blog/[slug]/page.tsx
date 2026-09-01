"use client";
 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
 
type Post = {
  title: string;
  content: string;
  coverImage: string | null;
  publishedAt: string | null;
};
 
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
    return <div style={{ padding: "3rem", textAlign: "center" }}>Post not found.</div>;
  }
  if (!post) {
    return <div style={{ padding: "3rem", textAlign: "center" }}>Loading...</div>;
  }
 
  return (
    <article style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt={post.title} style={{ width: "100%", borderRadius: "10px", marginBottom: "1.5rem" }} />
      )}
      <h1 style={{ color: "#ffffff" }}>{post.title}</h1>
      {post.publishedAt && (
        <p style={{ color: "#aaaaaa", fontSize: "0.85rem" }}>
          {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      )}
      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#e5e5e5", marginTop: "1.5rem" }}>{post.content}</div>
    </article>
  );
}
