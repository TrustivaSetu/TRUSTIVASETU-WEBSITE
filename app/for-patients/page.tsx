"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics";

const WEB3_ACCESS_KEY = "09879d5d-1685-4b55-b604-405fd11bd3db";

export default function ForPatientsPage() {
  const [patientLoading, setPatientLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  const [patientForm, setPatientForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    treatmentType: "",
    budget: "",
    message: "",
  });
  const [patientErrors, setPatientErrors] = useState<any>({});

  const [loanAmount, setLoanAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const [processingFeePercent, setProcessingFeePercent] = useState(2);

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatientForm({
      ...patientForm,
      [e.target.name]: e.target.value,
    });
  };

  const validatePatientForm = () => {
    let errors: any = {};
    if (!/^[6-9]\d{9}$/.test(patientForm.phone)) {
      errors.phone = "Enter valid 10-digit number";
    }
    if (!patientForm.fullName.trim()) {
      errors.fullName = "Field missing";
    }

    if (!patientForm.email.trim()) {
      errors.email = "Field missing";
    } else if (!/\S+@\S+\.\S+/.test(patientForm.email)) {
      errors.email = "Enter valid email";
    }

    if (!patientForm.city.trim()) {
      errors.city = "Field missing";
    }

    if (!patientForm.treatmentType.trim()) {
      errors.treatmentType = "Field missing";
    }

    if (!patientForm.budget.trim()) {
      errors.budget = "Field missing";
    }

    setPatientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitPatient = async () => {
    if (!validatePatientForm()) return;

    setPatientLoading(true);

    try {
      const formData = {
        access_key: WEB3_ACCESS_KEY,

        subject: "Patient Finance Enquiry - Trustiva Setu",

        from_name: "Trustiva Setu Patient Lead",

        replyto: patientForm.email,

        fullName: patientForm.fullName,

        phone: patientForm.phone,

        email: patientForm.email,

        city: patientForm.city,

        treatmentType: patientForm.treatmentType,

        budget: patientForm.budget,

        message: patientForm.message,
      };

      // Routed through our signed server-side proxy (never the LMS directly).
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'patient',
          fullName: patientForm.fullName,
          phone: patientForm.phone,
          email: patientForm.email,
          city: patientForm.city,
          treatmentType: patientForm.treatmentType,
          budget: patientForm.budget,
          message: patientForm.message,
        }),
      }).catch(() => {});

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        showToast("Enquiry submitted! Our team will contact you shortly.");
        trackEvent("patient_lead_submit", {
          form: "patient",
        });
        setPatientForm({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          treatmentType: "",
          budget: "",
          message: "",
        });

        setPatientErrors({});
      } else {
        showToast(result.message || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
    }

    setPatientLoading(false);
  };

  const treatmentCategories = [
    { icon: "🦷", name: "Dental" },
    { icon: "💇", name: "Hair Transplant" },
    { icon: "🍼", name: "IVF & Fertility" },
    { icon: "👁️", name: "Ophthalmology" },
    { icon: "✨", name: "Cosmetology" },
    { icon: "🦴", name: "Orthopaedics" },
    { icon: "❤️", name: "Cardiology" },
    { icon: "⚖️", name: "Bariatric" },
    { icon: "👂", name: "Hearing (ENT)" },
    { icon: "🏥", name: "General Surgery" },
  ];

  const appFeatures = [
    "Multi-NBFC Instant Approval Engine",
    "Top 5 Best Approval Options",
    "Credit Card EMI Integration",
    "Debit Card EMI Integration",
    "No Cost EMI Options",
    "Single Application – Multiple Lender Access",
    "Real-Time Approval Tracking",
    "Smart LOS (Lead Operating System)",
    "Document Upload + KYC Management",
    "Clinic Dashboard",
    "Lender Dashboard",
    "Faster Settlement System",
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <div className="pt-12 sm:pt-16">
        {/* FOR PATIENTS */}

        <section
          id="patients"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            For Patients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">
                Healthcare Finance — Made Simple for You
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "0%",
                    title: "No Cost EMI",
                    desc: "Zero interest to patient under subvention arrangement (terms apply). One-time processing fee only.",
                    highlight: true,
                  },
                  {
                    icon: "✓",
                    title: "Quick & Simple Approval",
                    desc: "Fast eligibility check — quick & simple process, no lengthy paperwork.",
                    highlight: false,
                  },
                  {
                    icon: "₹75K",
                    title: "Instant Approval",
                    desc: "Get approved up to ₹75,000 in minutes — no branch visits.",
                    highlight: false,
                  },
                  {
                    icon: "📱",
                    title: "100% Digital",
                    desc: "Paperless process — from application to disbursal, everything online.",
                    highlight: false,
                  },
                  {
                    icon: "💰",
                    title: "No Hidden Charges",
                    desc: "Only a one-time processing fee. No prepayment penalty. No surprises.",
                    highlight: false,
                  },
                  {
                    icon: "⚡",
                    title: "Same Day Disbursal*",
                    desc: "Approval in 8–10 min. Same day disbursal in most cases. Start treatment today.",
                    highlight: true,
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 border transition-all duration-300 hover:-translate-y-1 ${
                      benefit.highlight
                        ? "bg-lime-300/10 border-lime-300/40"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="text-2xl font-black text-lime-300 mb-1">{benefit.icon}</div>
                    <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm leading-5">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Patient Healthcare Finance Enquiry
              </h3>

              <div className="space-y-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={patientForm.fullName}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />
                {patientErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {patientErrors.fullName}
                  </p>
                )}

                {/* PHONE */}
                <div>
                  <div className="flex w-full flex-nowrap">
                    <span className="bg-white/10 border border-white/20 border-r-0 rounded-l-xl px-3 sm:px-5 min-w-[60px] sm:min-w-[80px] h-[45px] sm:h-[50px] flex items-center justify-center text-white font-semibold text-base">
                      +91
                    </span>

                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Phone Number"
                      value={patientForm.phone}
                      onChange={handlePatientChange}
                      className="w-full bg-white/5 border border-white/20 rounded-r-xl px-3 sm:px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                    />
                  </div>

                  {patientErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {patientErrors.phone}
                    </p>
                  )}
                </div>
                <input
                  name="email"
                  placeholder="Email"
                  value={patientForm.email}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />
                {patientErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {patientErrors.email}
                  </p>
                )}

                <input
                  name="city"
                  placeholder="City"
                  value={patientForm.city}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]"
                />

                <input
                  name="treatmentType"
                  placeholder="Treatment Type"
                  value={patientForm.treatmentType}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]"
                />

                <input
                  name="budget"
                  placeholder="Approx Budget"
                  value={patientForm.budget}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]"
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  value={patientForm.message}
                  onChange={handlePatientChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-4 py-3 h-28 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-lime-300 w-4 h-4 flex-shrink-0" />
                  <span className="text-xs text-gray-400 leading-5">
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>.
                    I understand loan approval is subject to lender discretion and applicable terms.
                  </span>
                </label>

                <button
                  onClick={submitPatient}
                  disabled={patientLoading}
                  className="premium-btn premium-green-btn"
                >
                  {patientLoading ? "Submitting..." : "Submit Finance Enquiry"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TREATMENT CATEGORIES */}
        <section
          id="treatments"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24"
        >
          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Coverage
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Treatment Categories
          </h2>

          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg leading-8">
            No Cost EMI available across all major elective and planned treatment categories.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {treatmentCategories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-lime-300/10 hover:border-lime-300/30 transition-all duration-300 hover:-translate-y-1 group cursor-default"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-lime-300 transition-colors">
                  {cat.name}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* APPLICATION LAUNCHING SOON */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-linear-to-br from-[#0b1628] via-[#10213d] to-[#07111f] p-10 shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-5 py-2 rounded-full bg-lime-300 text-black font-bold text-sm">
                  Platform Rollout
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Trustiva App
                <span className="block text-lime-300">
                  In Progress 🚀
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-8 max-w-3xl mb-10">
                India's smartest healthcare financing application is coming soon —
                built for clinics, patients, lenders and seamless EMI approvals.
                One application. Multiple lenders. Faster approvals. Better conversions.
              </p>

              {/* Features Grid */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {appFeatures.map((item) => (
                  <div
                    key={item}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-lime-300" />
                      <span className="font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* PARTNERS SECTION */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Lending Partners */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
              <p className="text-lime-300 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Powered By
              </p>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Leading Banks & NBFCs
              </h2>

              <p className="text-gray-300 mb-6">
                Trustiva Setu connects clinics and patients to a curated network of
                lending partners — competitive rates and the fastest approval engine in healthcare finance.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white/10 border border-white/10 rounded-xl h-12 flex items-center justify-center"
                  >
                    <span className="text-gray-600 text-xs">Partner</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-lime-300 font-semibold">
                  Multiple lending partners across India
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Partner integrations in advanced stages
                </p>
              </div>
            </div>

            {/* Clinic / Hospital Partners */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Our Clinic / Hospital Partners
              </h2>

              <p className="text-gray-300 mb-6">
                Leading clinics, hospitals and healthcare providers partnering for
                better patient conversions and faster treatment closures.
              </p>

              <div className="relative overflow-hidden border-t border-white/10 pt-5">
                <div className="text-lime-300 font-semibold text-xl">
                  Partner integrations in progress
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMI CALCULATOR */}
        <section
          id="emi-calculator"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24"
        >
          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Plan Your Treatment Finance
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            EMI Calculator
          </h2>

          <p className="text-center text-gray-300 max-w-xl mx-auto mb-12 text-lg leading-8">
            Calculate your No Cost EMI instantly. Zero interest to patient under subvention arrangement — terms apply.
          </p>

          <div className="max-w-3xl mx-auto bg-white/5 border border-lime-300/20 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-white">Loan Amount</label>
                <span className="text-2xl font-black text-lime-300">
                  ₹{loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-lime-300 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-gray-400 text-xs mt-1">
                <span>₹10,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="font-semibold text-white block mb-3">Tenure (Months)</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[3, 6, 9, 12, 18, 24].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenure(t)}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all ${
                      tenure === t
                        ? "bg-lime-300 text-black shadow-lg scale-105"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-white">Processing Fee (%)</label>
                <span className="text-lime-300 font-bold">{processingFeePercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={processingFeePercent}
                onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                className="w-full accent-lime-300 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-gray-400 text-xs mt-1">
                <span>0%</span>
                <span>5%</span>
              </div>
            </div>

            <div className="bg-lime-300/10 border border-lime-300/30 rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Monthly EMI</p>
                  <p className="text-3xl font-black text-lime-300">
                    ₹{Math.round(loanAmount / tenure).toLocaleString("en-IN")}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">for {tenure} months</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Processing Fee</p>
                  <p className="text-3xl font-black text-lime-300">
                    ₹{Math.round((loanAmount * processingFeePercent) / 100).toLocaleString("en-IN")}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">one-time, upfront</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Interest</p>
                  <p className="text-3xl font-black text-lime-300">₹0</p>
                  <p className="text-gray-500 text-xs mt-1">subvention model</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-lime-300/20 text-center">
                <p className="text-lime-300 font-bold text-lg">
                  No Interest — Subvention Model
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Interest is subvented by the hospital/clinic (terms apply). Patient pays zero interest under this arrangement.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="#patients">
                <button className="premium-btn premium-green-btn">
                  Apply for No Cost EMI
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-lime-300/10 border border-lime-300/20 rounded-3xl px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-lime-300">Growing Network</p>
                <p className="text-gray-400 text-sm mt-1">Clinics & Hospitals Pan India</p>
              </div>
              <div className="sm:border-x border-lime-300/20">
                <p className="text-2xl font-bold text-lime-300">Multiple Lenders</p>
                <p className="text-gray-400 text-sm mt-1">Banks & NBFCs Across India</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-lime-300">Pan India Presence</p>
                <p className="text-gray-400 text-sm mt-1">Expanding Rapidly Across States</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 pointer-events-none transition-all ${
            toast.type === "success"
              ? "bg-[#bef264] text-[#07111f]"
              : "bg-red-500 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.type === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          )}
          {toast.message}
        </div>
      )}

      <Footer />
    </div>
  );
}
