import Link from "next/link";
import { founders } from "@/data/founders";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";

export const metadata = {
  title: "Our Team — Trustiva Setu",
  description:
    "Meet the founding team behind Trustiva Setu — deep experience across banking, NBFC lending and healthcare fintech, building India's healthcare financing infrastructure layer.",
  alternates: {
    canonical: "https://www.trustivasetu.com/founders",
  },
};

export default function FoundersDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold font-(--font-playfair) text-center mb-14">
          Founding Team
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {founders.map((f) => (
            <Link
              key={f.slug}
              href={`/founders/${f.slug}`}
              className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300 block"
            >
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
                  <AnimatedAvatar name={f.name} />
                </div>
              </div>
              <h3 className="text-2xl font-bold">{f.name}</h3>
              <p className="text-lime-300 font-semibold mt-1">{f.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
