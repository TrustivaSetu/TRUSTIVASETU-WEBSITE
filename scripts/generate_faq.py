from pathlib import Path

content = '''"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a medical loan?",
    a: "A medical loan helps finance eligible healthcare expenses. Final approval and loan terms are determined by the lending partner.",
  },
  {
    q: "Can I apply for an IVF loan?",
    a: "Yes. Financing may be available for IVF and other fertility treatments through participating lending partners.",
  },
  {
    q: "What documents are generally required?",
    a: "Typically PAN, Aadhaar, income proof and other KYC documents may be required. Requirements vary by lender.",
  },
  {
    q: "How long does the process take?",
    a: "The timeline depends on document verification and the lending partner's assessment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#bef264]">
          FAQ
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-12 space-y-4">
        {faqs.map((item, index) => (
          <div
            key={item.q}
            className="rounded-xl border border-white/10 bg-white/5"
          >
            <button
              className="flex w-full items-center justify-between p-5 text-left"
              onClick={() =>
                setOpen(open === index ? null : index)
              }
            >
              <span className="font-semibold">{item.q}</span>
              <span>{open === index ? "-" : "+"}</span>
            </button>

            {open === index && (
              <div className="border-t border-white/10 px-5 py-4 text-gray-300">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
'''

Path("components/landing").mkdir(parents=True, exist_ok=True)
Path("components/landing/FAQ.tsx").write_text(content, encoding="utf-8")
print("✅ FAQ.tsx created")
