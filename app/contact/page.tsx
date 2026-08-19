"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrackedLink from "@/components/analytics/TrackedLink";
import { trackEvent } from "@/lib/analytics";
import { landingData } from "@/lib/landing-data";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const WEB3_ACCESS_KEY = "09879d5d-1685-4b55-b604-405fd11bd3db";

export default function ContactPage() {
  const [investorLoading, setInvestorLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setReviews(data.reviews);
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, []);

  const duplicatedReviews = [...reviews, ...reviews];

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  const [investorForm, setInvestorForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    investmentInterest: "",
    strategicNotes: "",
  });
  const [investorErrors, setInvestorErrors] = useState<any>({});

  const [reviewForm, setReviewForm] = useState({
    name: "",
    mobile: "",
    message: "",
    rating: 0,
  });
  const [reviewErrors, setReviewErrors] = useState<any>({});
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const handleInvestorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInvestorForm({
      ...investorForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitReview = async () => {
    let errors: any = {};

    if (!reviewForm.name.trim()) errors.name = "Field missing";
    if (!reviewForm.mobile.trim() || !/^[6-9]\d{9}$/.test(reviewForm.mobile.trim())) errors.mobile = "Enter valid 10-digit mobile number";
    if (!reviewForm.message.trim()) errors.message = "Field missing";
    if (!reviewForm.rating || reviewForm.rating === 0) errors.rating = "Please select rating";

    setReviewErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setReviewSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reviewForm.name.trim(),
          mobile: reviewForm.mobile.trim(),
          message: reviewForm.message.trim(),
          rating: Number(reviewForm.rating),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setReviews((prev) => [data.review, ...prev]);
        setReviewForm({ name: "", mobile: "", message: "", rating: 0 });
        setReviewErrors({});
        showToast("Review submitted successfully!");
      } else {
        showToast(data.error || "Something went wrong. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const validateInvestorForm = () => {
    let errors: any = {};

    if (!investorForm.fullName.trim()) {
      errors.fullName = "Field missing";
    }

    if (!investorForm.companyName.trim()) {
      errors.companyName = "Field missing";
    }

    if (!investorForm.email.trim()) {
      errors.email = "Field missing";
    } else if (!/\S+@\S+\.\S+/.test(investorForm.email)) {
      errors.email = "Enter valid email";
    }

    if (!/^[6-9]\d{9}$/.test(investorForm.phone)) {
      errors.phone = "Enter valid 10-digit number";
    }

    if (!investorForm.investmentInterest.trim()) {
      errors.investmentInterest = "Field missing";
    }

    if (!investorForm.strategicNotes.trim()) {
      errors.strategicNotes = "Field missing";
    }

    setInvestorErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitInvestor = async () => {
    if (!validateInvestorForm()) return;

    setInvestorLoading(true);

    try {
      const formData = {
        access_key: WEB3_ACCESS_KEY,

        subject: "🚀 Investor Request - Trustiva Setu",

        from_name: "Investor Lead - Trustiva Setu",

        replyto: investorForm.email,

        fullName: investorForm.fullName,

        companyName: investorForm.companyName,

        email: investorForm.email,

        phone: investorForm.phone,

        investmentInterest: investorForm.investmentInterest,

        strategicNotes: investorForm.strategicNotes,
      };

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
        showToast("Investment interest submitted! Our team will reach out shortly.");
        trackEvent("investor_lead_submit", {
          form: "investor",
        });
        setInvestorForm({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          investmentInterest: "",
          strategicNotes: "",
        });

        setInvestorErrors({});
      } else {
        showToast(result.message || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
    }

    setInvestorLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <WebSiteSchema />
      <BreadcrumbSchema title="Contact Us — Trustiva Setu" slug="contact" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        {/* CONTACT US */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Contact Us
          </h2>

          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg leading-8">
            Reach out to Trustiva Setu for general enquiries, admin support or to speak directly with our team.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                General Inquiries
              </p>

              <p className="text-lg text-lime-300 font-semibold">
                <TrackedLink
                  href="mailto:info@trustivasetu.com"
                  event="email_click_info"
                  className="hover:underline"
                >
                  info@trustivasetu.com
                </TrackedLink>
              </p>
            </div>

            <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Admin & Support
              </p>

              <p className="text-lg text-lime-300 font-semibold">
                <TrackedLink
                  href="mailto:admin@trustivasetu.com"
                  event="email_click_admin"
                  className="hover:underline"
                >
                  admin@trustivasetu.com
                </TrackedLink>
              </p>
            </div>

            <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Call Us
              </p>

              <p className="text-lg text-lime-300 font-semibold flex flex-col">
                <TrackedLink
                  href="tel:+918218473534"
                  event="phone_click_primary"
                  className="hover:underline"
                >
                  +91 82184 73534
                </TrackedLink>
                <TrackedLink
                  href="tel:+919540810017"
                  event="phone_click_secondary"
                  className="hover:underline mt-1"
                >
                  +91 95408 10017
                </TrackedLink>
              </p>
            </div>

            <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
              <p className="text-sm text-gray-400 mb-2">
                Registered Office
              </p>

              <p className="text-lg text-lime-300 font-semibold leading-6">
                Moradabad, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </section>

        {/* INVESTOR SECTION */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                For Strategic Investors & Growth Partners
              </p>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Building India's
                <span className="block text-lime-300">
                  Healthcare Financing Infrastructure
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-8 max-w-4xl mb-12">
                Trustiva Setu is building India's healthcare financing infrastructure layer —
the operating system connecting clinics, lenders and patients through one
scalable embedded finance platform.

This is not a lending business.

This is infrastructure.

We enable treatment financing at the point of care through multi-lender routing,
approval intelligence, clinic workflow integration and lender distribution systems —
accelerating lender integrations, clinic onboarding,
distribution expansion and national healthcare financing infrastructure deployment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14">
                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-4 sm:p-5 min-h-[110px] flex flex-col justify-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Raise Stage
                  </p>
                  <h3 className="text-2xl font-bold text-lime-300">
                    Pre-Seed
                  </h3>
                </div>

                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-4 sm:p-5 min-h-[110px] flex flex-col justify-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Capital Raise
                  </p>
                  <h3 className="text-2xl font-bold text-lime-300">
                    ₹5 Crore
                  </h3>
                </div>

                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-4 sm:p-5 min-h-[110px] flex flex-col justify-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Use of Funds
                  </p>
                  <h3 className="text-xl font-bold text-lime-300">
                    Scale + Distribution
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
                  <h3 className="text-3xl font-bold text-lime-300 mb-2">
                    ₹2400Cr+
                  </h3>
                  <p className="text-gray-300">
                    Annual Financing Opportunity Identified
                  </p>
                </div>

                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
                  <h3 className="text-3xl font-bold text-lime-300 mb-2">
                    Multi-NBFC
                  </h3>
                  <p className="text-gray-300">
                    Embedded Approval Infrastructure
                  </p>
                </div>

                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
                  <h3 className="text-3xl font-bold text-lime-300 mb-2">
                    High Retention
                  </h3>
                  <p className="text-gray-300">
                    Clinic Workflow Embedded Distribution
                  </p>
                </div>

                <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-6">
                  <h3 className="text-3xl font-bold text-lime-300 mb-2">
                    Scalable
                  </h3>
                  <p className="text-gray-300">
                    SaaS + Platform Revenue Architecture
                  </p>
                </div>
              </div>

              <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
                <TrackedLink
                  href="/trustiva_strategic_partnership_deck.pdf"
                  event="strategic_partnership_deck_download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-btn premium-green-btn inline-block"
                >
                  Strategic Partnership Deck
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        {/* INVESTOR CONVERSATION FORM */}

        <section
          id="for-strategic-investors"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-lime-300/20 rounded-3xl p-10 shadow-2xl">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Investor Access
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Strategic Investor Conversation
            </h2>

            <p className="text-gray-300 text-lg leading-8 max-w-4xl mb-6">
              For strategic investors, lending partners and institutional conversations,
              connect directly with the founding team to explore capital deployment,
              partnerships and long-term infrastructure opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side Form */}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={investorForm.fullName}
                    onChange={handleInvestorChange}
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                  />

                  <input
                    type="text"
                    name="companyName"
                    value={investorForm.companyName}
                    onChange={handleInvestorChange}
                    placeholder="Fund / Company Name"
                    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={investorForm.email}
                    onChange={handleInvestorChange}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                  />

                  <div className="flex w-full flex-nowrap">
                    <span className="bg-white/10 border border-white/20 border-r-0 rounded-l-xl px-3 sm:px-5 min-w-[60px] sm:min-w-[80px] h-[45px] sm:h-[50px] flex items-center justify-center text-white font-semibold">
                      +91
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={investorForm.phone}
                      onChange={handleInvestorChange}
                      className="w-full bg-white/5 border border-white/20 rounded-r-xl px-3 sm:px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                    />
                  </div>

                  <input
                    type="text"
                    name="investmentInterest"
                    value={investorForm.investmentInterest}
                    onChange={handleInvestorChange}
                    placeholder="Investment Interest"
                    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 min-h-[52px]"
                  />

                  <textarea
                    name="strategicNotes"
                    value={investorForm.strategicNotes}
                    onChange={handleInvestorChange}
                    placeholder="Strategic Notes"
                    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40"
                  />

                  <button
                    onClick={submitInvestor}
                    disabled={investorLoading}
                    className="premium-btn premium-green-btn"
                  >
                    {investorLoading ? "Submitting..." : "Request Investor Access"}
                  </button>
                </div>
              </div>

              {/* Right Side Contact Info */}

              <div className="space-y-6">
                <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
                  <h3 className="text-2xl font-bold mb-4 text-lime-300">
                    Direct Founder Access
                  </h3>

                  <p className="text-gray-300 leading-8">
                    Serious strategic conversations deserve direct founder access.
                    Reach out for investor discussions, lender partnerships and capital strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">
            Early Feedback
          </h2>

          {reviewsLoading ? (
            <div className="flex justify-center py-10 sm:py-12">
              <p className="text-gray-400 text-lg">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="review-strip-wrapper">
              <div className="review-strip">
                {duplicatedReviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="flex mb-4 text-xl text-yellow-400">
                      {"⭐".repeat(review.rating)}
                    </div>
                    <p className="text-gray-300 leading-8 text-lg italic">
                      &ldquo;{review.message}&rdquo;
                    </p>
                    <p className="text-lime-300 mt-4 font-semibold">
                      — {review.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-center">
              <p className="text-gray-400 text-lg mb-2">
                No reviews yet — be the first to share your feedback!
              </p>
              <p className="text-gray-500 text-sm">
                Use the form below to submit your review.
              </p>
            </div>
          )}
        </section>
        <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
          <h2 className="text-4xl font-bold text-center mb-6">
            Share Your Feedback
          </h2>

          <div className="bg-white/5 p-6 rounded-2xl max-w-xl mx-auto">
            <input
              name="name"
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={handleReviewChange}
              className="w-full mb-3 p-3 rounded bg-white/10"
            />

            {reviewErrors.name && <p className="text-red-500 text-sm mb-2">{reviewErrors.name}</p>}

            <input
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile Number (for verification)"
              value={reviewForm.mobile}
              onChange={handleReviewChange}
              className="w-full mb-3 p-3 rounded bg-white/10"
            />

            {reviewErrors.mobile && <p className="text-red-500 text-sm mb-2">{reviewErrors.mobile}</p>}

            <textarea
              name="message"
              placeholder="Your Feedback"
              value={reviewForm.message}
              onChange={handleReviewChange}
              className="w-full mb-3 p-3 rounded bg-white/10"
            />
            {reviewErrors.message && <p className="text-red-500">{reviewErrors.message}</p>}

            <select
              name="rating"
              value={reviewForm.rating}
              onChange={handleReviewChange}
              className="w-full mb-3 p-3 rounded bg-white/10"
            >
              <option value={0}>Select Rating</option>
              <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
              <option value={4}>⭐⭐⭐⭐ — Good</option>
              <option value={3}>⭐⭐⭐ — Average</option>
              <option value={2}>⭐⭐ — Below Average</option>
              <option value={1}>⭐ — Poor</option>
            </select>

            {reviewErrors.rating && <p className="text-red-500">{reviewErrors.rating}</p>}

            <button
              onClick={submitReview}
              disabled={reviewSubmitting}
              className="premium-btn premium-green-btn w-full"
            >
              {reviewSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-lime-300/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/10 blur-3xl rounded-full" />

            <div className="relative z-10 text-center">
              <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Final Vision
              </p>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                Building India's
                <span className="block text-lime-300">
                  Healthcare Financing Infrastructure Layer
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-9 max-w-4xl mx-auto mb-6">
                Trustiva Setu is not building another lending company.

                We are building the infrastructure that ensures treatment decisions
                are never delayed because of immediate affordability barriers.

                Clinics grow faster.
                Lenders deploy smarter.
                Patients access treatment faster.

                This is not a short-term opportunity.

                This is long-term financial healthcare infrastructure.
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <TrackedLink
                  href="#for-strategic-investors"
                  event="talk_to_founders_click"
                  className="premium-btn premium-green-btn"
                >
                  Talk to Founders
                </TrackedLink>

                <a
                  href="/trustiva_strategic_partnership_deck.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-btn premium-green-btn inline-block"
                >
                  Strategic Partnership Deck
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Explore Healthcare Financing
            </h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              Explore financing options for a wide range of planned medical treatments across India.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(landingData).map(([slug, item]) => (
              <Link
                key={slug}
                href={`/${slug}-loan`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-lime-300 hover:bg-white/10"
              >
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-gray-400 line-clamp-3">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex items-center text-lime-300 font-medium">
                  Learn More →
                </span>
              </Link>
            ))}
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
