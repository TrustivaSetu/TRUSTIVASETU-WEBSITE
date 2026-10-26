"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function GromoAnnouncement() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-3xl bg-white/[0.045] backdrop-blur-sm border border-[#bef264]/30 px-6 sm:px-10 py-6 text-center sm:text-left"
      >
        <div className="flex items-center justify-center rounded-2xl bg-white px-5 py-3 shadow-[0_10px_30px_-10px_rgb(0_0_0_/_0.5)] shrink-0">
          <Image
            src="/logos/Gromo_Color_H.jpeg"
            alt="Gromo"
            width={300}
            height={100}
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

        <div>
          <p className="text-[#bef264] text-xs font-semibold tracking-[0.2em] uppercase mb-1">
            Now Available
          </p>
          <p className="text-white text-base sm:text-lg font-semibold leading-snug">
            Aggregator for Personal Loans now available at TrustivaSetu
          </p>
          <p className="text-gray-400 text-sm mt-1">
            TrustivaSetu is an aggregator for Gromo for personal loans.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
