"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const WEB3_ACCESS_KEY = "09879d5d-1685-4b55-b604-405fd11bd3db";

export default function ForClinicsPage() {
  const [clinicLoading, setClinicLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  const [clinicForm, setClinicForm] = useState({
    clinicName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    specialty: "",
    message: "",
  });
  const [clinicErrors, setClinicErrors] = useState<any>({});

  const handleClinicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setClinicForm({
      ...clinicForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateClinicForm = () => {
    let errors: any = {};

    if (!clinicForm.clinicName.trim()) {
      errors.clinicName = "Field missing";
    }

    if (!clinicForm.contactPerson.trim()) {
      errors.contactPerson = "Field missing";
    }

    if (!/^[6-9]\d{9}$/.test(clinicForm.phone)) {
      errors.phone = "Enter valid 10-digit number";
    }

    if (!clinicForm.email.trim()) {
      errors.email = "Field missing";
    } else if (!/\S+@\S+\.\S+/.test(clinicForm.email)) {
      errors.email = "Enter valid email";
    }

    if (!clinicForm.city.trim()) {
      errors.city = "Field missing";
    }

    if (!clinicForm.specialty.trim()) {
      errors.specialty = "Field missing";
    }

    setClinicErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitClinic = async () => {
    if (!validateClinicForm()) return;

    setClinicLoading(true);

    try {
      const formData = {
        access_key: WEB3_ACCESS_KEY,

        subject: "Healthcare Provider Partnership Enquiry - Trustiva Setu",

        from_name: "Trustiva Setu Clinic Lead",

        replyto: clinicForm.email,

        clinic_name: clinicForm.clinicName,

        contact_person: clinicForm.contactPerson,

        phone: clinicForm.phone,

        email: clinicForm.email,

        city: clinicForm.city,

        specialty: clinicForm.specialty,

        message: clinicForm.message,
      };

      // Routed through our signed server-side proxy (never the LMS directly).
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'provider',
          clinicName: clinicForm.clinicName,
          contactPerson: clinicForm.contactPerson,
          phone: clinicForm.phone,
          email: clinicForm.email,
          city: clinicForm.city,
          specialty: clinicForm.specialty,
          message: clinicForm.message,
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
        showToast("Clinic enquiry submitted! We'll be in touch soon.");
        trackEvent("clinic_lead_submit", {
          form: "clinic",
        });
        setClinicForm({
          clinicName: "",
          contactPerson: "",
          phone: "",
          email: "",
          city: "",
          specialty: "",
          message: "",
        });

        setClinicErrors({});
      } else {
        showToast(result.message || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
    }

    setClinicLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <WebSiteSchema />
      <BreadcrumbSchema title="For Clinics & Hospitals — Trustiva Setu" slug="for-clinics" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        {/* FOR CLINICS */}

        <section
          id="clinics"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Clinic Financing & Healthcare Partnerships in India
          </h1>

          <p className="max-w-4xl text-lg leading-8 text-gray-300 mb-8">
            Trustiva Setu helps eligible hospitals, clinics, dental clinics and
            healthcare providers offer treatment financing and No Cost EMI
            options to patients through participating lending partners.
          </p>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-bold text-white">
                Dental Clinic Financing
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Help patients explore financing for eligible dental treatments
                including implants, braces, aligners and other planned care.
              </p>
              <a
                href="/dental-loan"
                className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
              >
                Explore Dental Loan
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-bold text-white">
                Dental Practice Support
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Dental practices and dentists can enquire about becoming a
                Trustiva Setu healthcare provider partner.
              </p>
              <a
                href="/partners/doctors"
                className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
              >
                Partner as a Doctor
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-bold text-white">
                Treatment Financing
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Offer patients a digital financing journey through a network
                of participating lending partners, subject to eligibility.
              </p>
              <a
                href="/dental-implant-loan"
                className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
              >
                Dental Implant Financing
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Healthcare Provider Partnership Enquiry
              </h3>

              <div className="space-y-4">
                <input
                  name="clinicName"
                  placeholder="Clinic Name"
                  value={clinicForm.clinicName}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]"
                />
                {clinicErrors.clinicName && (
                  <p className="text-red-500 text-sm mt-1">
                    {clinicErrors.clinicName}
                  </p>
                )}
                <input
                  name="contactPerson"
                  placeholder="Contact Person"
                  value={clinicForm.contactPerson}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]"
                />
                {clinicErrors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1">
                    {clinicErrors.contactPerson}
                  </p>
                )}
                <div>
                  <div className="flex w-full flex-nowrap">
                    {/* +91 BOX */}
                    <span
                      className="
                        bg-white/10
                        border border-white/20
                        border-r-0
                        rounded-l-xl
                        px-5
                        min-w-[80px]
                        h-[50px]
                        flex items-center justify-center
                        text-white font-semibold text-base
                      "
                    >
                      +91
                    </span>

                    {/* PHONE INPUT */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      name="phone"
                      placeholder="Phone Number"
                      value={clinicForm.phone}
                      onChange={handleClinicChange}
                      className="
                        w-full
                        bg-white/5
                        border border-white/20
                        rounded-r-xl
                        px-4
                        py-3
                        text-sm
                        text-white
                        placeholder:text-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-lime-300/40"
                    />
                  </div>
                  {clinicErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {clinicErrors.phone}
                    </p>
                  )}
                </div>
                <input
                  name="email"
                  placeholder="Email"
                  value={clinicForm.email}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />
                {clinicErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {clinicErrors.email}
                  </p>
                )}

                <input
                  name="city"
                  placeholder="City"
                  value={clinicForm.city}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />

                <input
                  name="specialty"
                  placeholder="Specialty"
                  value={clinicForm.specialty}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  value={clinicForm.message}
                  onChange={handleClinicChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-lime-300 w-4 h-4 flex-shrink-0" />
                  <span className="text-xs text-gray-400 leading-5">
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>.
                    I consent to Trustiva Setu contacting me regarding this enquiry.
                  </span>
                </label>

                <button
                  onClick={submitClinic}
                  disabled={clinicLoading}
                  className="premium-btn premium-green-btn"
                >
                  {clinicLoading ? "Submitting..." : "Healthcare Provider Partnership Enquiry"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">
                Why Hospitals, Clinics & Dental Practices Partner With Us
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: "🤝",
                    title: "Easy Onboarding",
                    desc: "Go live in 24 hours — simple registration, no technical setup required.",
                  },
                  {
                    icon: "👤",
                    title: "Dedicated RM Assigned",
                    desc: "A Relationship Manager exclusively for your clinic — always reachable.",
                  },
                  {
                    icon: "📊",
                    title: "Real-Time Dashboard",
                    desc: "Track every lead, approval and disbursal in real-time from the LMS.",
                  },
                  {
                    icon: "🏦",
                    title: "Multiple Lender Options",
                    desc: "Access top NBFCs and banks — best approval rate for your patients.",
                  },
                  {
                    icon: "📈",
                    title: "Increase Patient Footfall",
                    desc: "No Cost EMI removes the biggest patient barrier — affordability.",
                  },
                  {
                    icon: "⚡",
                    title: "8–10 Min Lead to Approval",
                    desc: "Same day disbursal* in most cases. Treatment starts fast. (*Subject to bank working hours)",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-lime-300/30 transition-all"
                  >
                    <div className="text-2xl flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-gray-400 text-sm leading-5">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
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
