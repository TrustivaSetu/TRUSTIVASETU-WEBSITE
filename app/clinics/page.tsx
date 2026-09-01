"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  city: string;
  specialty: string;
  logoUrl: string | null;
};

export default function ClinicsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clinics")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "2rem" }}>Our Partner Clinics</h1>
      {loading ? (
        <p style={{ color: "#e5e5e5" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#e5e5e5" }}>No clinics yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {items.map((c) => (
            <div key={c.id} style={{ border: "1px solid #333", borderRadius: "10px", padding: "1.4rem", textAlign: "center" }}>
              {c.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logoUrl} alt={c.name} style={{ width: "88px", height: "88px", borderRadius: "12px", objectFit: "contain", margin: "0 auto 0.8rem", background: "#ffffff", padding: "6px" }} />
              )}
              <p style={{ color: "#ffffff", fontWeight: 700, margin: "0 0 0.2rem" }}>{c.name}</p>
              <p style={{ color: "#bef264", fontSize: "0.85rem", margin: "0 0 0.4rem" }}>{c.specialty}</p>
              <p style={{ color: "#cccccc", fontSize: "0.9rem", margin: 0 }}>{c.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
