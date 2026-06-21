import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Trustiva Setu",
  description: "Terms and Conditions for using the Trustiva Setu healthcare loan facilitation platform.",
};

const LAST_UPDATED = "June 1, 2026";
const COMPANY = "Aarthsetu Technologies Private Limited";
const BRAND = "Trustiva Setu";
const EMAIL = "legal@trustivasetu.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <div className="mb-12">
          <a href="/" className="text-lime-300 text-sm hover:underline mb-6 inline-block">← Back to Home</a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-gray-400 text-sm mt-1">
            For queries: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>
          </p>
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-yellow-300 text-sm">
            
          </div>
        </div>

        <div className="space-y-8 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the {BRAND} platform at <strong>www.trustivasetu.com</strong>,
              you agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;).
              If you do not agree to these Terms, please do not use our platform.
              These Terms form a legally binding agreement between you and {COMPANY}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. About the Platform</h2>
            <p>
              {BRAND} is a <strong>loan facilitation platform</strong> operated by {COMPANY}.
              We connect patients with partner banks and NBFCs to facilitate healthcare financing.
              <strong> We are not a bank, NBFC, or lending institution.</strong> We do not provide loans directly.
              All loan products are provided by our partner financial institutions, subject to their terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Eligibility</h2>
            <p>To use our platform, you must:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Be a resident of India</li>
              <li>Have a valid Indian mobile number and email address</li>
              <li>Provide accurate, complete, and truthful information</li>
              <li>Not be prohibited from using financial services under applicable Indian law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Loan Facilitation Terms</h2>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>
                Submitting an enquiry on this platform does <strong>not</strong> guarantee loan approval.
                Approval is at the sole discretion of the partner lender.
              </li>
              <li>
                Interest rates, processing fees, loan tenure, and terms are determined by partner lenders
                and may vary. All rates communicated are indicative only.
              </li>
              <li>
                The &quot;No Cost EMI&quot; or &quot;0% interest&quot; offering is subject to a subvention
                arrangement between Trustiva Setu, partner clinics, and lenders. Terms and conditions apply
                and may change without prior notice.
              </li>
              <li>
                Disbursal timelines (same day or within 24 hours) are indicative and subject to bank working
                hours, document verification, and lender processing. They exclude public holidays, weekends,
                and festivals.
              </li>
              <li>
                You are responsible for repaying the loan directly to the lender as per agreed EMI schedule.
                {BRAND} is not responsible for loan recovery, defaults, or repayment disputes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>Provide accurate and complete information in all forms</li>
              <li>Not submit false, misleading, or fraudulent information</li>
              <li>Not use the platform for any unlawful purpose</li>
              <li>Not attempt to hack, reverse-engineer, or disrupt the platform</li>
              <li>Keep your contact information up to date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content on this platform, including but not limited to text, graphics, logos, and software,
              is the property of {COMPANY} or its licensors and is protected by applicable intellectual property laws.
              You may not copy, reproduce, or distribute any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Disclaimers</h2>
            <p>
              The platform is provided &quot;as is&quot; without warranties of any kind. We do not warrant:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>That the platform will be error-free or uninterrupted</li>
              <li>That loan applications will be approved</li>
              <li>The accuracy of EMI calculations shown (indicative only)</li>
              <li>Third-party website content linked from our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable Indian law, {COMPANY} shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from your use of
              or inability to use the platform, or from any loan decisions made by partner lenders.
              Our total liability for any claim shall not exceed <span className="text-yellow-300">
              [₹10,000]</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {COMPANY}, its directors, officers, and employees from
              any claims, damages, or expenses arising from your violation of these Terms or misuse of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Privacy</h2>
            <p>
              Your use of the platform is also governed by our{" "}
              <a href="/privacy-policy" className="text-lime-300 hover:underline">Privacy Policy</a>,
              which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page
              with a revised &quot;Last updated&quot; date. Continued use of the platform after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">12. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of courts in{" "}
              <span className="text-yellow-300">[ACTION REQUIRED: Specify city, e.g., Moradabad]</span>,
              India. We encourage resolution of disputes through mutual discussion before litigation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">13. Contact</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm space-y-1">
              <p className="font-semibold text-white">{COMPANY}</p>
              <p>Registered Office: Moradabad, Uttar Pradesh, India</p>
              <p>CIN: U66190UP2026PTC247393</p>
              <p>Email: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
