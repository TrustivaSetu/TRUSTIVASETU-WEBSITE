"use client";

import { useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ─── DATA ─────────────────────────────────────────── */

const whyUs = [
  {
    icon: "🏗️",
    title: "Real Ownership",
    desc: "You don't execute tasks. You own systems — from design to deployment.",
  },
  {
    icon: "📈",
    title: "High Growth Curve",
    desc: "Work directly with founders. Steep learning curve. Fast career acceleration.",
  },
  {
    icon: "🌏",
    title: "Infra-Level Impact",
    desc: "You're not building a product. You're building the infrastructure layer of India's healthcare economy.",
  },
  {
    icon: "🧠",
    title: "First-Principles Thinking",
    desc: "We question every assumption. No legacy baggage. Build from scratch.",
  },
  {
    icon: "👥",
    title: "Direct Founder Access",
    desc: "No layers of management. Work face-to-face with the founding team daily.",
  },
  {
    icon: "❤️",
    title: "Meaningful Work",
    desc: "Every feature you ship directly improves someone's ability to access healthcare.",
  },
];

// Standard fintech startup benefits — marked [STANDARD] for owner verification
const perks = [
  { icon: "🏥", label: "Health Insurance*" },
  { icon: "⏰", label: "Flexible Hours*" },
  { icon: "💰", label: "Performance Bonus*" },
  { icon: "📚", label: "L&D Budget*" },
  { icon: "🌴", label: "Paid Leaves*" },
  { icon: "🏠", label: "Remote Options*" },
  { icon: "🎊", label: "Festival Bonus*" },
  { icon: "🎉", label: "Team Outings*" },
];

const values = [
  {
    icon: "💡",
    title: "Innovation",
    desc: "We question every assumption and rebuild from first principles. Status quo is never good enough.",
    gradient: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: "🤝",
    title: "Integrity",
    desc: "Transparent with our team, our partners and the patients we serve. Always.",
    gradient: "from-lime-500/20 to-green-500/10",
    border: "border-lime-500/20",
  },
  {
    icon: "🎯",
    title: "Impact",
    desc: "Every line of code, every call — directly affects someone's access to healthcare.",
    gradient: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: "🌈",
    title: "Inclusion",
    desc: "Diverse perspectives build stronger infrastructure. Everyone's voice counts.",
    gradient: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/20",
  },
];

const jobs = [
  {
    title: "Debt Manager – Lender Partnerships",
    desc: "Own lender acquisition, onboarding and relationship management across NBFCs and financial institutions.",
    points: [
      "Identify and onboard new lending partners",
      "Build lender network strategy",
      "Drive deal closures & partnerships",
      "Manage approval pipelines & lender coordination",
    ],
  },
  {
    title: "Inside Sales Manager",
    desc: "Drive revenue through high-conversion sales processes and team leadership.",
    points: [
      "Manage inside sales team",
      "Build sales scripts & conversion funnels",
      "Track performance & optimize pipelines",
      "Close high-value deals",
    ],
  },
  {
    title: "Inside Sales Executive",
    desc: "Convert inbound leads into active clinic & customer partnerships.",
    points: [
      "Handle inbound leads",
      "Explain financing solutions",
      "Drive conversions",
      "Maintain CRM data",
    ],
  },
  {
    title: "Business Development – Field",
    desc: "On-ground expansion role focused on clinic onboarding.",
    points: [
      "Visit clinics & hospitals",
      "Close partnerships",
      "Build city-level networks",
      "Drive market expansion",
    ],
  },
  {
    title: "Business Development – Inside",
    desc: "Remote partnership building & onboarding execution.",
    points: [
      "Reach out to clinics digitally",
      "Schedule demos",
      "Convert partnerships",
      "Support expansion team",
    ],
  },
  {
    title: "HR – Talent & Culture",
    desc: "Build the core team and shape company culture.",
    points: [
      "Hiring & onboarding",
      "Culture building",
      "Performance systems",
      "Team management",
    ],
  },
  {
    title: "Tech – Platform Development",
    desc: "Build India's healthcare financing infrastructure tech stack.",
    points: [
      "Develop platform & dashboards",
      "Build approval engine",
      "Integrate APIs",
      "Scale backend systems",
    ],
  },
  {
    title: "Operations – Lender & Company Ops",
    desc: "Ensure smooth execution across lenders, clinics and internal systems.",
    points: [
      "Manage lender operations",
      "Handle approvals & workflows",
      "Improve process efficiency",
      "Coordinate cross teams",
    ],
  },
  {
    title: "Branding & Growth",
    desc: "Build Trustiva's brand, storytelling and digital presence.",
    points: [
      "Social media & campaigns",
      "Content strategy",
      "Brand positioning",
      "Growth experiments",
    ],
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    phone: "",
    email: "",
    position: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("region", formData.region);
    form.append("phone", formData.phone);
    form.append("position", formData.position);
    form.append("message", formData.message);
    if (resumeFile) form.append("resume", resumeFile);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", region: "", phone: "", email: "", position: "", message: "" });
        setResumeFile(null);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputClass =
    "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40 transition-all min-h-[52px]";

  return (
    <div className="min-h-screen bg-[#07111f] text-white">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-24 sm:py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-lime-300/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-300/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            We&apos;re Hiring
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Build the Future of
            <span className="block text-lime-300">Healthcare Finance</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-8 mb-10">
            Join Trustiva Setu — where technology meets healthcare access.
            We&apos;re not hiring employees. We&apos;re building operators, leaders and builders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#openings">
              <button className="min-h-[52px] bg-lime-300 text-black font-bold px-8 py-3.5 rounded-2xl text-lg hover:-translate-y-1 transition-all shadow-xl hover:shadow-lime-300/20 w-full sm:w-auto">
                View Opportunities ↓
              </button>
            </a>
            <a href="#apply">
              <button className="min-h-[52px] bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl text-lg hover:bg-white/20 transition-all w-full sm:w-auto">
                Apply Now
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY WORK WITH US ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3 text-center">
          Life at Trustiva
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Why Work With Us
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-12 leading-7">
          We are not a typical company. We are building India&apos;s healthcare financing infrastructure — and we want builders, not passengers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white/8 to-white/3 border border-lime-300/15 rounded-2xl p-6 hover:border-lime-300/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_16px_32px_rgba(190,242,100,0.08)]"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-lime-300 mb-2">{item.title}</h3>
              <p className="text-gray-300 leading-7 text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PERKS & BENEFITS BANNER ───────────────────── */}
      <section className="py-14 bg-lime-300/5 border-y border-lime-300/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-2">
            Perks & Benefits
          </p>
          <p className="text-center text-gray-400 text-xs mb-8">
            *Standard fintech startup benefits — confirm details before accepting any offer
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/8 border border-lime-300/20 rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium text-white hover:bg-lime-300/10 transition-all min-h-[44px]"
              >
                <span className="text-xl">{perk.icon}</span>
                <span>{perk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE & VALUES ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3 text-center">
          How We Work
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Our Culture & Values
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-12 leading-7">
          Four principles that guide every decision at Trustiva Setu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${v.gradient} border ${v.border} rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-gray-300 text-sm leading-6">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPEN POSITIONS ───────────────────────────── */}
      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-lime-300">
          Current Openings
        </h2>
        <p className="text-center text-gray-400 mb-12">
          We&apos;re actively hiring across all functions. Apply below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-lime-300/30 hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 leading-6">{job.desc}</p>
              <ul className="text-xs text-gray-400 space-y-1.5 mt-auto">
                {job.points.map((p, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <span className="text-lime-300 mt-0.5 flex-shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a href="#apply" className="mt-5">
                <button className="w-full min-h-[44px] bg-lime-300/10 border border-lime-300/30 text-lime-300 text-sm font-semibold rounded-xl py-2.5 hover:bg-lime-300/20 transition-all">
                  Apply for this role →
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Email CTA for general applications */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-lg font-semibold mb-2">
            Don&apos;t see your role listed?
          </p>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Send us your CV anyway — exciting opportunities are added regularly.
          </p>
          <a
            href="mailto:info@trustivasetu.com"
            className="inline-flex items-center gap-2 text-lime-300 font-semibold text-lg hover:underline min-h-[44px]"
          >
            📧 info@trustivasetu.com
          </a>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────── */}
      <section id="apply" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">
          Ready to Build With Us?
        </h2>
        <p className="text-gray-400 mb-10 text-center text-sm sm:text-base">
          If you&apos;re serious about building something big, we want to hear from you.
        </p>

        {submitStatus === "success" ? (
          <div className="bg-lime-300/10 border border-lime-300/40 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-lime-300 mb-2">Application Received!</h3>
            <p className="text-gray-300 mb-6">
              Thank you for applying to Trustiva Setu. Our team will review your application
              and reach out within 3–5 business days.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="min-h-[44px] bg-lime-300 text-black font-bold px-6 py-3 rounded-xl hover:bg-lime-200 transition-all"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <div className="border border-white/10 rounded-3xl p-6 sm:p-8 bg-white/5">
            {submitStatus === "error" && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                Something went wrong. Please try again or email us at{" "}
                <a href="mailto:info@trustivasetu.com" className="underline">
                  info@trustivasetu.com
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="text"
                name="region"
                placeholder="Region / City"
                value={formData.region}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                className={inputClass}
              />

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={`${inputClass} col-span-1 sm:col-span-2`}
              >
                <option value="">Select Position You&apos;re Applying For</option>
                <option>Debt Manager – Lender Partnerships</option>
                <option>Inside Sales Manager</option>
                <option>Inside Sales Executive</option>
                <option>Business Development – Field</option>
                <option>Business Development – Inside</option>
                <option>HR – Talent & Culture</option>
                <option>Tech – Platform Development</option>
                <option>Operations – Lender & Company Ops</option>
                <option>Branding & Growth</option>
                <option>Other / General Application</option>
              </select>

              <div className="col-span-1 sm:col-span-2">
                <label className="text-sm text-gray-400 mb-2 block font-medium">
                  Upload Your Resume (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 file:bg-lime-300 file:text-black file:px-4 file:py-2 file:rounded-lg file:font-semibold file:mr-3 file:border-0 min-h-[44px]"
                />
                {resumeFile && (
                  <p className="text-xs text-lime-400 mt-2 flex items-center gap-1">
                    ✓ {resumeFile.name}
                  </p>
                )}
              </div>

              <textarea
                name="message"
                placeholder="Why do you want to join Trustiva Setu? What makes you the right fit?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} col-span-1 sm:col-span-2 h-auto`}
              />

              <label className="col-span-1 sm:col-span-2 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 accent-lime-300 w-4 h-4 flex-shrink-0" />
                <span className="text-xs text-gray-400 leading-5">
                  I agree to the{" "}
                  <a href="/privacy-policy" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" className="text-lime-300 underline" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>.
                  I consent to Trustiva Setu processing my application data.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="col-span-1 sm:col-span-2 min-h-[52px] bg-lime-300 text-black font-bold py-4 rounded-2xl text-base sm:text-lg hover:-translate-y-0.5 transition-all hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitStatus === "loading" ? "Submitting…" : "Submit Application"}
              </button>

            </form>
          </div>
        )}
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────── */}
      <div className="border-t border-white/10 py-8 text-center text-gray-500 text-xs px-4">
        <p>Trustiva Setu · Aarthsetu Technologies Private Limited · Moradabad, Uttar Pradesh</p>
        <p className="mt-1">
          General:{" "}
          <a href="mailto:info@trustivasetu.com" className="text-lime-300 hover:underline">
            info@trustivasetu.com
          </a>
          {" · "}
          Admin:{" "}
          <a href="mailto:admin@trustivasetu.com" className="text-lime-300 hover:underline">
            admin@trustivasetu.com
          </a>
        </p>
      </div>

    </div>
  );
}
