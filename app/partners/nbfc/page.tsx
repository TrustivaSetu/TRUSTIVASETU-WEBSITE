import type { Metadata } from "next";
import VideoPlayer from "@/components/ui/VideoPlayer";

export const metadata: Metadata = {
  title: "For NBFC Partners | Trustiva Setu",
  description:
    "Multi-lender routing infrastructure for healthcare financing.",
  alternates: {
    canonical: "https://www.trustivasetu.com/partners/nbfc",
  },
  openGraph: {
    title: "For NBFC Partners | Trustiva Setu",
    description:
      "Healthcare lending infrastructure.",
    url: "https://www.trustivasetu.com/partners/nbfc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For NBFC Partners | Trustiva Setu",
    description:
      "Healthcare lending infrastructure.",
  },
};

export default function NbfcPartnersPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          For NBFC &amp; Lending Partners
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-(--font-playfair) mb-4">
          Partner With Trustiva Setu
        </h1>
        <p className="text-gray-300 leading-7 mb-10">
          Multi-lender routing, faster approvals and a pan-India clinic
          network — built for banking and NBFC ecosystem partners. Watch how
          the workflow operates, or view the full partnership deck.
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <VideoPlayer src="/videos/lms.mp4" />
        </div>

        <a
          href="/decks/nbfc-partnership-deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
        >
          View Partnership Deck
        </a>
      </div>
    </main>
  );
}
