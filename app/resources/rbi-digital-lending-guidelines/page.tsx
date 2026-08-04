import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RBI Digital Lending Guidelines | Trustiva Setu",
  description:
    "Understand RBI Digital Lending Guidelines and how they relate to transparent healthcare financing, medical loans and patient protection.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        RBI Digital Lending Guidelines
      </h1>

      <p className="mb-6">
        Digital lending in India is governed by the Reserve Bank of India's
        regulatory framework to improve transparency, borrower protection and
        responsible lending practices.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why it matters for healthcare finance
      </h2>

      <p className="mb-6">
        Patients financing medical treatment should clearly understand loan
        costs, repayment obligations, fees and lender information before
        accepting any loan offer.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Related Resources
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        <li><Link href="/medical-loan">Medical Loan</Link></li>
        <li><Link href="/ivf-loan">IVF Loan</Link></li>
        <li><Link href="/dental-loan">Dental Loan</Link></li>
        <li><Link href="/resources">Knowledge Hub</Link></li>
      </ul>
    </main>
  );
}
