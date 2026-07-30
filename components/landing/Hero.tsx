const highlights = [
  "Multiple Lending Partners",
  "Fast Digital Journey",
  "Transparent Process",
  "Pan India Network",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(190,242,100,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[#bef264]/40 bg-[#bef264]/10 px-4 py-2 text-sm font-medium text-[#bef264]">
            Healthcare Financing Platform
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-6xl">
            Medical Loans Made
            <span className="block text-[#bef264]">
              Simple & Accessible
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            Finance planned healthcare expenses including IVF, Dental,
            Hair Transplant, Cosmetic Surgery and other medical treatments
            through Trustiva Setu&apos;s lending partner network.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/"
              className="rounded-xl bg-[#bef264] px-6 py-4 font-semibold text-[#07111f] transition hover:scale-105"
            >
              Apply for Financing
            </a>

            <a
              href="/partners/doctors"
              className="rounded-xl border border-white/20 px-6 py-4 font-semibold transition hover:border-[#bef264] hover:text-[#bef264]"
            >
              Partner With Us
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:w-[420px]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold">
              Treatments We Finance
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                "IVF",
                "Dental",
                "Hair Transplant",
                "Eye Care",
                "Cosmetic",
                "Orthopedic",
                "General Surgery",
                "More",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-[#0d1b2d] p-4 text-center"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-[#bef264] p-5 text-[#07111f]">
              <div className="text-sm font-medium">
                Trusted Healthcare Financing
              </div>

              <div className="mt-2 text-2xl font-bold">
                Simple • Digital • Transparent
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
