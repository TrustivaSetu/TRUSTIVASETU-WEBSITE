const steps = [
  {
    step: "01",
    title: "Choose Treatment",
    description: "Select your hospital or clinic and the treatment you plan to undergo.",
  },
  {
    step: "02",
    title: "Apply Online",
    description: "Submit your basic details and required documents through the digital application process.",
  },
  {
    step: "03",
    title: "Lender Evaluation",
    description: "Your application is evaluated by one or more lending partners based on their criteria.",
  },
  {
    step: "04",
    title: "Complete Treatment",
    description: "After approval and the required formalities, proceed with your planned healthcare treatment.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#bef264]">
          Process
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          How It Works
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          A simple four-step journey designed to help patients connect with healthcare financing.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.step}
            className="rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm p-6"
          >
            <div className="text-4xl font-bold text-[#bef264]">
              {step.step}
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
