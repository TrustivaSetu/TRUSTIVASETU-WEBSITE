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
  doctorPhotoUrl: string | null;
};

// Same ambient twinkle as the lending-partner cards (components/landing/
// LendingPartners.tsx), placed toward the card edges so the stars sit in the
// empty space around the centred logo and text.
const sparkles = [
  { top: "10%", left: "8%", size: 12, duration: "2.4s", delay: "0.3s" },
  { top: "18%", left: "88%", size: 10, duration: "2.0s", delay: "1.4s" },
  { top: "80%", left: "10%", size: 11, duration: "2.7s", delay: "0.9s" },
];

// Enough cards per marquee half to overfill a ~2400px-wide viewport.
const MIN_MARQUEE_CARDS = 14;

export default function ClinicsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clinics")
      .then((r) => r.json())
      .then((data) => {
        setItems(
          [...data].sort((a: Item, b: Item) =>
            a.name.localeCompare(b.name, "en", { sensitivity: "base" })
          )
        );
        setLoading(false);
      });
  }, []);

  // One half of the marquee. With only a handful of clinics a single pass is
  // narrower than a wide screen, which would leave a gap before the loop
  // restarts, so repeat the list until the half is comfortably wider.
  const marqueeSet =
    items.length === 0
      ? items
      : Array.from({ length: Math.ceil(MIN_MARQUEE_CARDS / items.length) }, () => items).flat();

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
            <div className="clinic-marquee">
              <div
                className="clinic-marquee__track"
                style={{ animationDuration: `${marqueeSet.length * 3.5}s` }}
              >
                {/* Two identical halves: the track slides by exactly -50%, so the
                    loop restarts on a frame that looks the same — no seam. */}
                {[0, 1].map((half) =>
                  marqueeSet.map((c, i) => (
                    <div
                      key={`${half}-${i}-${c.id}`}
                      aria-hidden={half === 1 || i >= items.length ? true : undefined}
                      className="relative w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center transition-colors hover:border-lime-300/40 hover:bg-white/10 sm:w-48"
                    >
                      {sparkles.map((s, j) => (
                        <span
                          key={j}
                          aria-hidden="true"
                          className="partner-sparkle partner-sparkle--on-dark"
                          style={{
                            top: s.top,
                            left: s.left,
                            width: s.size,
                            height: s.size,
                            animationDuration: s.duration,
                            // Offset each card's set so neighbouring cards don't twinkle alike.
                            animationDelay: `calc(${s.delay} + ${(i % 6) * 0.4}s)`,
                          }}
                        />
                      ))}

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 items-center justify-center sm:h-14">
                          {c.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.logoUrl}
                              alt={`${c.name} logo`}
                              loading="lazy"
                              className="h-12! w-28 rounded-xl bg-white object-contain p-1.5 sm:h-14! sm:w-32"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-lime-300 sm:h-14 sm:w-14">
                              {c.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <p className="line-clamp-2 text-sm font-bold leading-snug text-white">
                          {c.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[10px] font-semibold uppercase tracking-wider text-lime-300 sm:text-[11px]">
                          {c.specialty}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
