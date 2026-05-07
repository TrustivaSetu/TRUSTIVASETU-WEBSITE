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
const [reviews, setReviews] = useState<any[]>([]);
useEffect(() => {
  try {
    const saved = localStorage.getItem("trustivaReviews");
    if (saved) setReviews(JSON.parse(saved));
  } catch (e) {
    console.error("LocalStorage error", e);
  }
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

    console.log(WEB3_ACCESS_KEY);

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

    console.log(result);

    if (result.success) {

      alert("Clinic enquiry submitted successfully!");

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

      alert(result.message || "Something went wrong!");

    }

  } catch (error) {

    console.log(error);

    alert("Network error!");

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

    console.log(WEB3_ACCESS_KEY);

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

    console.log(result);

    if (result.success) {

      alert("Investor request submitted!");

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

      alert(result.message || "Error submitting form");

    }

  } catch (error) {

    console.log(error);

    alert("Network error");

  }

  setInvestorLoading(false);
};

  const submitPatient = async () => {

  if (!validatePatientForm()) return;

  setPatientLoading(true);

  try {

    console.log(WEB3_ACCESS_KEY);

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

    console.log(result);

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

      setPatientErrors({});

    } else {

      alert(result.message || "Error submitting form");

    }

  } catch (error) {

    console.log(error);

    alert("Network error");

  }

  setPatientLoading(false);
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
    <div className={`min-h-screen bg-[#07111f] text-white ${menuOpen ? "fixed w-full" : ""}`}>

      {/* HEADER */}

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

      <header className="sticky top-0 z-50 bg-[#07111f]/95 backdrop-blur-md border-b border-white/10">
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
    <div className="flex items-center gap-6">

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
</header>

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
  Powering India’s
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
      Today’s Leadership Insight
    </p>

    <h3 className="text-3xl md:text-4xl font-bold mb-6">
      Founder’s Daily Quote
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
    number: 72,
    suffix: "hr",
    label: "Fast Approval Cycles",
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

“No patient should delay treatment because of financial barriers.”

We don’t just provide loans—we create the infrastructure layer
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
  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
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
    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
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
    Manish Jaggi
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
  onChange={handleClinicChange}
  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>  
{clinicErrors.clinicName && (
  <p className="text-red-500 text-sm mt-1">
    {clinicErrors.clinicName}
  </p>
)}         
              <input
                name="contactPerson"
                placeholder="Contact Person"
                onChange={handleClinicChange}
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
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
    onChange={handleClinicChange} // (change accordingly)
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
  {clinicErrors.phone && (
  <p className="text-red-500 text-sm mt-1">
    {clinicErrors.phone}
  </p>
)}

</div>
              
</div>
              <input
                name="email"
                placeholder="Email"
                onChange={handleClinicChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
              />
              {clinicErrors.email && (
  <p className="text-red-500 text-sm mt-1">
    {clinicErrors.email}
  </p>
)}

              <input
                name="city"
                placeholder="City"
                onChange={handleClinicChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
              />

              <input
  name="specialty"
  placeholder="Specialty"
  onChange={handleClinicChange}
  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
 />

              <textarea
  name="message"
  placeholder="Message"
  onChange={handleClinicChange}
  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
/>

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
  className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
>
        <h2 className="text-4xl font-bold mb-10">
          For Patients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

  <div>
    <h3 className="text-2xl font-bold mb-6 text-white">
           One application. Multiple lenders. Instant eligibility checks.
           </h3>
              <p className="text-gray-300 leading-8 text-lg">
Transparent healthcare financing with flexible repayment plans
and zero hidden complexity for better treatment access.
            </p>
  
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Patient Healthcare Finance Enquiry
            </h3>

            <div className="space-y-4">

  <input
    name="fullName"
    placeholder="Full Name"
    onChange={handlePatientChange}
    className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
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
      onChange={handlePatientChange}
      className="w-full bg-white/5 border border-white/20 rounded-r-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40"
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
                className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
              />
              {patientErrors.email && (
  <p className="text-red-500 text-sm mt-1">
    {patientErrors.email}
  </p>
)}

              <input
                name="city"
                placeholder="City"
                onChange={handlePatientChange}
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="treatmentType"
                placeholder="Treatment Type"
                onChange={handlePatientChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <input
                name="budget"
                placeholder="Approx Budget"
                onChange={handlePatientChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
              />

              <textarea
  name="message"
  placeholder="Message"
  onChange={handlePatientChange}
  className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 rounded-xl px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all"
/>

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
        India’s smartest healthcare financing application is coming soon —
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
      <h2 className="text-3xl font-bold mb-4 text-white">
        Our Lending Partners
      </h2>

      <p className="text-gray-300 mb-6">
        Trusted NBFCs, Banks & Financial Institutions joining our healthcare
        financing ecosystem.
      </p>

      <div className="relative overflow-hidden border-t border-white/10 pt-5">
        <div className="text-lime-300 font-semibold text-xl">
  Partner integrations in progress
</div>
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
        To become India’s Healthcare Finance Infrastructure Layer where every
        clinic can offer instant financing and every patient can access
        treatment without upfront financial barriers.
      </p>
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
  href="#for-strategic-investors"
  onClick={(e) => {
    e.preventDefault();
    document
      .getElementById("for-strategic-investors")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
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
      className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
    />

    <input
      type="text"
      name="companyName"
      value={investorForm.companyName}
      onChange={handleInvestorChange}
      placeholder="Fund / Company Name"
      className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
    />

    <input
      type="email"
      name="email"
      value={investorForm.email}
      onChange={handleInvestorChange}
      placeholder="Email Address"
      className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
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
        className="w-full bg-white/5 border border-white/20 rounded-r-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40"
      />
    </div>

    <input
      type="text"
      name="investmentInterest"
      value={investorForm.investmentInterest}
      onChange={handleInvestorChange}
      placeholder="Investment Interest"
      className="w-full bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-300/40"
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

  <div className="review-strip-wrapper">

  <div className="review-strip">

    {duplicatedReviews.length > 0 ? (

      duplicatedReviews.map((review, index) => (

        <div
          key={index}
          className="review-card"
        >

          <div className="flex mb-4 text-xl text-yellow-400">
            {"⭐".repeat(review.rating)}
          </div>

          <p className="text-gray-300 leading-8 text-lg italic">
            “{review.message}”
          </p>

          <p className="text-lime-300 mt-4 font-semibold">
            — {review.name}
          </p>

        </div>

      ))

    ) : (

      <>

        <div className="review-card">

          <p className="text-gray-300">
            “This model can significantly improve patient conversion in clinics.”
          </p>

          <p className="text-lime-300 mt-4">
            — Clinic Partner (Delhi)
          </p>

        </div>

        <div className="review-card">

          <p className="text-gray-300">
            “Multi-lender approach is exactly what healthcare financing needs.”
          </p>

          <p className="text-lime-300 mt-4">
            — NBFC Partner
          </p>

        </div>

      </>

    )}

  </div>

</div>

  

  <div className="hidden grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="bg-white/5 p-6 rounded-2xl">
      <p className="text-gray-300">
        “This model can significantly improve patient conversion in clinics.”
      </p>
      <p className="text-lime-300 mt-4">— Clinic Partner (Delhi)</p>
    </div>

    <div className="bg-white/5 p-6 rounded-2xl">
      <p className="text-gray-300">
        “Multi-lender approach is exactly what healthcare financing needs.”
      </p>
      <p className="text-lime-300 mt-4">— NBFC Partner</p>
    </div>

  </div>

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
      <option value={5}>⭐⭐⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
    </select>

    {reviewErrors.rating && <p className="text-red-500">{reviewErrors.rating}</p>}

    <button
      onClick={submitReview}
      className="premium-btn premium-green-btn w-full"
    >
      Submit Review
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
      CIN: U66190UP2026PTC247393
    </p>

    <p className="text-sm text-gray-400">
      Registered Office: Moradabad Uttar Pradesh 
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