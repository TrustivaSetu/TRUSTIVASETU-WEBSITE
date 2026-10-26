import { landingData } from "@/lib/landing-data";

const highlights = [
  "Multiple Lending Partners",
  "Digital Loan Journey",
  "Transparent Process",
  "Pan India Coverage",
];

export default function Hero({
  page = "medical",
}: {
  page?: keyof typeof landingData;
}) {
  const content = landingData[page];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#07111f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(190,242,100,0.14),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">

        <div className="max-w-3xl">

          <span className="inline-flex rounded-full border border-[#bef264]/40 bg-[#bef264]/10 px-4 py-2 text-sm font-medium text-[#bef264]">
            Healthcare Financing Platform
          </span>

          <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.035em] lg:text-6xl">
            {content.heroTitle}
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-slate-300">
            {content.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href={`/for-patients?treatment=${encodeURIComponent(content.title.replace(/\s+Loan(?:\s+in\s+India)?$/i, ""))}#patients`}
              className="rounded-xl bg-[#bef264] px-8 py-4 font-semibold text-[#07111f] shadow-[0_12px_35px_rgba(190,242,100,0.14)] transition hover:-translate-y-0.5 hover:bg-[#d9f99d] hover:shadow-[0_16px_40px_rgba(190,242,100,0.20)]"
            >
              Apply Now
            </a>

            <a
              href="/partners/doctors"
              className="rounded-xl border border-white/15 bg-white/[0.025] px-8 py-4 font-semibold transition hover:-translate-y-0.5 hover:border-[#bef264]/60 hover:bg-white/[0.05] hover:text-[#bef264]"
            >
              Become a Clinic Partner
            </a>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                ✓ {item}
              </div>
            ))}

          </div>

        </div>

        <div className="mt-16 lg:mt-0 lg:w-[430px]">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

            <h2 className="text-2xl font-bold">
              Treatments We Finance
            </h2>

            <div className="mt-6 space-y-3">

              {content.treatments.map((t) => (
                <div
                  key={t.title}
                  className="rounded-xl border border-white/10 bg-[#0d1b2d] px-4 py-3"
                >
                  <div className="font-medium">
                    {t.title}
                  </div>

                  <div className="mt-1 text-sm text-gray-400">
                    {t.description}
                  </div>

                </div>
              ))}

            </div>

            <div className="mt-8 rounded-xl bg-[#bef264] p-5 text-[#07111f]">

              <div className="text-sm font-semibold">
                Trusted Lending Network
              </div>

              <div className="mt-2 text-2xl font-bold">
                Simple • Fast • Transparent
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
