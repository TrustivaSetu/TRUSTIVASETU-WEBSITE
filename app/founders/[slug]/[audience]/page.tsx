import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { founders, getFounderBySlug } from "@/data/founders";
import { audiences, getAudienceBySlug } from "@/data/audiences";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";
import VideoPlayer from "@/components/ui/VideoPlayer";

export function generateStaticParams() {
  const params: { slug: string; audience: string }[] = [];
  for (const f of founders) {
    for (const a of audiences) {
      params.push({ slug: f.slug, audience: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; audience: string }>;
}): Promise<Metadata> {
  const { slug, audience } = await params;
  const founder = getFounderBySlug(slug);
  const aud = getAudienceBySlug(audience);
  if (!founder || !aud) return {};
  return {
    title: `${aud.eyebrow} — ${founder.name}, Trustiva Setu`,
    description: aud.description,
  };
}

export default async function FounderAudiencePage({
  params,
}: {
  params: Promise<{ slug: string; audience: string }>;
}) {
  const { slug, audience } = await params;
  const founder = getFounderBySlug(slug);
  const aud = getAudienceBySlug(audience);
  if (!founder || !aud) return notFound();

  const shareText = encodeURIComponent(
    `${aud.eyebrow} — Trustiva Setu\nShared by ${founder.name} (${founder.role})\nPhone: ${founder.phoneDisplay}\nEmail: ${founder.email}`
  );

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          {aud.eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-(--font-playfair) mb-4">
          {aud.heading}
        </h1>
        <p className="text-gray-300 leading-7 mb-10">{aud.description}</p>

        <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <VideoPlayer src={aud.video} />
        </div>

        <a
          href={aud.deck}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
        >
          {aud.ctaLabel}
        </a>

        <div className="mt-14 bg-white/5 border border-lime-300/15 rounded-3xl p-6 sm:p-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">
            Shared by
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-lime-300/30 shrink-0">
              <AnimatedAvatar name={founder.name} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold">{founder.name}</p>
              <p className="text-lime-300 text-sm font-semibold mb-3">{founder.role}</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                <a href={`tel:${founder.phone}`} className="text-gray-300 hover:text-lime-300 transition">
                  {founder.phoneDisplay}
                </a>
                <a href={`mailto:${founder.email}`} className="text-gray-300 hover:text-lime-300 transition break-all">
                  {founder.email}
                </a>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 text-sm text-lime-300/80 hover:text-lime-300 underline underline-offset-4"
          >
            Share this page on WhatsApp
          </a>
        </div>

        <Link
          href={`/founders/${founder.slug}`}
          className="inline-block mt-8 text-sm text-gray-400 hover:text-lime-300 transition"
        >
          ← Back to {founder.name}&apos;s profile
        </Link>
      </div>
    </main>
  );
}
