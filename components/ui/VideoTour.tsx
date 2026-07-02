"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

/**
 * VideoTour — Trustiva Setu website
 * -----------------------------------------------------------------------
 * Single-column video section: sits between the Hero and "How It Works".
 * Autoplay muted loop up top; tapping it opens the full tour in a modal.
 *
 * Assets expected in /public/journey/:
 *   hero-loop.webm, hero-loop.mp4, hero-poster.jpg, full-tour.mp4
 *
 * Usage in app/page.tsx — import at top:
 *   import VideoTour from "@/components/ui/VideoTour";
 * Then render right after the closing </section> of the Hero block,
 * before {/* HOW IT WORKS *\/}:
 *   <VideoTour />
 */
export default function VideoTour() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          See It In Motion
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          The Trustiva Setu Tour
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          A quick look at how clinics, lenders and patients move through one
          connected platform.
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="group relative block w-full rounded-4xl overflow-hidden border border-lime-300/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-lime-300/50 hover:shadow-[0_25px_70px_rgba(190,242,100,0.12)] transition-all duration-300"
        aria-label="Watch the full Trustiva Setu tour"
      >
        <video
          className="w-full aspect-square object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/journey/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/journey/hero-loop.webm" type="video/webm" />
          <source src="/journey/hero-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
          <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lime-300 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play size={28} fill="black" className="ml-1" />
          </span>
        </div>

        <span className="absolute bottom-4 left-4 text-xs font-semibold tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
          Watch full tour
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#07111f]/95 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Trustiva Setu full tour video"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-lime-300 hover:text-black text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <motion.video
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-3xl border border-lime-300/20 shadow-2xl"
              controls
              autoPlay
              playsInline
            >
              <source src="/journey/full-tour.mp4" type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
