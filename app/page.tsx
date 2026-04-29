"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CreditCard,
  Landmark,
  ArrowRight,
  HeartHandshake,
  Hospital,
  CheckCircle2,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import Image from "next/image";

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

  const [reviews, setReviews] = useState<any[]>([]);
  
    useEffect(() => {
  const savedReviews = localStorage.getItem("trustivaReviews");

  if (savedReviews) {
    setReviews(JSON.parse(savedReviews));
  } else {
    const defaultReviews = [
      {
        name: "Rahul Sharma",
        message:
          "Fast approval and excellent clinic support. Very smooth EMI process.",
        rating: 5,
      },
      {
        name: "Priya Verma",
        message:
          "Trustiva helped me access treatment without financial stress.",
        rating: 5,
      },
    ];

    setReviews(defaultReviews);
    localStorage.setItem(
      "trustivaReviews",
      JSON.stringify(defaultReviews)
    );
  }
}, []);
const [reviewForm, setReviewForm] = useState({
  name: "",
  message: "",
  rating: 0,
});

const [reviewErrors, setReviewErrors] = useState<any>({});
const founderQuotes = [
  {
    quote: "Discipline beats motivation every single day.",
    author: "Trustiva Founder Mindset",
  },
  {
    quote: "Trust builds conversion. Speed builds scale.",
    author: "Healthcare Finance Principle",
  },
  {
    quote: "Great businesses solve painful problems.",
    author: "Execution Philosophy",
  },
  {
    quote: "Healthcare access should never depend on upfront cash.",
    author: "Trustiva Vision",
  },
  {
    quote: "Fast approvals create faster treatment decisions.",
    author: "Growth Strategy",
  },
];

const [dailyQuote, setDailyQuote] = useState(
  founderQuotes[0]
);
const [typedQuote, setTypedQuote] = useState("");
useEffect(() => {
  let index = 0;
  const fullText = dailyQuote.quote;

  const interval = setInterval(() => {
    setTypedQuote(fullText.slice(0, index + 1));
    index++;

    if (index === fullText.length) {
      clearInterval(interval);
    }
  }, 45);

  return () => clearInterval(interval);
}, [dailyQuote]);
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setReviewForm({
    ...reviewForm,
    [e.target.name]: e.target.value,
  });
};

const submitReview = () => {
  let errors: any = {};

  if (!reviewForm.name.trim()) {
    errors.name = "Field missing";
  }

  if (!reviewForm.message.trim()) {
    errors.message = "Field missing";
  }

  if (!reviewForm.rating || reviewForm.rating === 0) {
    errors.rating = "Please select rating";
  }

  setReviewErrors(errors);

  if (Object.keys(errors).length > 0) return;

  const newReview = {
    name: reviewForm.name,
    message: reviewForm.message,
    rating: Number(reviewForm.rating),
  };

  const existingReviews = JSON.parse(
    localStorage.getItem("trustivaReviews") || "[]"
  );

  const updatedReviews = [...existingReviews, newReview];

  localStorage.setItem(
    "trustivaReviews",
    JSON.stringify(updatedReviews)
  );

  setReviews(updatedReviews);

  setReviewForm({
    name: "",
    message: "",
    rating: 0,
  });

  setReviewErrors({});

  alert("Review submitted successfully!");
};
useEffect(() => {
  const randomIndex = Math.floor(
    Math.random() * founderQuotes.length
  );

  setDailyQuote(founderQuotes[randomIndex]);
}, []);
const validateClinicForm = () => {
  let errors: any = {};

  if (!clinicForm.clinicName.trim()) {
    errors.clinicName = "Field missing";
  }

  if (!clinicForm.contactPerson.trim()) {
    errors.contactPerson = "Field missing";
  }

  if (!clinicForm.phone.trim()) {
    errors.phone = "Field missing";
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

  if (!patientForm.fullName.trim()) {
    errors.fullName = "Field missing";
  }

  if (!patientForm.phone.trim()) {
    errors.phone = "Field missing";
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

  const formData = {
    access_key: "e85baa87-8eee-46d9-adc2-8e24b63b6622",
    subject: "Healthcare Provider Partnership Enquiry - Trustiva Setu",
    clinic_name: clinicForm.clinicName,
    contact_person: clinicForm.contactPerson,
    phone: clinicForm.phone,
    email: clinicForm.email,
    city: clinicForm.city,
    specialty: clinicForm.specialty,
    message: clinicForm.message,
  };

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (result.success) {
    alert("Clinic enquiry submitted successfully!");
  } else {
    alert("Something went wrong!");
  }
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

  if (!investorForm.phone.trim()) {
    errors.phone = "Field missing";
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

  const formData = {
    access_key: "e85baa87-8eee-46d9-adc2-8e24b63b6622",

    subject: "Investor Conversation Request - Trustiva Setu",

    full_name: investorForm.fullName,
    company_name: investorForm.companyName,
    email: investorForm.email,
    phone: investorForm.phone,
    investment_interest: investorForm.investmentInterest,
    strategic_notes: investorForm.strategicNotes,

    replyto: investorForm.email,
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
    alert("Investor request submitted successfully!");

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
    alert("Something went wrong!");
  }
};

  const submitPatient = async () => {
  if (!validatePatientForm()) return;

  const formData = {
    access_key: "e85baa87-8eee-46d9-adc2-8e24b63b6622",
    subject: "Patient Healthcare Finance Enquiry - Trustiva Setu",
    full_name: patientForm.fullName,
    phone: patientForm.phone,
    email: patientForm.email,
    city: patientForm.city,
    treatment_type: patientForm.treatmentType,
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
    alert("Patient enquiry submitted successfully!");

    setPatientForm({
      fullName: "",
      phone: "",
      email: "",
      city: "",
      treatmentType: "",
      budget: "",
      message: "",
    });
  } else {
    alert("Something went wrong!");
  }
};

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
    <div className="min-h-screen bg-[#07111f] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 bg-[#07111f]/95 backdrop-blur-md border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

    <div className="flex items-center gap-4">
      <img
        src="/logo.png"
        alt="Trustiva Setu"
        className="w-14 h-14 object-contain"
      />

      <div>
        <h1 className="text-2xl font-bold">Trustiva Setu</h1>
        <p className="text-sm text-gray-300">
          Aarthsetu Technologies Pvt. Ltd.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-6">

      <div className="hidden md:flex items-center gap-3 bg-white/5 border border-lime-300/20 px-4 py-2 rounded-2xl backdrop-blur-md">
  <span className="text-sm font-medium text-lime-300">
    🌐 Language
  </span>

  <div id="google_translate_element"></div>
</div>

      <nav className="hidden md:flex gap-6">
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
</header>

      {/* HERO */}

      <section
  id="home"
  className="relative overflow-hidden max-w-7xl mx-auto px-6 pt-16 pb-16 grid md:grid-cols-2 gap-8 items-center"
>
  {/* Premium Visible Floating Particles */}

<div className="absolute inset-0 pointer-events-none z-0">

  {/* Dot 1 */}
  <div className="absolute top-20 left-20 w-5 h-5 bg-lime-300 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.8)] animate-pulse" />

  {/* Dot 2 */}
  <div className="absolute top-40 right-32 w-6 h-6 bg-green-300 rounded-full shadow-[0_0_25px_rgba(74,222,128,0.8)] animate-bounce" />

  {/* Dot 3 */}
  <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-lime-200 rounded-full shadow-[0_0_20px_rgba(190,242,100,0.8)] animate-pulse" />

  {/* Dot 4 */}
  <div className="absolute bottom-20 right-20 w-6 h-6 bg-lime-300 rounded-full shadow-[0_0_25px_rgba(163,230,53,0.8)] animate-bounce" />

  {/* Thin Line 1 */}
  <div className="absolute top-32 left-40 w-40 h-[px] bg-lime-300/30 rotate-12" />

  {/* Thin Line 2 */}
  <div className="absolute bottom-40 right-40 w-52 h-[px] bg-green-300/30 -rotate-12" />

</div>
        <div className="relative z-10">
          
          <p
  className="
    mb-6
    mt-2
    text-center
    md:text-left
    text-2xl
    md:text-5xl
    leading-tight
    text-white
    font-normal
    tracking-wide
  "
  style={{
    fontFamily: "Times New Roman, serif",
  }}
>
  Where Healthcare Access
  <br />
  Meets Financial Infrastructure
</p>

<h2 className="luxury-heading text-5xl md:text-7xl leading-[1.05] mb-7">
  Building Healthcare

  <br />
Financing Infrastructure
  <br />
  Across India
</h2>

<p className="premium-text text-lg md:text-xl leading-9 mb-10 max-w-2xl">
  Not another fintech.
  <br />
  Trustiva Division by Aarthsetu Technologies Private Limited enables hospitals,
clinics, fintech partners, lenders and healthcare providers to offer seamless,
embedded healthcare financing solutions—making quality healthcare accessible
and affordable for every patient across India.
</p>

          <div className="flex flex-wrap gap-5 mt-2">
            <a href="#clinics">
              <button
  className="
    premium-btn
    bg-lime-300
    text-black
    px-8
    py-4
    rounded-2xl
    font-bold
    text-lg
    shadow-[0_20px_40px_rgba(163,230,53,0.18)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-[1.02]
  "
>
                Strategic Partnerships
              </button>
            </a>

            <a
  href="#investor-form"
  onClick={(e) => {
    e.preventDefault();
    document
      .getElementById("investor-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="
  premium-btn
  inline-block
  border
  border-lime-300
  px-8
  py-4
  rounded-2xl
  text-lime-300
  font-bold
  text-lg
  transition-all
  duration-300
  hover:bg-lime-300
  hover:text-black
  hover:-translate-y-1
  hover:scale-[1.02]
"
>
  Investor Conversations
</a>
          </div>
        </div>
        <div className="relative mb-4 flex justify-center items-center">
  <div className="absolute w-105 h-105 bg-lime-300/10 blur-[120px] rounded-full" />

  <img
  src="/founder-note-visual.png"
  alt="Trustiva Healthcare Finance Infrastructure"
  className="
    w-full
    max-w-3xl
    object-contain
    rounded-4xl
    border
    border-white/10
    shadow-[0_30px_80px_rgba(0,0,0,0.45)]
    backdrop-blur-xl
  "
/>
</div>
      <div className="mt-4 grid md:grid-cols-2 gap-6 max-w-4xl">

  {/* Abhishek Founder Note */}

  <div className="glass-card p-7">
    <p className="text-sm text-lime-300 font-semibold uppercase tracking-widest mb-3">
      Founder’s Note
    </p>

    <p className="text-gray-200 text-lg leading-8 italic">
      “I am not building a lending company.
I am building the healthcare financing infrastructure layer that ensures
treatment decisions are never delayed because of immediate affordability.”
    </p>

    <p className="mt-4 text-lime-300 font-semibold">
      — Abhishek Kashyap
    </p>
  </div>

  {/* Ajit Founder Note */}

  <div className="glass-card p-7">
    <p className="text-sm text-lime-300 font-semibold uppercase tracking-widest mb-3">
      Co-Founder’s Note
    </p>

    <p className="text-gray-200 text-lg leading-8 italic">
      “Healthcare financing must move from being a support function
to becoming a core infrastructure layer that empowers providers,
lenders and patients at scale.”
    </p>

    <p className="mt-4 text-lime-300 font-semibold">
      — Ajit Singh Yadav
    </p>
  </div>

</div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mt-2">
          <h3 className="text-2xl font-bold mb-6 text-white">
            Key Highlights
          </h3>

          <div className="grid gap-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-white/10 pb-3"
              >
                <ShieldCheck className="text-lime-300 w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-4 rounded-3xl border border-lime-300/20 bg-white/10 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden">

  {/* subtle glow effect */}
  <div className="absolute top-0 right-0 w-40 h-40 bg-lime-300/20 blur-3xl rounded-full" />
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/20 blur-3xl rounded-full" />

  <div className="relative z-10">

    <p className="text-lime-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
      Today’s Leadership Insight
    </p>

    <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
      Founder’s Daily Quote
    </h3>

    <p className="text-xl text-gray-200 leading-9 italic mb-4 min-h-22.5">
  “{typedQuote}”
  <span className="animate-pulse text-lime-300">|</span>
</p>
<div className="relative mb-6">
  <div className="h-[0.5] w-full bg-white/10 rounded-full" />

  <div className="absolute top-0 left-0 h-[0.5] w-32 bg-lime-300 rounded-full animate-pulse shadow-[0_0_20px_rgba(163,230,53,0.8)]" />
</div>
    <div className="flex items-center justify-between flex-wrap gap-4">

      <div>
        <p className="text-sm text-gray-400">
          — {dailyQuote.author}
        </p>

        <p className="text-xs text-lime-300 mt-2 tracking-wide">
          
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-400 italic">
          Trustiva Founder Signature
        </p>

        <p className="text-lg font-semibold text-lime-300">
          Build Trust. Build Scale.
        </p>
      </div>

    </div>

  </div>
</div>
      </section>
{/* TRUST METRICS STRIP */}

<section className="max-w-7xl mx-auto px-6 py-4">
  <div className="grid grid-cols-4 gap-5 max-w-7xl mx-auto">

    {[
  {
    number: 50,
    suffix: "+",
    label: "Active Lender Relationships",
  },
  {
    number: 500,
    suffix: "+",
    label: "Clinic Financing Pipeline",
  },
  {
    number: 2400,
    prefix: "₹",
    suffix: "Cr+",
    label: "Annual Financing Opportunity",
  },
  {
    number: 72,
    suffix: "hr",
    label: "Average Approval Cycle",
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
          boxShadow: "0 20px 40px rgba(163,230,53,0.12)",
        }}
        className="relative bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl px-6 py-5 text-center shadow-xl h-42.5 w-full flex flex-col justify-center overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-lime-300/50 to-transparent" />

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

        <div className="mt-3 h-0.5 w-12 mx-auto bg-lime-300/40 rounded-full" />
      </motion.div>
    ))}

  </div>
</section>
<div className="h-8" />
<section className="max-w-7xl mx-auto px-6 py-10">

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

  <div className="grid md:grid-cols-3 gap-6">

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
        className="max-w-7xl mx-auto px-6 py-14"
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

“No patient should delay treatment because of financial barriers.”

We don’t just provide loans—we create the infrastructure layer
that powers healthcare affordability at scale. 
        </p>
        <div className="mt-20">
  <h2 className="text-4xl font-bold mb-10">
    Founding Team
  </h2>

  <div className="grid md:grid-cols-3 gap-10">

    {/* Abhishek */}

  <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
    <div className="flex justify-center mb-6">
  <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
    <Image
      src="/abhishek.jpg"
      alt="Abhishek Kashyap"
      width={208}
      height={208}
      className="object-cover object-top w-full h-full scale-110"
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
  Building India’s healthcare financing infrastructure with lender-first execution.
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
  <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
    <Image
      src="/ajit.jpg"
      alt="Ajit Singh Yadav"
      width={208}
      height={208}
      className="object-cover object-top w-full h-full scale-110"
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
    <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
      <Image
  src="/manish.png"
  alt="Manish Jaggi"
  width={240}
  height={240}
  className="object-cover object-top w-full h-full scale-110"
/>
    </div>
  </div>

  <h3 className="text-2xl font-bold">
    Mr. Manish Jaggi
  </h3>

  <p className="text-lime-300 font-semibold mb-2">
    Strategic Advisor
  </p>

  <p className="text-gray-300 text-sm mt-2 leading-6">
    Bringing deep banking, NBFC and financial infrastructure expertise
    to strengthen Trustiva’s lender ecosystem and strategic growth.
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
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          Our Financing Solutions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

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
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          For Clinics
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="glass-card p-7 max-w-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Healthcare Provider Partnership Enquiry
            </h3>

            <div className="space-y-4">

 <input
  name="clinicName"
  placeholder="Clinic Name"
  onChange={handleClinicChange}
  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>             
              <input
                name="contactPerson"
                placeholder="Contact Person"
                onChange={handleClinicChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />
<div>
  <div className="flex">
    <span
  className="bg-white/10 border border-white/20 border-r-0 rounded-l-xl px-5 min-w-19.5 h-12.5 flex items-center justify-center text-white font-semibold text-base backdrop-blur-xl"
>
  +91
</span>

    <input
      name="phone"
      placeholder="Phone Number"
      onChange={handleClinicChange}
      className="w-full border border-l-0 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
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
                onChange={handleClinicChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="city"
                placeholder="City"
                onChange={handleClinicChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
  name="specialty"
  placeholder="Specialty"
  onChange={handleClinicChange}
  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
 />

              <textarea
  name="message"
  placeholder="Message"
  onChange={handleClinicChange}
  className="w-full border border-gray-200 rounded-2xl px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>

              <button
                onClick={submitClinic}
                className="w-full bg-[#14532d] hover:bg-[#166534] text-white py-3 rounded-2xl font-semibold text-sm transition-all duration-300"
              >
                Healthcare Provider Partnership Enquiry
              </button>

            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Why Clinics Choose Trustiva Setu
            </h3>

            <div className="space-y-4">
              {clinicBenefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <ArrowRight className="text-lime-300 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FOR PATIENTS */}

      <section
  id="patients"
  className="max-w-7xl mx-auto px-6 py-20"
>
        <h2 className="text-4xl font-bold mb-10">
          For Patients
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

  <div>
    <h3 className="text-2xl font-bold mb-6 text-white">

            <p className="text-gray-300 leading-8 text-lg">
              One application. Multiple lenders. Instant eligibility checks.
Transparent healthcare financing with flexible repayment plans
and zero hidden complexity for better treatment access.
            </p>
    </h3>
          </div>

          <div className="glass-card p-7">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Patient Healthcare Finance Enquiry
            </h3>

            <div className="space-y-4">

              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handlePatientChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <div>
  <div className="flex">
    <span
  className="bg-white/10 border border-white/20 border-r-0 rounded-l-xl px-5 min-w-19.5 h-12.5 flex items-center justify-center text-white font-semibold text-base backdrop-blur-xl"
>
  +91
</span>

    <input
      name="phone"
      placeholder="Phone Number"
      onChange={handlePatientChange}
      className="w-full border border-l-0 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
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
                onChange={handlePatientChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="city"
                placeholder="City"
                onChange={handlePatientChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="treatmentType"
                placeholder="Treatment Type"
                onChange={handlePatientChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="budget"
                placeholder="Approx Budget"
                onChange={handlePatientChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <textarea
  name="message"
  placeholder="Message"
  onChange={handlePatientChange}
  className="w-full border border-gray-200 rounded-2xl px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>

              <button
                onClick={submitPatient}
                className="w-full bg-[#14532d] text-white py-4 rounded-2xl font-semibold hover:bg-[#166534] transition-all duration-300"
              >
                Submit Finance Enquiry
              </button>

            </div>
          
          </div>

</div>
</section>

      {/* APPLICATION LAUNCHING SOON */}

<section className="max-w-7xl mx-auto px-6 py-16">
  <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-linear-to-br from-[#0b1628] via-[#10213d] to-[#07111f] p-10 shadow-2xl">

    {/* Glow Effect */}
    <div className="absolute top-0 right-0 w-72 h-72 bg-lime-300/20 blur-3xl rounded-full" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/20 blur-3xl rounded-full" />

    <div className="relative z-10">

      <div className="flex items-center gap-3 mb-4">
        <motion.div
  initial={{
    y: -200,
    scale: 0.4,
    opacity: 0,
  }}
  animate={{
    y: [ -200, 20, 0 ],
    scale: [0.4, 1.2, 1],
    opacity: 1,
  }}
  transition={{
    duration: 1.8,
    ease: "easeOut",
  }}
  className="relative inline-block"
>
  {/* Main BIG LAUNCH Badge */}

  <div className="px-5 py-2 rounded-full bg-lime-300 text-black font-bold text-sm shadow-2xl">
    BIG LAUNCH 🚀
  </div>

  {/* Burst Star 1 */}

  <motion.div
    className="absolute -top-5 -right-5 text-yellow-300 text-2xl"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.6, 1],
      opacity: [0, 1, 0.6],
      x: [0, 20, 10],
      y: [0, -20, -10],
      rotate: [0, 40, 0],
    }}
    transition={{
      delay: 1.2,
      duration: 1.2,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    ✨
  </motion.div>

  {/* Burst Star 2 */}

  <motion.div
    className="absolute -bottom-4 -left-5 text-yellow-200 text-xl"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.4, 1],
      opacity: [0, 1, 0.5],
      x: [0, -18, -8],
      y: [0, 18, 8],
      rotate: [0, -30, 0],
    }}
    transition={{
      delay: 1.3,
      duration: 1.3,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    ⭐
  </motion.div>

  {/* Burst Star 3 */}

  <motion.div
    className="absolute top-1/2 -right-8 text-lime-200 text-lg"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.3, 1],
      opacity: [0, 1, 0.4],
      x: [0, 22, 10],
      rotate: [0, 20, 0],
    }}
    transition={{
      delay: 1.4,
      duration: 1.1,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    ✦
  </motion.div>
</motion.div>
        <div className="text-lime-300 font-semibold tracking-widest text-sm">
          TRUSTIVA SETU APP
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
        Application Launching
        <span className="block text-lime-300">
          Very Soon 🚀
        </span>
      </h2>

      <p className="text-gray-300 text-lg leading-8 max-w-3xl mb-10">
        India’s smartest healthcare financing application is coming soon —
        built for clinics, patients, lenders and seamless EMI approvals.
        One application. Multiple lenders. Faster approvals. Better conversions.
      </p>

      {/* Moving Strip */}


    

      {/* Features Grid */}

      <div className="grid md:grid-cols-3 gap-5">
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

<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="grid md:grid-cols-2 gap-8">

    {/* Lending Partners */}

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Our Lending Partners
      </h2>

      <p className="text-gray-300 mb-6">
        Trusted NBFCs, Banks & Financial Institutions joining our healthcare
        financing ecosystem.
      </p>

      <div className="relative overflow-hidden border-t border-white/10 pt-5">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="whitespace-nowrap text-lime-300 font-semibold text-xl"
        >
          COMING SOON • COMING SOON •
        </motion.div>
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
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="whitespace-nowrap text-lime-300 font-semibold text-xl"
        >
          COMING SOON • COMING SOON •
        </motion.div>
      </div>
    </div>

  </div>
</section>

{/* WHY We Win */}

<section
  id="why-we-win"
  className="max-w-7xl mx-auto px-6 py-20"
>
  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
  Why We Win
</h2>

<p className="text-center text-gray-300 max-w-3xl mx-auto mb-14 text-lg leading-8">
  Trustiva Setu is not another healthcare financing startup.
  We are building the infrastructure layer that creates long-term
  defensibility across clinics, lenders and patient financing behavior.
</p>
  <div className="grid md:grid-cols-2 gap-8">

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
        To become India’s Healthcare Finance Infrastructure Layer where every
        clinic can offer instant financing and every patient can access
        treatment without upfront financial barriers.
      </p>
    </div>

  </div>
</section>

{/* INVESTOR SECTION */}

<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">

    {/* glow effects */}

    <div className="absolute top-0 right-0 w-72 h-72 bg-lime-300/10 blur-3xl rounded-full" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/10 blur-3xl rounded-full" />

    <div className="relative z-10">

      <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
        For Strategic Investors & Growth Partners
      </p>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Building India’s
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
approval intelligence, clinic workflow integration and lender distribution systems.

to accelerate lender integrations, clinic onboarding,
distribution expansion and national healthcare financing infrastructure deployment.
      </p>
      <div className="grid md:grid-cols-3 gap-5 mb-14">

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5">
    <p className="text-sm text-gray-400 mb-2">
      Raise Stage
    </p>
    <h3 className="text-2xl font-bold text-lime-300">
      Pre-Seed
    </h3>
  </div>

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5">
    <p className="text-sm text-gray-400 mb-2">
      Capital Raise
    </p>
    <h3 className="text-2xl font-bold text-lime-300">
      ₹5 Crore
    </h3>
  </div>

  <div className="bg-white/10 border border-lime-300/20 rounded-3xl p-5">
    <p className="text-sm text-gray-400 mb-2">
      Use of Funds
    </p>
    <h3 className="text-xl font-bold text-lime-300">
      Scale + Distribution
    </h3>
  </div>

</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

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
  href="#for-strategic-investors"
  onClick={(e) => {
    e.preventDefault();
    document
      .getElementById("for-strategic-investors")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="inline-block border border-lime-300 text-lime-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-lime-300 hover:text-black hover:-translate-y-1"
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
  className="max-w-7xl mx-auto px-6 py-20"
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

    <div className="grid md:grid-cols-2 gap-10">

      {/* Left Side Form */}

      <div className="glass-card p-7">

        <input
  type="text"
  name="fullName"
  value={investorForm.fullName}
  onChange={handleInvestorChange}
  placeholder="Full Name"
  className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/30 transition-all"
/>


        <input
  type="text"
  name="companyName"
  value={investorForm.companyName}
  onChange={handleInvestorChange}
  placeholder="Fund / Company Name"
  className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/30 transition-all"
/>

        <input
  type="email"
  name="email"
  value={investorForm.email}
  onChange={handleInvestorChange}
  placeholder="Email Address"
  className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/30 transition-all"
/>

        <div>
  <div className="flex">

    <span
  className="bg-white/10 border border-white/20 border-r-0 rounded-l-xl px-5 min-w-19.5 h-12.5 flex items-center justify-center text-white font-semibold text-base backdrop-blur-xl"
>
  +91
</span>

    <input
      type="text"
      name="phone"
      value={investorForm.phone}
      onChange={handleInvestorChange}
      placeholder="Phone Number"
      className="w-full border border-l-0 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
    />

  </div>

  {investorErrors.phone && (
    <p className="text-red-500 text-sm mt-1">
      {investorErrors.phone}
    </p>
  )}
</div>

        <input
  type="text"
  name="investmentInterest"
  value={investorForm.investmentInterest}
  onChange={handleInvestorChange}
  placeholder="Investment Interest"
  className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/30 transition-all"
/>

        <textarea
  name="strategicNotes"
  value={investorForm.strategicNotes}
  onChange={handleInvestorChange}
  placeholder="Strategic Notes"
  className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-400 rounded-2xl px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>

        <button
        onClick={submitInvestor}
          className="w-full bg-[#14532d] text-white py-4 rounded-2xl font-semibold hover:bg-[#166534] transition-all duration-300"
        >
          Request Investor Access
        </button>
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

{/* CUSTOMER REVIEWS + CONTACT DETAILS */}

<section
  id="contact"
  className="max-w-7xl mx-auto px-6 py-20"
>
  <div className="bg-white/10 backdrop-blur-2xl border border-lime-300/20 rounded-3xl p-10 shadow-2xl">

    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
      Customer Reviews & Business Contact Details
    </h2>

    <div className="grid md:grid-cols-2 gap-10">

      {/* LEFT SIDE — Reviews */}

      <div>
        <h3 className="text-2xl font-bold mb-6 text-white">
          Trusted By Patients & Clinics
        </h3>

        <p className="text-gray-300 leading-8 text-lg mb-8">
          Real experiences from patients and clinics using
          Trustiva Setu for faster approvals, smoother financing
          and stress-free treatment access.
        </p>

        <div className="overflow-hidden h-125">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            className="space-y-6"
          >
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="glass-card p-6 border border-lime-300/10"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-300 leading-7 mb-4">
                  {review.message}
                </p>

                <p className="text-lime-300 font-semibold">
                  — {review.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE — Form + Contact */}

      <div className="space-y-8">

        {/* Review Form */}

        <div className="glass-card p-7">
          <h3 className="text-2xl font-bold mb-6 text-white">
            Add Your Review
          </h3>

          <div className="space-y-4">

            <input
              name="name"
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={handleReviewChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
            />

            {reviewErrors.name && (
              <p className="text-red-500 text-sm">
                {reviewErrors.name}
              </p>
            )}

            <textarea
              name="message"
              placeholder="Write Your Review"
              value={reviewForm.message}
              onChange={handleReviewChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
            />

            {reviewErrors.message && (
              <p className="text-red-500 text-sm">
                {reviewErrors.message}
              </p>
            )}

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setReviewForm({
                      ...reviewForm,
                      rating: star,
                    })
                  }
                  className="transition hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= reviewForm.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={submitReview}
              className="w-full bg-[#14532d] text-white py-4 rounded-2xl font-semibold hover:bg-[#166534] transition-all duration-300"
            >
              Submit Review
            </button>

          </div>
        </div>

        {/* Business Contact Details */}

        <div className="glass-card p-7">
          <h3 className="text-2xl font-bold mb-6 text-white">
            Let’s Build Healthcare Access Together
          </h3>

          <div className="space-y-4 text-gray-300">

            <div className="flex items-center gap-3">
              <Mail className="text-lime-300" />
              info@trustivasetu.com
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-lime-300" />
              support@trustivasetu.com
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="text-lime-300" />
              Aarthsetu Technologies Pvt. Ltd.
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-lime-300" />
              +91 Your Number
            </div>

          </div>

          {/* Social Icons */}

          <div className="mt-8">
            <p className="text-lime-300 font-semibold mb-4">
              Follow Us
            </p>

            <div className="flex gap-5">

  

            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</section>
<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="relative overflow-hidden rounded-4xl border border-lime-300/20 bg-white/5 backdrop-blur-2xl p-12 shadow-2xl">

    <div className="absolute top-0 right-0 w-72 h-72 bg-lime-300/10 blur-3xl rounded-full" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/10 blur-3xl rounded-full" />

    <div className="relative z-10 text-center">

      <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
        Final Vision
      </p>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
        Building India’s
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
          className="bg-lime-300 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition"
        >
          Investor Conversations
        </a>

        <a
          href="/trustiva_strategic_partnership_deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-lime-300 text-lime-300 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-lime-300 hover:text-black transition"
        >
          Strategic Partnership Deck
        </a>

      </div>

    </div>

  </div>

</section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-12 text-center text-gray-400">

  <div className="max-w-5xl mx-auto px-6 space-y-4">

    <h3 className="text-xl font-bold text-white">
      Aarthsetu Technologies Private Limited
    </h3>

    <p className="text-gray-300">
      Trustiva Division — Building Healthcare Financing Infrastructure Layer for India
    </p>

    <p className="text-sm text-gray-400">
      CIN: [Applied For]
    </p>

    <p className="text-sm text-gray-400">
      Registered Office: [5/70,Friend's Colony,Chandra Nagar,Moradabad-244001]
    </p>

    <p className="text-sm text-gray-400">
      Compliant with applicable corporate, financial and operational regulations.
    </p>

    <p className="text-sm text-gray-500 pt-4">
      © 2026 Aarthsetu Technologies Private Limited. All Rights Reserved.
    </p>

  </div>

</footer>

</div>
);
}