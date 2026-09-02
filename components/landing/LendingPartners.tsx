import Image from "next/image";

const partners = [
  {
    name: "CleverPe",
    logoLight: "/logos/CleverPe_Black_H.png",
    logoDark: "/logos/CleverPe_White_H.png",
  },
  {
    name: "Paytm",
    logoLight: "/logos/Paytm_Black_H.png",
    logoDark: "/logos/Paytm_White_H.png",
  },
];

export default function LendingPartners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-[#bef264] text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
        Our Lending Partners
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Backed By Trusted Lending Partners
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex items-center justify-center bg-white/10 border border-lime-300/20 rounded-3xl px-8 py-6 min-h-[100px] min-w-[220px]"
          >
            <Image
              src={partner.logoDark}
              alt={`${partner.name} - Lending Partner`}
              width={274}
              height={80}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
