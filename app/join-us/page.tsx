"use client";

import { useState } from "react";

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    phone: "",
    email: "",
    position: "",
    message: "",
  });

  // ✅ NEW: resume state (ADDED ONLY)
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ NEW: file handler (ADDED ONLY)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // ✅ NEW: SUBMIT HANDLER (ADDED ONLY)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = new FormData();

  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("region", formData.region);
  form.append("phone", formData.phone);
  form.append("position", formData.position);
  form.append("message", formData.message);


  if (resumeFile) {
    form.append("resume", resumeFile);
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  if (data.success) {
  alert("Application submitted successfully");

  // 🔥 RESET FORM (ADDED ONLY)
  setFormData({
    name: "",
    region: "",
    phone: "",
    email: "",
    position: "",
    message: "",
  });

  setResumeFile(null);
} else {
  alert(data.error || "Something went wrong");
}
  };
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
      desc: "Build India’s healthcare financing infrastructure tech stack.",
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
      desc: "Build Trustiva’s brand, storytelling and digital presence.",
      points: [
        "Social media & campaigns",
        "Content strategy",
        "Brand positioning",
        "Growth experiments",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
          Don’t Just Join a Company.
          <span className="block text-lime-300">
            Build India’s Healthcare Financing Infrastructure
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-8">
          We are not hiring employees.
          We are building operators, leaders and builders who want to create
          India’s most powerful healthcare financing ecosystem.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-20 mt-10">

          <div className="bg-gradient-to-br from-lime-300/10 to-transparent border border-lime-300/40 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-lime-300 mb-2">
              Real Ownership
            </h3>
            <p className="text-gray-300">
              You don’t execute tasks. You build systems.
            </p>
          </div>

          <div className="bg-gradient-to-br from-lime-300/10 to-transparent border border-lime-300/40 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-lime-300 mb-2">
              High Growth Curve
            </h3>
            <p className="text-gray-300">
              Work directly with founders. Learn fast. Grow faster.
            </p>
          </div>

          <div className="bg-gradient-to-br from-lime-300/10 to-transparent border border-lime-300/40 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-lime-300 mb-2">
              Infra-Level Impact
            </h3>
            <p className="text-gray-300">
              You’re not building a product. You’re building an industry layer.
            </p>
          </div>

        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-lime-300">
          Open Vacancies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">

          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col min-h-[280px] hover:scale-[1.03] transition"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {job.title}
              </h3>

              <p className="text-sm text-gray-400 mb-3">
                {job.desc}
              </p>

              <ul className="text-xs text-gray-400 space-y-2 mt-auto">
                {job.points.map((p, index) => (
                  <li key={index}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border border-white/10 rounded-3xl p-6 sm:p-8 bg-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Build With Us?
          </h2>

          <p className="text-gray-400 mb-6">
            If you’re serious about building something big,
            we want to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="text"
              name="region"
              placeholder="Region / City"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />
<select
  name="position"
  value={formData.position}
  onChange={handleChange}
  className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
>
  <option value="">Select Position</option>
  <option>Debt Manager</option>
  <option>Inside Sales Manager</option>
  <option>Inside Sales Executive</option>
  <option>Business Development Field</option>
  <option>Business Development Inside</option>
  <option>HR</option>
  <option>Tech</option>
  <option>Operations</option>
  <option>Branding</option>
</select>
            {/* NEW RESUME FIELD (ENHANCED ONLY) */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-2 block">
                Upload Your Resume
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 file:bg-lime-300 file:text-black file:px-4 file:py-2 file:rounded-lg"
              />
              {resumeFile && (
                <p className="text-xs text-green-400 mt-2">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>

            <textarea
              name="message"
              placeholder="Why do you want to join us?"
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <button className="md:col-span-2 bg-lime-300 text-black py-4 rounded-2xl font-bold">
              Submit Application
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}