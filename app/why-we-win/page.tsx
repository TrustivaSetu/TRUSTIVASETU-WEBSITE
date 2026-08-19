"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export default function WhyWeWinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is there any interest charged to the patient?",
      a: "No — Trustiva Setu operates on a subvention model. The interest cost is subvented by the clinic or hospital. Patients pay only a one-time processing fee, making it a truly No Cost EMI experience.",
    },
    {
      q: "How fast is the approval?",
      a: "Our approval process takes 8–10 minutes in most cases. Pre-qualification is done in under 2 minutes, and disbursal happens the same day or within 24 hours. Subject to bank working hours — excludes public holidays, weekends & festivals.",
    },
    {
      q: "How does the approval process work?",
      a: "Trustiva Setu uses a quick & simple approval process. The RM punches the lead into the LMS, an instant eligibility check is done across multiple lenders, the patient selects the best No Cost EMI offer, and disbursal happens the same day (subject to bank working hours).",
    },
    {
      q: "Which treatments are covered?",
      a: "Dental, IVF & Fertility, Hair Transplant, Ophthalmology, Cosmetology, Orthopaedics, Cardiology, Bariatric surgery, Hearing (ENT) and General Surgery — across all major elective and planned treatment categories.",
    },
    {
      q: "How can my hospital partner with Trustiva Setu?",
      a: "Fill the clinic partner enquiry form on this page or contact us directly. A dedicated Relationship Manager will be assigned to your clinic within 24 hours of registration.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-[#07111f] text-white">
        <WebSiteSchema />
        <BreadcrumbSchema title="Why We Win — Trustiva Setu" slug="why-we-win" />
        <Navbar />

        <div className="pt-12 sm:pt-16">
          {/* WHY We Win */}

          <section
            id="why-we-win"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16 scroll-mt-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Why We Win
            </h2>

            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-14 text-lg leading-8">
              Trustiva Setu is not another healthcare financing startup.
              We are building the infrastructure layer that creates long-term
              defensibility across clinics, lenders and patient financing behavior.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                {
                  icon: "⚡",
                  title: "8–10 Min Lead to Approval",
                  desc: "Pre-qualify in under 2 minutes. Approval in 8–10 minutes. Same day disbursal in most cases — complete cycle, fastest in India.",
                  highlight: true,
                },
                {
                  icon: "✅",
                  title: "Quick & Simple Approval Process",
                  desc: "Fast, paperless eligibility check across multiple lenders. No lengthy documentation. Patient gets an answer in minutes.",
                  highlight: false,
                },
                {
                  icon: "0%",
                  title: "Subvention Model",
                  desc: "Zero interest to patient under subvention arrangement (terms apply). 0% EMI at point of care subject to lender approval.",
                  highlight: true,
                },
                {
                  icon: "🗺️",
                  title: "Pan India Network",
                  desc: "Expanding clinic and hospital network across states — one platform, nationwide reach.",
                  highlight: false,
                },
                {
                  icon: "📊",
                  title: "Real-Time LMS for RMs",
                  desc: "Relationship Managers get a live dashboard — track every lead, offer and disbursal instantly.",
                  highlight: false,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    item.highlight
                      ? "bg-lime-300/10 border-lime-300/40"
                      : "bg-white/10 border-lime-300/20"
                  }`}
                >
                  <div className="text-3xl font-black text-lime-300 mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-6">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(163,230,53,0.12)]">
                <h3 className="text-2xl font-bold mb-4 text-lime-300">
                  Healthcare-specific financing infrastructure
                </h3>

                <p className="text-gray-300 leading-8">
                  We are building underwriting intelligence designed specifically for healthcare financing—where treatment urgency, repayment behavior and approval speed create unique lending patterns traditional systems miss.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(163,230,53,0.12)]">
                <h3 className="text-2xl font-bold mb-4 text-lime-300">
                  Multi-Lender Routing Moat
                </h3>

                <p className="text-gray-300 leading-8">
                  Single application. Multiple lenders. Faster approvals.
Our routing engine creates lender competition, better approvals and stronger clinic conversion rates—making the platform increasingly difficult to replace.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(163,230,53,0.12)]">
                <h3 className="text-2xl font-bold mb-4 text-lime-300">
                  Clinic Stickiness & Embedded Distribution
                </h3>

                <p className="text-gray-300 leading-8">
                  Once clinics integrate financing into their treatment workflow, financing becomes operational infrastructure—not a vendor relationship. This creates deep retention and long-term revenue defensibility.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(163,230,53,0.12)]">
                <h3 className="text-2xl font-bold mb-4 text-lime-300">
                  What Makes Us Different
                </h3>

                <p className="text-gray-300 leading-8">
                  This is not lead generation. Trustiva Setu is infrastructure —
                  including lender integrations, LOS routing, approval engine, clinic
                  dashboards and healthcare repayment intelligence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-lime-300">
                  Final Vision
                </h3>

                <p className="text-gray-300 leading-8">
                  To become India's Healthcare Finance Infrastructure Layer where every
                  clinic can offer instant financing and every patient can access
                  treatment without upfront financial barriers.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section
            id="faq"
            className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16 scroll-mt-24"
          >
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
              Have Questions?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg leading-8">
              Everything you need to know about Trustiva Setu&apos;s No Cost EMI platform.
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <span
                      className={`text-lime-300 text-2xl flex-shrink-0 font-bold transition-transform duration-300 ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="h-px bg-white/10 mb-4" />
                      <p className="text-gray-300 leading-7">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PARTNER WITH US CTA */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="relative overflow-hidden rounded-4xl border border-lime-300/30 bg-lime-300/5 backdrop-blur-xl p-10 text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-300/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-300/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                  For Hospitals & Clinics
                </p>

                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Is your clinic ready to offer{" "}
                  <span className="text-lime-300">No Cost EMI</span> to patients?
                </h2>

                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-8">
                  Join Trustiva Setu&apos;s growing network. Get a dedicated RM, real-time LMS access
                  and India&apos;s fastest approval engine — 8–10 min approvals, same day disbursal* — at zero setup cost.
                  <span className="block text-gray-500 text-xs mt-2 italic">*Subject to bank working hours. Excludes public holidays, weekends &amp; festivals.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/join-us" target="_blank" rel="noopener noreferrer">
                    <button className="premium-btn premium-green-btn text-lg px-8 py-3">
                      Become a Partner
                    </button>
                  </a>
                  <Link href="/for-clinics#clinics">
                    <button className="premium-btn bg-white/10 border border-white/20 text-white rounded-xl px-8 py-3 font-semibold hover:bg-white/20 transition-all text-lg">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
