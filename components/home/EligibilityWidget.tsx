"use client";

import { useState } from "react";

const treatments = [
  "IVF / Fertility",
  "Dental",
  "Cosmetic Surgery",
  "Hair Transplant",
  "LASIK / Eye Care",
  "Bariatric Surgery",
  "Other Medical Treatment",
];

export default function EligibilityWidget() {
  const [treatment, setTreatment] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!treatment) {
      setError("Select a treatment first.");
      return;
    }
    if (!cost || Number(cost) <= 0) {
      setError("Enter a valid treatment cost.");
      return;
    }
    setError("");
    const url = `https://lms.trustivasetu.com/chat?treatment=${encodeURIComponent(
      treatment
    )}&cost=${encodeURIComponent(cost)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 max-w-md"
    >
      <p className="text-sm text-slate-300 mb-3">Check your No-Cost EMI eligibility</p>
      <div className="flex flex-col gap-2.5">
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="bg-[#07111f] border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-300"
        >
          <option value="">Select treatment</option>
          {treatments.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          placeholder="Estimated treatment cost (₹)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="bg-[#07111f] border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-lime-300"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" className="premium-btn premium-green-btn w-full">
          Check my EMI options
        </button>
      </div>
    </form>
  );
}

