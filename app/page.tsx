"use client";

import React from "react";
import Counter from "@/components/home/Counter";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import LendingPartners from "@/components/landing/LendingPartners";
import EligibilityWidget from "@/components/home/EligibilityWidget";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { celebrate, triggerShine } from "@/lib/celebrate";

export default function TrustivaSetuWebsite() {
  const howItWorksSteps = [
    {
      step: "01",
      title: "RM Lead Punch",
      timing: "~2 min",
      desc: "Relationship Manager punches the patient lead directly into the LMS at the clinic. No paperwork. No delay.",
      icon: "📋",
    },
    {
      step: "02",
      title: "Instant Approval Decision",
      timing: "Under 2 min",
      desc: "Quick & simple approval process — patient eligibility assessed in seconds across multiple lenders.",
      icon: "⚡",
    },
    {
      step: "03",
      title: "Offer Select & Confirm",
      timing: "8–10 min",
      desc: "Best No Cost EMI offers from multiple lenders displayed. Patient selects the most suitable plan.",
      icon: "🎯",
    },
    {
      step: "04",
      title: "Disbursal",
      timing: "Same Day or Within 24 Hrs*",
      desc: "Funds disbursed directly to the hospital/clinic. Patient begins treatment immediately.",
      icon: "🏦",
      note: "*Excl. public holidays, weekends & festivals",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#07111f] text-white">
        <WebSiteSchema />
        <Navbar />

        {/* HERO */}
        <section
          id="home"
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6 scroll-mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 md:gap-8 items-center">
            {/* LEFT COLUMN — text, CTA, eligibility widget */}
            <div>
              <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] mb-3">
                Medical loans and no-cost EMI for healthcare, across India.
              </h1>
              <p className="text-slate-300 text-base md:text-xl leading-6 md:leading-7 max-w-xl mb-4">
                Trustiva Setu connects patients, clinics and lending partners in one
                financing infrastructure covering IVF, dental, cosmetic surgery and more.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/for-clinics#clinics">
                  <button
                    className="premium-btn premium-green-btn btn-shine"
                    onClick={(e) => {
                      triggerShine(e.currentTarget);
                      celebrate(e.currentTarget);
                    }}
                  >
                    <span className="relative z-[1]">Partner with us</span>
                  </button>
                </Link>
                <Link
                  href="/contact#for-strategic-investors"
                  className="link-founders text-slate-300 hover:text-lime-300 transition underline underline-offset-4"
                >
                  Talk to founders <span className="link-arrow">→</span>
                </Link>
              </div>
              <EligibilityWidget />
            </div>

            {/* RIGHT COLUMN — supporting visual */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
                <Image
                  src="/founder-note-visual-nocoin.png"
                  alt="Trustiva Setu founder note"
                  width={800}
                  height={500}
                  className="w-full h-auto object-contain rounded-4xl border border-white/10 shadow-xl"
                />
                {/* Real coin sprites from the original artwork, falling into the piggy bank */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/coin-sprite-1.png" alt="" className="hero-coin" style={{ left: "77%", animationDelay: "0s", animationDuration: "5s" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/coin-sprite-2.png" alt="" className="hero-coin" style={{ left: "79%", animationDelay: "1.5s", animationDuration: "4.4s" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/coin-sprite-3.png" alt="" className="hero-coin hidden sm:block" style={{ left: "78%", animationDelay: "3s", animationDuration: "5.6s" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/coin-sprite-4.png" alt="" className="hero-coin hidden sm:block" style={{ left: "80%", animationDelay: "4.5s", animationDuration: "4.8s" }} />
                </div>
                {/* Sequential "loan process running" pulse over the phone step list */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl"
                  aria-hidden="true"
                >
                  <span className="hero-step-pulse" style={{ left: "19.2%", top: "30.6%", animationDelay: "0s" }} />
                  <span className="hero-step-pulse" style={{ left: "20.1%", top: "39.5%", animationDelay: "0.6s" }} />
                  <span className="hero-step-pulse" style={{ left: "21.0%", top: "48.2%", animationDelay: "1.2s" }} />
                  <span className="hero-step-pulse" style={{ left: "23.0%", top: "57.2%", animationDelay: "1.8s" }} />
                  <span className="hero-step-pulse" style={{ left: "23.0%", top: "66.2%", animationDelay: "2.4s" }} />
                  <span className="hero-step-pulse" style={{ left: "22.6%", top: "75.8%", animationDelay: "3s" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARKETING HIGHLIGHT REEL */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-8">
          <p className="text-[#bef264] text-sm font-semibold tracking-[0.25em] uppercase mb-3 text-center">
            Watch the 36-second overview
          </p>
          <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl">
            <VideoPlayer src="/videos/highlight-reel.mp4" />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#bef264] text-[#07111f] font-black text-base sm:text-xl shadow-2xl"
            >
              <span>⚡</span>
              <span>Approval in</span>
              <span className="underline underline-offset-4 decoration-2">8–10 Min</span>
              <span className="mx-1">·</span>
              <span>Same Day Disbursal*</span>
              <span>⚡</span>
            </motion.div>
          </div>

          <p className="text-[#bef264] text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Platform Workflow
          </p>

          <h2 className="text-4xl md:text-[44px] font-bold text-center mb-4">
            How It Works
          </h2>

          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg leading-8">
            From patient walk-in to treatment start — India&apos;s fastest healthcare financing workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white/[0.045] backdrop-blur-sm border border-white/10 rounded-3xl p-7 text-center hover:-translate-y-2 transition-all duration-300 hover:border-[#bef264]/40 hover:shadow-[0_20px_40px_rgba(190,242,100,0.1)]"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#bef264]/10 border-2 border-[#bef264]/30 flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="text-[#bef264] text-xs font-bold tracking-widest mb-2 uppercase">
                  Step {item.step}
                </div>
                <div className="inline-block bg-[#bef264] text-[#07111f] text-xs font-black px-3 py-1 rounded-full mb-3">
                  {item.timing}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{item.desc}</p>
                {item.note && (
                  <p className="text-gray-500 text-xs mt-3 italic">{item.note}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <div className="inline-block bg-white/[0.045] backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-5">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-3">
                <div>
                  <p className="text-2xl font-black text-[#bef264]">Under 2 min</p>
                  <p className="text-gray-400 text-xs mt-0.5">Pre-qualification</p>
                </div>
                <div className="text-[#bef264]/30 text-2xl hidden sm:block">|</div>
                <div>
                  <p className="text-2xl font-black text-[#bef264]">8–10 min</p>
                  <p className="text-gray-400 text-xs mt-0.5">Lead to Approval</p>
                </div>
                <div className="text-[#bef264]/30 text-2xl hidden sm:block">|</div>
                <div>
                  <p className="text-2xl font-black text-[#bef264]">Same Day*</p>
                  <p className="text-gray-400 text-xs mt-0.5">Disbursal</p>
                </div>
              </div>
              <p className="text-gray-300 text-base font-semibold">
                Complete Cycle — Fastest in India
              </p>
              <p className="text-gray-500 text-xs mt-2 italic">
                *Disbursal subject to bank working hours. Excludes public holidays, weekends &amp; festivals.
              </p>
            </div>
          </div>
        </section>
        {/* TRUST METRICS STRIP */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-7xl mx-auto">
            {[
              {
                number: 50,
                suffix: "+",
                label: "Expanding Lender Network",
              },
              {
                number: 500,
                suffix: "+",
                label: "Growing Clinic Pipeline",
              },
              {
                number: 2400,
                prefix: "₹",
                suffix: "Cr+",
                label: "Large Market Opportunity",
              },
              {
                number: 8,
                suffix: "-10 min",
                label: "Lead to Approval",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="relative bg-white/10 backdrop border border-lime-300/20 rounded-3xl px-6 py-5 text-center shadow-xl min-h-[140px] sm:min-h-[170px] w-full flex flex-col justify-center overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-lime-300/50 to-transparent" />

                <motion.h3
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-2xl font-bold text-[#bef264]"
                >
                  <Counter
                    end={item.number}
                    suffix={item.suffix || ""}
                    prefix={item.prefix || ""}
                  />
                </motion.h3>

                <p className="text-gray-300 mt-2 text-base">
                  {item.label}
                </p>

                <div className="mt-3 h-[2px] w-12 mx-auto bg-lime-300/40 rounded-full" />
              </motion.div>
            ))}
          </div>
        </section>
        <LendingPartners />

        <Footer />
      </div>
    </>
  );
}
