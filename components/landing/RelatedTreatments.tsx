import Link from "next/link";
import { landingData } from "@/lib/landing-data";

export default function RelatedTreatments({
  page,
}: {
  page: keyof typeof landingData;
}) {
  const curatedLinks: Partial<Record<keyof typeof landingData, string[]>> = {
    medical: [
      "ivf",
      "fertility-preservation",
      "egg-freezing",
      "dental",
      "dental-implant",
      "hair-transplant",
    ],
    rhinoplasty: [
      "cosmetic-surgery",
      "plastic-surgery",
      "medical",
      "liposuction",
      "gynecomastia",
      "hair-transplant",
    ],
  };

  const selectedLinks = curatedLinks[page];

  const items = selectedLinks
    ? selectedLinks
        .filter((key) => key in landingData && key !== page)
        .map((key) => [key, landingData[key as keyof typeof landingData]] as const)
    : Object.entries(landingData)
        .filter(([key]) => key !== page)
        .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-3xl font-bold">
        Related Healthcare Financing
      </h2>

      <p className="mt-4 max-w-3xl text-gray-400">
        Explore financing options for other planned medical treatments.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([key, item]) => (
          <Link
            key={key}
            href={`/${key}-loan`}
            className="rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm p-6 transition hover:border-[#bef264]"
          >
            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
