"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
};

export default function TeamPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "2rem" }}>Our Team</h1>
      {loading ? (
        <p style={{ color: "#e5e5e5" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#e5e5e5" }}>No team members yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {items.map((m) => (
            <div key={m.id} style={{ border: "1px solid #333", borderRadius: "10px", padding: "1.4rem", textAlign: "center" }}>
              {m.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photoUrl} alt={m.name} style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 0.8rem" }} />
              )}
              <p style={{ color: "#ffffff", fontWeight: 700, margin: "0 0 0.2rem" }}>{m.name}</p>
              <p style={{ color: "#bef264", fontSize: "0.85rem", margin: "0 0 0.6rem" }}>{m.designation}</p>
              {m.bio && <p style={{ color: "#cccccc", fontSize: "0.9rem", margin: "0 0 0.6rem" }}>{m.bio}</p>}
              {m.linkedinUrl && (
                <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#999", fontSize: "0.85rem" }}>
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

