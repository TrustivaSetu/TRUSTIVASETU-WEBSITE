"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is a medical loan?",
    answer:
      "A medical loan helps finance eligible healthcare expenses. Loan approval, amount and repayment terms are decided by the lending partner.",
  },
  {
    question: "Can I apply for an IVF loan?",
    answer:
      "Yes. Eligible applicants can apply for financing for IVF and other fertility treatments through participating lending partners.",
  },
  {
    question: "What documents are required?",
    answer:
      "Generally PAN, Aadhaar, address proof, income proof and other KYC documents may be required. Requirements vary by lender.",
  },
  {
    question: "How long does approval take?",
    answer:
      "The approval timeline depends on document verification and the lending partner's assessment process.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#07111f] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#bef264]">
            FAQ
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Everything you need to know before applying for a medical loan
            through TrustivaSetu.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-semibold text-white">
                  {faq.question}
                </span>
                <span
                  className={`text-[#bef264] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400 border-t border-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}