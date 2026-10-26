const points = [
  "Indian resident aged 18 years or above",
  "Valid PAN and Aadhaar",
  "Regular source of income (salaried or self-employed)",
  "Basic KYC documents",
  "Treatment at an eligible healthcare provider",
  "Final eligibility is determined by the lending partner",
];

export default function Eligibility() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#bef264]">
            Eligibility
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Who Can Apply?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
            General eligibility requirements for healthcare financing. Final
            approval depends on the lending partner's assessment.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0d1b2d] p-5"
            >
              <span className="font-bold text-[#bef264]">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
