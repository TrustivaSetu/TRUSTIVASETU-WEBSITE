import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Clinics & Doctors — Trustiva Setu",
  description:
    "Trustiva Setu's clinic tie-up overview — instant patient financing, easy EMI approvals, and the full onboarding-to-disbursal journey.",
};

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          For Clinics &amp; Doctors
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-(--font-playfair) mb-4">
          Offer Instant Patient Financing
        </h1>
        <p className="text-gray-300 leading-7 mb-10">
          Help your patients start treatment without upfront cost worries —
          instant, paperless EMI approvals through Trustiva Setu&apos;s
          lender network. Watch the full patient journey below, or view the
          tie-up overview.
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <video className="w-full aspect-video" controls playsInline preload="metadata">
            <source src="/videos/journey.mp4" type="video/mp4" />
          </video>
        </div>

        <a
          href="/decks/doctors-clinics-deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
        >
          View Clinic Overview
        </a>
      </div>
    </main>
  );
}
