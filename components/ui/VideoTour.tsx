"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const videos = [
  {
    id: "explainer",
    src: "/videos/explainer.mp4",
    title: "Trustiva Setu — Overview",
    description: "How clinics, lenders and patients connect on one platform.",
  },
  {
    id: "lms",
    src: "/videos/lms.mp4",
    title: "LMS Workflow",
    description: "A walkthrough of the internal lead management system.",
  },
  {
    id: "journey",
    src: "/videos/journey.mp4",
    title: "Onboarding to Disbursal",
    description: "The complete patient financing journey, end to end.",
  },
  {
    id: "reels",
    src: "/videos/reels.mp4",
    title: "Quick Look",
    description: "A short vertical cut of the Trustiva Setu story.",
  },
];

export default function VideoTour() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = videos.find((v) => v.id === openId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((v, i) => (
          <motion.button
            key={v.id}
            type="button"
            onClick={() => setOpenId(v.id)}
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative block w-full text-left rounded-3xl overflow-hidden border border-lime-300/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-lime-300/50 hover:shadow-[0_25px_70px_rgba(190,242,100,0.12)] transition-all duration-300 bg-white/5"
            aria-label={`Watch: ${v.title}`}
          >
            <video
              className="w-full aspect-video object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src={`${v.src}#t=0.5`} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-lime-300 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play size={24} fill="black" className="ml-1" />
              </span>
            </div>

            <div className="p-4">
              <p className="font-semibold text-white">{v.title}</p>
              <p className="text-sm text-gray-400 mt-1">{v.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#07111f]/95 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={(e) => e.target === e.currentTarget && setOpenId(null)}
          >
            <button
              onClick={() => setOpenId(null)}
              aria-label="Close video"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-lime-300 hover:text-black text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <motion.video
              key={active.id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl rounded-3xl border border-lime-300/20 shadow-2xl"
              controls
              autoPlay
              playsInline
            >
              <source src={active.src} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
