"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CreditCard,
  Landmark,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import TeamPhoto from "@/components/ui/TeamPhoto";
const WEB3_ACCESS_KEY = "09879d5d-1685-4b55-b604-405fd11bd3db";

function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    let start = 0;
    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function TrustivaSetuWebsite() {
  
  const [clinicLoading, setClinicLoading] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false);
  const [investorLoading, setInvestorLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // ✅ Menu scroll lock useEffect (correct)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

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

  const [investorForm, setInvestorForm] = useState({
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  investmentInterest: "",
  strategicNotes: "",
});

  
  
  const [reviewForm, setReviewForm] = useState({
  name: "",
  message: "",
  rating: 0,
});

const [reviewErrors, setReviewErrors] = useState<any>({});


  const handleClinicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setClinicForm({
      ...clinicForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatientForm({
      ...patientForm,
      [e.target.name]: e.target.value,
    });
  };

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

const [reviewSubmitting, setReviewSubmitting] = useState(false);
const [loanAmount, setLoanAmount] = useState(50000);
const [tenure, setTenure] = useState(12);
const [processingFeePercent, setProcessingFeePercent] = useState(2);
const [openFaq, setOpenFaq] = useState<number | null>(null);

const submitReview = async () => {
  let errors: any = {};

  if (!reviewForm.name.trim()) errors.name = "Field missing";
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
        message: reviewForm.message.trim(),
        rating: Number(reviewForm.rating),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setReviews((prev) => [data.review, ...prev]);
      setReviewForm({ name: "", message: "", rating: 0 });
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

const [investorErrors, setInvestorErrors] = useState<any>({});

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

  const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["solutions", "Solutions"],
  ["clinics", "For Clinics"],
  ["patients", "For Patients"],
  ["why-we-win", "Why We Win"],
  ["join-us", "Join Us"],
  ["contact", "Contact"],
];

  const highlights = [
    "No Cost EMI",
    "Credit Card EMI",
    "Debit Card EMI",
    "NBFC Financing",
    "Private Lender Access",
    "Faster Approvals",
    "Multi-Lender Approval Engine",
    "Transparent Terms",
  ];

  const clinicBenefits = [
    "Higher patient conversion rates",
    "Faster payment settlements",
    "Reduced treatment drop-offs",
    "Multiple lender access in one place",
    "Dedicated relationship support",
    "Transparent financing process",
    "Reduced operational burden",
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
    <div className={`min-h-screen bg-[#07111f] text-white ${menuOpen ? "fixed w-full" : ""}`}>


{/* MOBILE MENU */}
<div
  className={`
    fixed inset-0 z-40
    bg-[#07111f]/95 backdrop-blur-xl
    transform transition-all duration-300 ease-in-out
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
    <h2 className="text-lg font-semibold text-white">
      Menu
    </h2>

    <button
      onClick={() => setMenuOpen(false)}
      className="text-2xl text-white"
    >
      ✕
    </button>
  </div>

  <div className="flex flex-col gap-6 px-6 py-8 text-lg">
    {navItems.map(([id, label]) => (
      <a
        key={id}
        href={id === "join-us" ? "/join-us" : `#${id}`}
        target={id === "join-us" ? "_blank" : "_self"}
        rel={id === "join-us" ? "noopener noreferrer" : ""}
        onClick={() => setMenuOpen(false)}
        className="text-white border-b border-white/10 pb-3 hover:text-lime-300 transition"
      >
        {label}
      </a>
    ))}
  </div>
</div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

    {/* LOGO */}
    <div className="flex items-center gap-2 md:gap-4">
      <Image src="/logo.png" alt="logo" width={56} height={56} />

      <div>
        <h1 className="text-lg md:text-2xl font-bold">Trustiva Setu</h1>
        <p className="text-xs md:text-sm text-gray-300">
          Aarthsetu Technologies Pvt. Ltd.
        </p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3 md:gap-4">

      {/* LANGUAGE SWITCHER — visible on all screens */}
      <LanguageSwitcher />

      {/* MOBILE BUTTON */}
      <div className="md:hidden">
        <button
        onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>


      {/* DESKTOP NAV */}

      <div className="hidden md:flex items-center gap-6">

        <nav className="flex gap-6">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={id === "join-us" ? "/join-us" : `#${id}`}
              target={id === "join-us" ? "_blank" : "_self"}
              rel={id === "join-us" ? "noopener noreferrer" : ""}
              className="hover:text-lime-300 transition"
            >
              {label}
            </a>
          ))}
        </nav>

        
    </div>
</div>
  </div>

      {/* HERO */}

      <section
  id="home"
  className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center"
>
  
        <div className="relative z-10">
          
          <p className="text-lime-300 text-sm tracking-[0.3em] uppercase mb-4">
  Healthcare Financing Infrastructure
</p>

<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
  Powering India's
  <span className="block text-lime-300">
    Healthcare Financing Backbone
  </span>
</h1>

<p className="text-gray-300 text-lg md:text-xl max-w-xl leading-8">
  Connecting clinics, lenders and patients through one unified
  financing infrastructure platform.
</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a href="#clinics">
              <button
  className="premium-btn premium-green-btn"
>
                Partner With Us
              </button>
            </a>

            <a
  href="#for-strategic-investors"
  onClick={(e) => {
    e.preventDefault();
    document
      .getElementById("for-strategic-investors")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="premium-btn premium-green-btn"
>
  Talk to Founders
</a>
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
      {/* ABOUT */}

      <section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          About Trustiva Setu
        </h2>

        <p className="text-gray-300 text-lg leading-8">
          Trustiva is the healthcare financing infrastructure division of
Aarthsetu Technologies Private Limited.

We are building the backbone that powers affordable healthcare access
by enabling financial institutions, hospitals, healthcare providers
and digital partners to work together through one unified financing ecosystem.

Our mission is simple:

"No patient should delay treatment because of financial barriers."

We don't just provide loans—we create the infrastructure layer
that powers healthcare affordability at scale. 
        </p>
        <div className="mt-20">
  <h2 className="text-4xl font-bold mb-10">
    Founding Team
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

    {/* Abhishek */}

  <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
    <div className="flex justify-center mb-6">
  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
    <TeamPhoto
      src="/abhishek.jpg"
      alt="Abhishek Kashyap"
      name="Abhishek Kashyap"
      width={208}
      height={208}
    />
  </div>
</div>

      <h3 className="text-2xl font-bold">
        Abhishek Kashyap
      </h3>

      <p className="text-lime-300 font-semibold mb-2">
        Founder & Strategic Vision Lead
      </p>
<p className="text-gray-300 text-sm mt-2 leading-6">
  Building India's healthcare financing infrastructure with lender-first execution.
</p>
      <p className="text-gray-300">
        Healthcare Finance Infrastructure,
        Strategic Partnerships,
        NBFC Ecosystem Development
      </p>
    </div>

    {/* Ajit */}

<div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
    <div className="flex justify-center mb-6">
  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
    <TeamPhoto
      src="/ajit.jpg"
      alt="Ajit Singh Yadav"
      name="Ajit Singh Yadav"
      width={208}
      height={208}
    />
  </div>
</div>

      <h3 className="text-2xl font-bold">
        Ajit Singh Yadav
      </h3>

      <p className="text-lime-300 font-semibold mb-2">
        Co-Founder & Growth Strategy Lead
      </p>
<p className="text-gray-300 text-sm mt-2 leading-6">
  Driving strategic partnerships, conversion systems and lender expansion.
</p>
      <p className="text-gray-300">
        Banking + Fintech,
        Credit Infrastructure,
        Lending Operations
      </p>
    </div>
{/* Manish Jaggi */}

<div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
  <div className="flex justify-center mb-6">
    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
      <TeamPhoto
        src="/manish.png"
        alt="Manish Jaggi"
        name="Manish Jaggi"
        width={240}
        height={240}
      />
    </div>
  </div>

  <h3 className="text-2xl font-bold">
    Manish Jaggi
  </h3>

  <p className="text-lime-300 font-semibold mb-2">
    Strategic Advisor
  </p>

  <p className="text-gray-300 text-sm mt-2 leading-6">
    Bringing deep banking, NBFC and financial infrastructure expertise
    to strengthen Trustiva's lender ecosystem and strategic growth.
  </p>

  <p className="text-gray-300">
    ICICI Bank, TATA Capital, NBFC Strategy,
    Lending Infrastructure, Financial Advisory
  </p>
</div>
    </div>
</div>
      </section>

      {/* SOLUTIONS */}

      <section
        id="solutions"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          Our Financing Solutions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
            <CreditCard className="text-lime-300 mb-4" />
            <h3 className="text-xl font-bold mb-3">Embedded Healthcare Finance</h3>
            <p className="text-gray-300">
              Allow hospitals and clinics to offer instant financing
directly at the point of care with seamless approvals.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
            <Landmark className="text-lime-300 mb-4" />
            <h3 className="text-xl font-bold mb-3">Provider Financing Platform</h3>
            <p className="text-gray-300">
              Improve provider collections and patient conversion
without taking credit risk or operational burden.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
            <HeartHandshake className="text-lime-300 mb-4" />
            <h3 className="text-xl font-bold mb-3">Lender Integration Layer</h3>
            <p className="text-gray-300">
              Connect NBFCs, banks and lending partners with
verified healthcare demand through one unified system.
            </p>
          </div>

        </div>
      </section>

      {/* FOR CLINICS */}

      <section
        id="clinics"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          For Clinics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

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
              Why Hospitals & Clinics Partner With Us
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

      {/* FOR PATIENTS */}

      <section
  id="patients"
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
>
        <h2 className="text-4xl font-bold mb-10">
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
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
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

    {/* Glow Effect */}
    

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

      {/* Moving Strip */}


    

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
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
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

{/* WHY We Win */}

<section
  id="why-we-win"
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
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
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
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
        <a href="#clinics">
          <button className="premium-btn bg-white/10 border border-white/20 text-white rounded-xl px-8 py-3 font-semibold hover:bg-white/20 transition-all text-lg">
            Learn More
          </button>
        </a>
      </div>
    </div>
  </div>
</section>

{/* INVESTOR SECTION */}

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
  <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">

    {/* glow effects */}

    
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

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5 min-h-[120px] flex flex-col justify-center">
    <p className="text-sm text-gray-400 mb-2">
      Raise Stage
    </p>
    <h3 className="text-2xl font-bold text-lime-300">
      Pre-Seed
    </h3>
  </div>

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5 min-h-[120px] flex flex-col justify-center">
    <p className="text-sm text-gray-400 mb-2">
      Capital Raise
    </p>
    <h3 className="text-2xl font-bold text-lime-300">
      ₹5 Crore
    </h3>
  </div>

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5 min-h-[120px] flex flex-col justify-center">
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

      <div className="mt-20 flex flex-wrap gap-4">

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

{/* INVESTOR CONVERSATION FORM */}

<section
  id="for-strategic-investors"
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
>
  
  <div className="bg-white/10 backdrop-blur-2xl border border-lime-300/20 rounded-3xl p-10 shadow-2xl">

    <p className="text-lime-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
      Investor Access
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Schedule Strategic Investor Conversation
    </h2>

    <p className="text-gray-300 text-lg leading-8 max-w-4xl mb-10">
      For strategic investors, lending partners and institutional conversations,
      connect directly with the founding team to explore capital deployment,
      partnerships and long-term infrastructure opportunities.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

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

        <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
          <p className="text-sm text-gray-400 mb-2">
            Founder Email
          </p>

          <p className="text-lg text-lime-300 font-semibold">
            abhishek.kashyap@trustivasetu.com
          </p>
        </div>

        <div className="bg-white/5 border border-lime-300/20 rounded-3xl p-6">
          <p className="text-sm text-gray-400 mb-2">
            Co-Founder Email
          </p>

          <p className="text-lg text-lime-300 font-semibold">
            ajit.yadav@trustivasetu.com
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

<section
  id="testimonials"
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
>

  <h2 className="text-4xl font-bold mb-10 text-center">
    Early Feedback
  </h2>

  {reviewsLoading ? (
    <div className="flex justify-center py-16">
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
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-gray-400 text-lg mb-2">
        No reviews yet — be the first to share your feedback!
      </p>
      <p className="text-gray-500 text-sm">
        Use the form below to submit your review.
      </p>
    </div>
  )}

</section>
<section className="max-w-7xl mx-auto px-4 py-20">

  <h2 className="text-4xl font-bold text-center mb-10">
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

    {reviewErrors.name && <p className="text-red-500">{reviewErrors.name}</p>}

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
<section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

  <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-12 shadow-2xl">

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

      <p className="text-gray-300 text-lg leading-9 max-w-4xl mx-auto mb-10">
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

        <a
          href="#for-strategic-investors"
          className="premium-btn premium-green-btn"
        >
          Talk to Founders
        </a>

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

      {/* Hidden Google Translate mount — required for .goog-te-combo to exist in DOM */}
      <div id="google_translate_element" aria-hidden="true" />

      {/* FOOTER */}

      <footer className="border-t border-white/10 pt-12 pb-8 text-gray-400">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* RBI / Loan Facilitation Disclaimer */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10 text-xs text-gray-400 leading-6">
      <p className="font-semibold text-gray-300 mb-2">Important Disclaimer</p>
      <p>
        Trustiva Setu is a loan facilitation platform operated by Aarthsetu Technologies Private Limited.
        We are not a bank or Non-Banking Financial Company (NBFC). Loans are provided by our partner banks and NBFCs.
        Interest rates, processing fees and loan terms are determined solely by partner lenders and are subject to their policies.
        Loan approval is at the sole discretion of the lender. Zero interest (No Cost EMI) is subject to a subvention arrangement
        with partner clinics/hospitals — terms and conditions apply. EMI amounts shown on this website are indicative only;
        actual amounts may vary based on lender terms, applicable taxes and processing fees.
        Past performance does not guarantee future approval rates. All timelines (approval, disbursal) are indicative and
        subject to bank working hours, public holidays, weekends and festivals.
      </p>
    </div>

    {/* Main Footer Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

      {/* Company Info */}
      <div className="lg:col-span-2">
        <h3 className="text-base font-bold text-white mb-3">
          Aarthsetu Technologies Private Limited
        </h3>
        <p className="text-sm text-gray-400 leading-6 mb-3">
          Trustiva Setu Division — Building Healthcare Financing Infrastructure for India.
        </p>
        <div className="space-y-1 text-xs text-gray-500">
          <p>CIN: U66190UP2026PTC247393</p>
          <p>Registered Office: Moradabad, Uttar Pradesh, India</p>
          <p>GSTIN: 09ABFCA5854R1ZU</p>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
        <div className="space-y-2 text-sm">
          <a href="#about" className="block text-gray-400 hover:text-lime-300 transition-colors">About Us</a>
          <a href="#clinics" className="block text-gray-400 hover:text-lime-300 transition-colors">For Clinics</a>
          <a href="#patients" className="block text-gray-400 hover:text-lime-300 transition-colors">For Patients</a>
          <a href="/join-us" className="block text-gray-400 hover:text-lime-300 transition-colors">Careers</a>
        </div>
      </div>

      {/* Legal Links + Contact */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
        <div className="space-y-2 text-sm">
          <a href="/privacy-policy" className="block text-gray-400 hover:text-lime-300 transition-colors">Privacy Policy</a>
          <a href="/terms" className="block text-gray-400 hover:text-lime-300 transition-colors">Terms &amp; Conditions</a>
          <a href="/disclaimer" className="block text-gray-400 hover:text-lime-300 transition-colors">Disclaimer</a>
        </div>
        <div className="mt-4 space-y-1 text-xs text-gray-500">
          <p>📧 <a href="mailto:info@trustivasetu.com" className="hover:text-lime-300">info@trustivasetu.com</a></p>
          <p>📧 <a href="mailto:admin@trustivasetu.com" className="hover:text-lime-300">admin@trustivasetu.com</a></p>
          <p>📧 <a href="mailto:legal@trustivasetu.com" className="hover:text-lime-300">legal@trustivasetu.com</a></p>
        </div>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
      <p>© 2026 Aarthsetu Technologies Private Limited. All Rights Reserved.</p>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
        <a href="/privacy-policy" className="hover:text-lime-300 transition-colors">Privacy Policy</a>
        <span>·</span>
        <a href="/terms" className="hover:text-lime-300 transition-colors">Terms &amp; Conditions</a>
        <span>·</span>
        <a href="/disclaimer" className="hover:text-lime-300 transition-colors">Disclaimer</a>
      </div>
    </div>

  </div>
</footer>

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

</div>
);
}
