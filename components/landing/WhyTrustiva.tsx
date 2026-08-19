const features = [
  {
    title: "Multiple Lending Partners",
    description: "Access financing options through our network of trusted financial institutions.",
  },
  {
    title: "Fast Digital Journey",
    description: "Simple online application with a streamlined approval process.",
  },
  {
    title: "Transparent Financing",
    description: "Clear communication about financing terms and repayment before you proceed.",
  },
  {
    title: "Pan India Network",
    description: "Serving patients and healthcare providers across India.",
  },
];

export default function WhyTrustiva() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#bef264]">
          Why Trustiva Setu
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          Why Patients Choose Us
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          We connect patients, healthcare providers and lending partners through
          a simple, transparent and digital financing experience.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm p-6 transition hover:-translate-y-1 hover:border-[#bef264]/40 hover:shadow-[0_18px_50px_rgba(190,242,100,0.06)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#bef264] text-[#07111f] font-bold">
              ✓
            </div>

            <h3 className="text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
