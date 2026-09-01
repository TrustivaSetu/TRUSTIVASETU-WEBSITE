"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
    <div className="min-h-screen bg-[#07111f] text-white">
      <BreadcrumbSchema title="Team — Trustiva Setu" slug="team" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24">
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Our Team
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The people building Trustiva Setu
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              A team focused on connecting patients, clinics and lending partners
              into one healthcare financing infrastructure.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center max-w-xl mx-auto">
              <p className="text-gray-200 font-semibold mb-1">Team profiles coming soon</p>
              <p className="text-gray-400 text-sm">Check back shortly.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-lime-300/40 hover:bg-white/10"
                >
                  {m.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="mb-4 h-24 w-24 rounded-full border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl font-bold text-lime-300">
                      {m.name.charAt(0)}
                    </div>
                  )}
                  <p className="text-lg font-bold text-white">{m.name}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-lime-300">
                    {m.designation}
                  </p>
                  {m.bio && (
                    <p className="mt-3 text-sm leading-6 text-gray-400">{m.bio}</p>
                  )}
                  {m.linkedinUrl && (
                    <a
                      href={m.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm font-semibold text-gray-300 transition-colors hover:text-lime-300"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
