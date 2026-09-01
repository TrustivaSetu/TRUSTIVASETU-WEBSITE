"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  photoUrl: string | null;
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "2rem" }}>What Our Clinics Say</h1>
      {loading ? (
        <p style={{ color: "#e5e5e5" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#e5e5e5" }}>No testimonials yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {items.map((t) => (
            <div key={t.id} style={{ border: "1px solid #333", borderRadius: "10px", padding: "1.4rem" }}>
              {t.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.photoUrl} alt={t.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", marginBottom: "0.8rem" }} />
              )}
              <p style={{ color: "#e5e5e5", fontStyle: "italic", margin: "0 0 1rem" }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ color: "#ffffff", fontWeight: 600, margin: 0 }}>{t.name}</p>
              {t.role && <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>{t.role}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

