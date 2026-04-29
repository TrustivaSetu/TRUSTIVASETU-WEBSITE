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

  return (
    <div className="min-h-screen bg-[#07111f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Join <span className="text-lime-300">Trustiva Setu</span>
        </h1>

        <p className="text-gray-300 mb-12 text-lg">
          Build India’s Healthcare Financing Infrastructure with us.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            "Debt Manager – New Lender Opportunity & Onboarding",
            "Investor Relations – Meeting & Closure",
            "Data Analyst Intern – Sales Growth Strategy",
            "Sales Manager – Healthcare Financing",
            "Inside Sales Relationship Manager",
            "Clinic Partnership Manager",
          ].map((job) => (
            <div
              key={job}
              className="border border-white/10 rounded-2xl p-6 bg-white/5"
            >
              <h3 className="text-xl font-semibold">
                {job}
              </h3>
            </div>
          ))}
        </div>

        <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
          <h2 className="text-3xl font-bold mb-8">
            Apply Now
          </h2>

          <form className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="text"
              name="region"
              placeholder="Region / City"
              required
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <div className="flex">
              <span className="bg-white/10 border border-white/10 rounded-l-xl px-4 flex items-center">
                +91
              </span>

              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                required
                onChange={handleChange}
                className="w-full p-4 rounded-r-xl bg-white/5 border border-white/10"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              required
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <select
              name="position"
              required
              onChange={handleChange}
              className="p-4 rounded-xl bg-white text-black border border-white/10"
            >
              <option value="">Select Position</option>
              <option>Debt Manager</option>
              <option>Investor Relations</option>
              <option>Data Analyst Intern</option>
              <option>Sales Manager</option>
              <option>Inside Sales RM</option>
              <option>Clinic Partnership Manager</option>
            </select>

            <input
              type="file"
              name="resume"
              required
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <textarea
              name="message"
              placeholder="Why do you want to join us?"
              rows={5}
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-lime-300 text-black font-bold py-4 rounded-2xl"
            >
              Submit Application
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}