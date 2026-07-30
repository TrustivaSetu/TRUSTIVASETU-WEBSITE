"use client";

import { useState } from "react";
import { landingData } from "@/lib/landing-data";

export default function FAQ({
  page = "medical",
}: {
  page?: keyof typeof landingData;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = landingData[page].faqs;

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
            Everything you need to know before applying through Trustiva Setu.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-700 bg-gray-900/50 transition-colors hover:bg-gray-900"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-4 text-left"
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
                <div className="border-t border-gray-700 px-6 pb-4 text-gray-400">
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
