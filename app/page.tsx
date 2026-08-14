"use client";

import React from "react";
import Counter from "@/components/home/Counter";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
        <Navbar />

        {/* HERO */}

        <section
          id="home"
          className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-12 sm:pb-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center"
        >
          <div className="relative z-10">
            <p className="text-lime-300 text-sm tracking-[0.3em] uppercase mb-4">
              Healthcare Financing Infrastructure
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Medical Loans & No Cost Healthcare EMI
              <span className="block text-lime-300">
                Across India
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-8">
              Trustiva Setu connects patients, clinics and lending partners to provide
              medical loans, No Cost EMI, IVF financing, dental loans, cosmetic surgery
              financing and other healthcare financing solutions across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/for-clinics#clinics">
                <button className="premium-btn premium-green-btn">
                  Partner With Us
                </button>
              </Link>

              <Link
                href="/contact#for-strategic-investors"
                className="premium-btn premium-green-btn"
              >
                Talk to Founders
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* LEFT: IMAGE */}
            <div className="flex justify-center">
              <Image
                src="/founder-note-visual.png"
                alt="Trustiva Healthcare"
                width={800}
                height={500}
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full max-w-xs sm:max-w-md md:max-w-xl object-contain rounded-4xl border border-white/10 shadow-xl"
              />
            </div>

            {/* RIGHT: QUOTE */}
            <div>
              <p className="text-lime-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                From Our Founder
              </p>

              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Our Vision
              </h3>

              <div className="relative mb-6">
                <div className="h-[1px] w-full bg-white/10" />
                <div className="absolute top-0 left-0 h-[1px] w-32 bg-lime-300 animate-pulse" />
              </div>

              <p className="text-gray-300 italic mb-4">
                "Build trust first. Scale will follow."
              </p>

              <p className="text-lime-300 font-semibold">
                — Trustiva Founder
              </p>
            </div>
          </div>
        </section>
        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-full bg-lime-300 text-black font-black text-base sm:text-xl shadow-2xl"
            >
              <span>⚡</span>
              <span>Approval in</span>
              <span className="underline underline-offset-4 decoration-2">8–10 Min</span>
              <span className="mx-1">·</span>
              <span>Same Day Disbursal*</span>
              <span>⚡</span>
            </motion.div>
          </div>

          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Platform Workflow
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            How It Works
          </h2>

          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-14 text-lg leading-8">
            From patient walk-in to treatment start — India&apos;s fastest healthcare financing workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white/5 border border-lime-300/20 rounded-3xl p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:border-lime-300/50 hover:shadow-[0_20px_40px_rgba(190,242,100,0.1)]"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-lime-300/10 border-2 border-lime-300/40 flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="text-lime-300 text-xs font-bold tracking-widest mb-2 uppercase">
                  Step {item.step}
                </div>
                <div className="inline-block bg-lime-300 text-black text-xs font-black px-3 py-1 rounded-full mb-3">
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
            <div className="inline-block bg-lime-300/10 border border-lime-300/30 rounded-2xl px-8 py-5">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-3">
                <div>
                  <p className="text-2xl font-black text-lime-300">Under 2 min</p>
                  <p className="text-gray-400 text-xs mt-0.5">Pre-qualification</p>
                </div>
                <div className="text-lime-300/30 text-2xl hidden sm:block">|</div>
                <div>
                  <p className="text-2xl font-black text-lime-300">8–10 min</p>
                  <p className="text-gray-400 text-xs mt-0.5">Lead to Approval</p>
                </div>
                <div className="text-lime-300/30 text-2xl hidden sm:block">|</div>
                <div>
                  <p className="text-2xl font-black text-lime-300">Same Day*</p>
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

        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Execution in Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-lime-300">
                Clinic Partnerships
              </h3>
              <p className="text-gray-300">
                Actively onboarding healthcare providers across key cities
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-lime-300">
                Lender Integrations
              </h3>
              <p className="text-gray-300">
                Multiple NBFC and lender discussions in advanced stages
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-lime-300">
                Platform Build
              </h3>
              <p className="text-gray-300">
                Infrastructure and approval engine under active development
              </p>
            </div>
          </div>
        </section>
        {/* TRUST METRICS STRIP */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
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
                  className="text-2xl font-bold text-lime-300"
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
        <div className="h-8" />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Strategic Credibility
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Built For Institutional Scale
          </h2>

          <p className="text-center text-gray-300 max-w-4xl mx-auto leading-8 text-lg mb-12">
            Trustiva Setu is being built with deep lender relationships,
            strategic healthcare partnerships and execution-first leadership
            focused on building India's healthcare financing infrastructure layer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-lime-300 mb-3">
                NBFC + Banking Expertise
              </h3>

              <p className="text-gray-300 leading-8">
                Strong lender ecosystem understanding across banking,
                NBFC operations, approvals and healthcare financing models.
              </p>
            </div>

            <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-lime-300 mb-3">
                Founder-Led Execution
              </h3>

              <p className="text-gray-300 leading-8">
                Built directly by founders focused on lender partnerships,
                infrastructure deployment and long-term platform defensibility.
              </p>
            </div>

            <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-lime-300 mb-3">
                Infrastructure-First Model
              </h3>

              <p className="text-gray-300 leading-8">
                Not lead generation.
                Not a lending company.
                A scalable healthcare finance infrastructure platform.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
