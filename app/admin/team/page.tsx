"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
  published: boolean;
  displayOrder: number;
};

const empty = { id: "", name: "", designation: "", bio: "", photoUrl: "", linkedinUrl: "", published: true, displayOrder: 0 };

export default function AdminTeamPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<typeof empty | Item>(empty);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/team");
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const isEdit = "id" in editing && editing.id;
    const url = isEdit ? `/api/admin/team/${editing.id}` : "/api/admin/team";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (!res.ok) {
      setMsg((await res.json()).error || "Save failed");
      return;
    }
    setEditing(empty);
    setMsg("Saved.");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div style={styles.wrap}>
      <nav style={styles.nav}>
        <Link href="/admin/blog" style={styles.navLink}>Blog</Link>
        <Link href="/admin/testimonials" style={styles.navLink}>Testimonials</Link>
        <Link href="/admin/team" style={{ ...styles.navLink, fontWeight: 700 }}>Team</Link>
        <Link href="/admin/clinics" style={styles.navLink}>Clinics</Link>
      </nav>
      <h1 style={styles.h1}>Team Manager</h1>

      <form onSubmit={handleSave} style={styles.form}>
        <h2 style={styles.h2}>{"id" in editing && editing.id ? "Edit Member" : "New Member"}</h2>
        <input style={styles.input} placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required />
        <input style={styles.input} placeholder="Designation (e.g. Co-Founder & CEO)" value={editing.designation} onChange={(e) => setEditing({ ...editing, designation: e.target.value })} required />
        <input style={styles.input} placeholder="Photo URL (optional)" value={editing.photoUrl || ""} onChange={(e) => setEditing({ ...editing, photoUrl: e.target.value })} />
        <input style={styles.input} placeholder="LinkedIn URL (optional)" value={editing.linkedinUrl || ""} onChange={(e) => setEditing({ ...editing, linkedinUrl: e.target.value })} />
        <textarea style={{ ...styles.input, height: "100px" }} placeholder="Bio (optional)" value={editing.bio || ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
        <input style={styles.input} type="number" placeholder="Display order (lower shows first)" value={editing.displayOrder} onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
        <label style={styles.checkboxLabel}>
          <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
        </label>
        {msg && <p style={{ color: "#07111f" }}>{msg}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" style={styles.button}>{"id" in editing && editing.id ? "Update" : "Create"}</button>
          {"id" in editing && editing.id && <button type="button" style={styles.buttonSecondary} onClick={() => setEditing(empty)}>Cancel</button>}
        </div>
      </form>

      <h2 style={styles.h2}>All Team Members</h2>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p>None yet.</p> : (
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Designation</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td style={styles.td}>{it.name}</td>
                <td style={styles.td}>{it.designation}</td>
                <td style={styles.td}>{it.published ? "Published" : "Draft"}</td>
                <td style={styles.td}>
                  <button style={styles.linkBtn} onClick={() => setEditing(it)}>Edit</button>{" "}
                  <button style={{ ...styles.linkBtn, color: "#c0392b" }} onClick={() => handleDelete(it.id)}>Delete</button>
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
  input: { width: "100%", padding: "0.6rem", marginBottom: "0.8rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box", fontFamily: "inherit", background: "#ffffff", color: "#111111" },
  checkboxLabel: { display: "block", marginBottom: "0.8rem", fontSize: "0.9rem" },
  button: { padding: "0.6rem 1.2rem", background: "#07111f", color: "#bef264", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" },
  buttonSecondary: { padding: "0.6rem 1.2rem", background: "#eee", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", borderBottom: "2px solid #ddd", padding: "0.5rem" },
  td: { borderBottom: "1px solid #eee", padding: "0.5rem" },
  linkBtn: { background: "none", border: "none", color: "#07111f", textDecoration: "underline", cursor: "pointer", padding: 0 },
};

