"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
    <div className="min-h-screen bg-[#07111f] text-white">
      <BreadcrumbSchema title="Testimonials — Trustiva Setu" slug="testimonials" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24">
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Testimonials
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What our clinics say
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              Clinics and hospitals across India on partnering with Trustiva Setu
              for fast, No-Cost EMI patient financing.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center max-w-xl mx-auto">
              <p className="text-gray-200 font-semibold mb-1">No testimonials yet</p>
              <p className="text-gray-400 text-sm">Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((t) => (
                <figure
                  key={t.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-lime-300/40 hover:bg-white/10"
                >
                  <div className="mb-4 text-4xl leading-none text-lime-300" aria-hidden="true">
                    &ldquo;
                  </div>
                  <blockquote className="flex-1 text-gray-200 leading-8">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                    {t.photoUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="h-11 w-11 rounded-full border border-white/10 object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      {t.role && (
                        <p className="text-sm text-gray-400">{t.role}</p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
