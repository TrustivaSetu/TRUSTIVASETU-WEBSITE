"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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

// Ambient twinkle: a handful of small sparkles per card, each with its own
// position, size, duration and delay so they never blink in sync.
const sparkles = [
  // two in the natural eye-line, just above / just below the logo
  { top: "13%", left: "43%", size: 18, duration: "2.4s", delay: "0.3s" },
  { top: "83%", left: "57%", size: 14, duration: "2.0s", delay: "1.4s" },
  // three fanned out toward the edges
  { top: "20%", left: "10%", size: 20, duration: "3.0s", delay: "0s" },
  { top: "26%", left: "88%", size: 16, duration: "2.7s", delay: "0.9s" },
  { top: "72%", left: "16%", size: 13, duration: "2.3s", delay: "1.9s" },
];

export default function LendingPartners() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-[#bef264] text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
        Our Lending Partners
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Backed By Trusted Lending Partners
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.05, transition: { duration: 0.2 } }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            className="relative overflow-hidden flex items-center justify-center rounded-3xl bg-white ring-1 ring-black/5 px-8 py-6 min-h-[100px] min-w-[220px] shadow-[0_10px_35px_-10px_rgb(0_0_0_/_0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgb(190_242_100_/_0.45),0_10px_35px_-10px_rgb(0_0_0_/_0.4)]"
          >
            {sparkles.map((s, j) => (
              <span
                key={j}
                aria-hidden="true"
                className="partner-sparkle"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDuration: s.duration,
                  // Offset each card's set so the two cards don't twinkle alike.
                  animationDelay: `calc(${s.delay} + ${i * 0.4}s)`,
                }}
              />
            ))}

            <Image
              src={partner.logoLight}
              alt={`${partner.name} - Lending Partner`}
              width={274}
              height={80}
              className="relative z-10 h-10 sm:h-12 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
