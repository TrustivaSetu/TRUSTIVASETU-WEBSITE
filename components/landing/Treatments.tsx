import { landingData } from "@/lib/landing-data";
const treatments = [
  {
    title: "IVF & Fertility",
    description: "Finance fertility treatments with flexible repayment options.",
  },
  {
    title: "Dental Treatment",
    description: "Support for implants, aligners, smile makeover and more.",
  },
  {
    title: "Hair Transplant",
    description: "Affordable financing for advanced hair restoration procedures.",
  },
  {
    title: "Cosmetic Surgery",
    description: "Finance elective cosmetic and aesthetic procedures.",
  },
  {
    title: "Eye Surgery",
    description: "Funding support for LASIK, cataract and vision correction.",
  },
  {
    title: "Orthopedic Surgery",
    description: "Medical financing for bone and joint procedures.",
  },
  {
    title: "General Surgery",
    description: "Support for planned surgical treatments across specialties.",
  },
  {
    title: "Other Treatments",
    description: "Healthcare financing for many other planned medical expenses.",
  },
];

export default function Treatments({
  page = "medical",
}: {
  page?: keyof typeof landingData;
}) {
  const treatments = landingData[page].treatments;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#bef264]">
          Treatments
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          Treatments We Finance
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          Trustiva Setu helps patients access financing for planned healthcare
          procedures through our lending partner network.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {treatments.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#bef264]/50"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-3 text-sm leading-7 text-gray-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
