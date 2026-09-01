"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
};

const empty = { id: "", title: "", slug: "", excerpt: "", content: "", coverImage: "", published: false };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<typeof empty | Post>(empty);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  async function loadPosts() {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function slugify(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const isEdit = "id" in editing && editing.id;
    const url = isEdit ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    if (!res.ok) {
      const data = await res.json();
      setMsg(data.error || "Save failed");
      return;
    }

    setEditing(empty);
    setMsg("Saved.");
    loadPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    loadPosts();
  }

  return (
    <div style={styles.wrap}>
      <nav style={styles.nav}>
        <Link href="/admin/blog" style={{ ...styles.navLink, fontWeight: 700 }}>Blog</Link>
        <Link href="/admin/testimonials" style={styles.navLink}>Testimonials</Link>
        <Link href="/admin/team" style={styles.navLink}>Team</Link>
        <Link href="/admin/clinics" style={styles.navLink}>Clinics</Link>
      </nav>
      <h1 style={styles.h1}>Blog Manager</h1>

      <form onSubmit={handleSave} style={styles.form}>
        <h2 style={styles.h2}>{"id" in editing && editing.id ? "Edit Post" : "New Post"}</h2>
        <input
          style={styles.input}
          placeholder="Title"
          value={editing.title}
          onChange={(e) =>
            setEditing({
              ...editing,
              title: e.target.value,
              slug: editing.slug || slugify(e.target.value),
            })
          }
          required
        />
        <input
          style={styles.input}
          placeholder="Slug (url)"
          value={editing.slug}
          onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
          required
        />
        <input
          style={styles.input}
          placeholder="Cover image URL (optional)"
          value={editing.coverImage || ""}
          onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
        />
        <textarea
          style={{ ...styles.input, height: "60px" }}
          placeholder="Short excerpt"
          value={editing.excerpt || ""}
          onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
        />
        <textarea
          style={{ ...styles.input, height: "200px" }}
          placeholder="Full content (Markdown or plain text)"
          value={editing.content}
          onChange={(e) => setEditing({ ...editing, content: e.target.value })}
          required
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={editing.published}
            onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
          />
          {" "}Published (visible on website)
        </label>
        {msg && <p style={{ color: "#07111f" }}>{msg}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" style={styles.button}>
            {"id" in editing && editing.id ? "Update" : "Create"}
          </button>
          {"id" in editing && editing.id && (
            <button type="button" style={styles.buttonSecondary} onClick={() => setEditing(empty)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={styles.h2}>All Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>{p.title}</td>
                <td style={styles.td}>{p.published ? "Published" : "Draft"}</td>
                <td style={styles.td}>
                  <button style={styles.linkBtn} onClick={() => setEditing(p)}>
                    Edit
                  </button>{" "}
                  <button style={{ ...styles.linkBtn, color: "#c0392b" }} onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: "800px", margin: "2rem auto", padding: "2rem", fontFamily: "system-ui, sans-serif", background: "#ffffff", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" },
  nav: { display: "flex", gap: "1.2rem", marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.8rem" },
  navLink: { color: "#07111f", textDecoration: "none" },
  h1: { color: "#07111f" },
  h2: { color: "#07111f", fontSize: "1.1rem", marginTop: "1.5rem" },
  form: { border: "1px solid #ddd", borderRadius: "10px", padding: "1.2rem", marginBottom: "2rem" },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#ffffff",
    color: "#111111",
  },
  checkboxLabel: { display: "block", marginBottom: "0.8rem", fontSize: "0.9rem" },
  button: {
    padding: "0.6rem 1.2rem",
    background: "#07111f",
    color: "#bef264",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "0.6rem 1.2rem",
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", borderBottom: "2px solid #ddd", padding: "0.5rem" },
  td: { borderBottom: "1px solid #eee", padding: "0.5rem" },
  linkBtn: { background: "none", border: "none", color: "#07111f", textDecoration: "underline", cursor: "pointer", padding: 0 },
};

