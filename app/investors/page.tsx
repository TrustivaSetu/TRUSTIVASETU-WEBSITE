import type { Metadata } from "next";
import VideoPlayer from "@/components/ui/VideoPlayer";

export const metadata: Metadata = {
  title: "For Investors | Trustiva Setu",
  description:
    "Trustiva Setu's investor pitch deck and overview video — healthcare financing infrastructure for India.",
  alternates: {
    canonical: "https://www.trustivasetu.com/investors",
  },
  openGraph: {
    title: "For Investors | Trustiva Setu",
    description:
      "Healthcare financing infrastructure for India.",
    url: "https://www.trustivasetu.com/investors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Investors | Trustiva Setu",
    description:
      "Healthcare financing infrastructure for India.",
  },
};

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          For Investors
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-(--font-playfair) mb-4">
          Trustiva Setu
        </h1>
        <p className="text-gray-300 leading-7 mb-10">
          India&apos;s healthcare financing infrastructure layer — connecting
          clinics, lenders and patients through one embedded finance
          platform. Watch the overview below, or view the full pitch deck.
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <VideoPlayer src="/videos/explainer.mp4" />
        </div>

        <a
          href="/decks/investor-pitch-deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
        >
          View Investor Deck
        </a>
      </div>
    </main>
  );
}
