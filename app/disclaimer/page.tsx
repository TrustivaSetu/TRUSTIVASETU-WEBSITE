import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Trustiva Setu",
  description: "Legal disclaimer for Trustiva Setu loan facilitation platform. Not a bank or NBFC.",
};

const LAST_UPDATED = "June 1, 2026";
const COMPANY = "Aarthsetu Technologies Private Limited";
const EMAIL = "legal@trustivasetu.com";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <div className="mb-12">
          <a href="/" className="text-lime-300 text-sm hover:underline mb-6 inline-block">← Back to Home</a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Disclaimer</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-gray-400 text-sm mt-1">
            For queries: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>
          </p>
        </div>

        <div className="space-y-6 text-gray-300 leading-8">

          {[
            {
              title: "Not a Bank or NBFC",
              content: `Trustiva Setu is a loan facilitation platform operated by ${COMPANY}.
                We are NOT a bank, Non-Banking Financial Company (NBFC), or lending institution.
                We are NOT registered with the Reserve Bank of India (RBI) as a lender.
                We facilitate connections between borrowers and RBI-regulated partner lenders.`,
            },
            {
              title: "Loans by Partner Lenders",
              content: `All loans facilitated through the Trustiva Setu platform are provided by our partner
                banks and NBFCs. These partner institutions are regulated by the Reserve Bank of India (RBI)
                or other applicable regulatory authorities. Each lender has its own terms, conditions,
                interest rates, and eligibility criteria.`,
            },
            {
              title: "No Guarantee of Approval",
              content: `Submitting an enquiry or application on this platform does NOT guarantee loan approval.
                Loan approval, disbursement, amount, tenure, and terms are entirely at the discretion of the
                partner lender. ${COMPANY} has no control over lender decisions.`,
            },
            {
              title: "No Cost EMI / Zero Interest",
              content: `The "No Cost EMI" or "0% interest" product is offered under a subvention arrangement
                between Trustiva Setu, partner clinics/hospitals, and partner lenders. This means the interest
                component is subsidised by the clinic or hospital, not waived by the lender. This arrangement
                is subject to change and terms and conditions apply. Patients should confirm the exact terms
                with the lender before signing any loan agreement.`,
            },
            {
              title: "Indicative Information Only",
              content: `EMI amounts, processing fees, loan amounts, interest rates, and disbursal timelines
                displayed on this website are indicative only. Actual figures may vary based on lender policies,
                applicant profile, treatment cost, and applicable taxes. Always refer to the official loan
                agreement for binding figures.`,
            },
            {
              title: "Disbursal Timelines",
              content: `Approval and disbursal timelines quoted (such as "8–10 minutes" or "same day") are
                indicative and based on best-case scenarios. Actual timelines may vary based on document
                verification, lender processing capacity, bank working hours, and other factors. These
                timelines exclude public holidays, bank holidays, weekends, and festivals.`,
            },
            {
              title: "No Financial Advice",
              content: `Nothing on this website constitutes financial, legal, or investment advice.
                Users are advised to independently assess their financial situation and consult qualified
                financial advisors before taking a loan. ${COMPANY} is not responsible for any financial
                decisions made based on information provided on this platform.`,
            },
            {
              title: "Data Usage",
              content: `Personal data submitted through enquiry forms on this platform may be shared with
                partner lenders and clinics for the purpose of loan facilitation. Please read our
                Privacy Policy for full details.`,
            },
            {
              title: "Website Content",
              content: `While we strive to keep information accurate and up-to-date, ${COMPANY} makes no
                representations or warranties about the completeness, accuracy, or reliability of any
                content on this website. Content may change without notice.`,
            },
            {
              title: "Limitation of Liability",
              content: `${COMPANY} shall not be held liable for any loss, damage, or inconvenience arising
                from reliance on information provided on this website, loan decisions by partner lenders,
                or any technical interruptions to the platform.`,
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-3">{i + 1}. {item.title}</h2>
              <p>{item.content}</p>
            </div>
          ))}

          <div className="bg-lime-300/10 border border-lime-300/30 rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-3">Contact for Legal Queries</h2>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-white">{COMPANY}</p>
              <p>Registered Office: Moradabad, Uttar Pradesh, India</p>
              <p>CIN: U66190UP2026PTC247393</p>
              <p>Legal Email: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
