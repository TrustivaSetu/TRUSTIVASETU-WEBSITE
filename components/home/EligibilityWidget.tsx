"use client";

import { useRef, useState } from "react";
import { celebrate } from "@/lib/celebrate";

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
  const submitRef = useRef<HTMLButtonElement>(null);

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
    celebrate(submitRef.current);
    const url = `https://lms.trustivasetu.com/chat?treatment=${encodeURIComponent(
      treatment
    )}&cost=${encodeURIComponent(cost)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 max-w-lg"
    >
      <p className="text-sm text-slate-300 mb-2.5">Check your No-Cost EMI eligibility</p>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2.5">
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="bg-[#07111f] border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-lime-300"
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
          placeholder="Treatment cost (₹)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="bg-[#07111f] border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-lime-300"
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <button
        ref={submitRef}
        type="submit"
        className="premium-btn premium-green-btn btn-shine w-full mt-2.5"
      >
        <span className="relative z-[1]">Check my EMI options</span>
      </button>
    </form>
  );
}

