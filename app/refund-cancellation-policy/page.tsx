import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | TrustivaSetu",
  description: "Refund & Cancellation Policy for TrustivaSetu's healthcare financing facilitation platform.",
  alternates: {
    canonical: "https://www.trustivasetu.com/refund-cancellation-policy",
  },
};

const LAST_UPDATED = "August 24, 2026";
const BRAND = "TrustivaSetu";
const EMAIL = "info@trustivasetu.com";

export default function RefundCancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-lime-300 text-sm hover:underline mb-6 inline-block">← Back to Home</a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Refund & Cancellation Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-gray-400 text-sm mt-1">
            For queries: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Overview</h2>
            <p>
              {BRAND} facilitates healthcare financing by connecting patients and healthcare providers
              with lending partners for elective and wellness treatments. This Refund & Cancellation Policy
              explains how cancellations and refunds are handled for loans facilitated through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Cancellation Before Loan Disbursement</h2>
            <p>
              You may cancel your loan application at any time before disbursement, free of charge.
              No cancellation fee applies, and no amount is payable to {BRAND} for cancellations made
              prior to disbursement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cancellation After Disbursement</h2>
            <p>
              If a treatment is cancelled after the loan has been disbursed, the refund is processed by the
              healthcare provider back into the relevant loan or settlement account. {BRAND} coordinates
              with the lending partner to ensure the refunded amount is correctly applied against your
              outstanding loan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Refund Timelines</h2>
            <p>
              Refunds are typically processed within <strong>2–7 working days</strong> of receiving a valid
              refund request along with the required documents, which include:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>Revised treatment estimate</li>
              <li>Final bill from the healthcare provider</li>
              <li>Cancellation confirmation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Right to Withhold or Delay</h2>
            <p>{BRAND} reserves the right to withhold or delay a refund in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>Incomplete or inconsistent documentation</li>
              <li>Suspected fraud or misrepresentation</li>
              <li>Pending clarification from the patient, provider, or lending partner</li>
              <li>As required under applicable regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Role of the Healthcare Provider</h2>
            <p>
              The healthcare provider is solely responsible for the delivery and quality of treatment,
              and for refunding the cost of treatment where applicable. {BRAND} only facilitates the
              coordination of financing between patients, providers, and lending partners, and is not
              responsible for treatment outcomes or provider-issued refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. How to Request a Refund or Cancellation</h2>
            <p>
              Refund or cancellation requests can be raised through your healthcare provider, or by
              emailing us at <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>{" "}
              with your transaction details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Refund & Cancellation Policy from time to time. The latest version will
              always be available on this page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
