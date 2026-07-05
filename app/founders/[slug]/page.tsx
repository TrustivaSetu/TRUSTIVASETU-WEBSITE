import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { founders, getFounderBySlug } from "@/data/founders";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";
import FounderContactActions from "@/components/ui/FounderContactActions";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) return {};
  const title = `${founder.name} — Trustiva Setu`;
  const description = `${founder.role} at Trustiva Setu. ${founder.focus}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.trustivasetu.com/founders/${founder.slug}`,
      siteName: "Trustiva Setu",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) return notFound();

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link
          href="/founders"
          className="text-sm text-lime-300/70 hover:text-lime-300 transition"
        >
          ← Back to team
        </Link>

        <div className="mt-8 bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
              <AnimatedAvatar name={founder.name} />
            </div>
          </div>

          <h1 className="text-3xl font-bold font-(--font-playfair)">{founder.name}</h1>
          <p className="text-lime-300 font-semibold mt-2">{founder.role}</p>

          {founder.experience && (
            <p className="text-gray-300 text-sm mt-3">{founder.experience}</p>
          )}

          {founder.focus && (
            <p className="text-gray-300 text-sm mt-4 leading-6">{founder.focus}</p>
          )}

          {founder.expertise.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {founder.expertise.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full border border-lime-300/30 text-lime-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-1 text-sm text-gray-300">
            <p>{founder.phoneDisplay}</p>
            <p>{founder.email}</p>
          </div>

          <FounderContactActions founder={founder} />

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              Share a tailored page
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href={`/founders/${founder.slug}/investors`}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-lime-300/30 text-lime-300 hover:bg-lime-300/10 transition"
              >
                For Investors
              </Link>
              <Link
                href={`/founders/${founder.slug}/nbfc`}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-lime-300/30 text-lime-300 hover:bg-lime-300/10 transition"
              >
                For NBFC Partners
              </Link>
              <Link
                href={`/founders/${founder.slug}/doctors`}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-lime-300/30 text-lime-300 hover:bg-lime-300/10 transition"
              >
                For Clinics &amp; Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
