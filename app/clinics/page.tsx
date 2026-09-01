"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
    <div className="min-h-screen bg-[#07111f] text-white">
      <BreadcrumbSchema title="Partner Clinics — Trustiva Setu" slug="clinics" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24">
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Partner Clinics
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Clinics offering No-Cost EMI with Trustiva Setu
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              A growing network of clinics and hospitals across India where
              patients can finance their treatment through Trustiva Setu.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center max-w-xl mx-auto">
              <p className="text-gray-200 font-semibold mb-1">Clinic directory coming soon</p>
              <p className="text-gray-400 text-sm">
                We&apos;re onboarding partner clinics — check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-lime-300/40 hover:bg-white/10"
                >
                  {c.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.logoUrl}
                      alt={c.name}
                      className="mb-4 h-20 w-20 rounded-2xl bg-white object-contain p-2"
                    />
                  ) : (
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl font-bold text-lime-300">
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <p className="text-lg font-bold text-white">{c.name}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-lime-300">
                    {c.specialty}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">{c.city}</p>
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
