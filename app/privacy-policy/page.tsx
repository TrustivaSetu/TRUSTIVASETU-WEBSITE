import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Trustiva Setu",
  description: "Privacy Policy for Trustiva Setu by Aarthsetu Technologies Private Limited. DPDP Act 2023 compliant.",
};

const LAST_UPDATED = "June 1, 2026";
const COMPANY = "Aarthsetu Technologies Private Limited";
const BRAND = "Trustiva Setu";
const EMAIL = "legal@trustivasetu.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-lime-300 text-sm hover:underline mb-6 inline-block">← Back to Home</a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-gray-400 text-sm mt-1">
            For queries: <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>
          </p>
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-yellow-300 text-sm">
            <p className="font-bold"></p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              {COMPANY} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating the {BRAND} platform,
              is committed to protecting your personal information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website
              at <strong>www.trustivasetu.com</strong> and use our loan facilitation services.
            </p>
            <p className="mt-3">
              This Policy is compliant with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India
              and applicable RBI guidelines on data privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li><strong>Identity Information:</strong> Full name, date of birth, gender</li>
              <li><strong>Contact Information:</strong> Email address, phone number, city/region</li>
              <li><strong>Financial Information:</strong> Loan amount requested, treatment type, approximate budget</li>
              <li><strong>Employment/Business Information:</strong> Clinic name, specialty, designation (for clinic partners)</li>
              <li><strong>Documents:</strong> Resume/CV (for job applications only)</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Device Data:</strong> Device type, operating system, unique device identifiers</li>
            </ul>
            <p className="mt-3 text-yellow-300 text-sm">
              
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>Facilitate loan applications and connect you with partner lenders</li>
              <li>Process clinic and hospital partnership enquiries</li>
              <li>Send you communications about your enquiry or application</li>
              <li>Improve our platform, products, and services</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Prevent fraud and ensure security</li>
              <li>Analyse usage patterns to enhance user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Sharing of Information</h2>
            <p>
              We may share your information with the following categories of third parties:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li>
                <strong>Partner Lenders (Banks & NBFCs):</strong> To facilitate loan applications. These entities
                are bound by their own privacy policies and applicable RBI guidelines.
              </li>
              <li>
                <strong>Partner Clinics/Hospitals:</strong> To coordinate patient financing at the point of care.
              </li>
              <li>
                <strong>Service Providers:</strong> Technology partners (including Supabase for data storage,
                email service providers) who process data on our behalf under confidentiality agreements.
              </li>
              <li>
                <strong>Regulatory/Legal Authorities:</strong> When required by law, court order, or regulatory directive.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal data to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to fulfil the purposes described in this Policy,
              or as required by applicable law. Loan application data is retained for{" "}
              <span className="text-yellow-300">8 years as per PMLA 2002</span>.
              You may request deletion of your data subject to legal and regulatory retention obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights (DPDP Act 2023)</h2>
            <p>Under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
              <li><strong>Access:</strong> Obtain a summary of personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data (subject to legal obligations)</li>
              <li><strong>Grievance Redressal:</strong> File a complaint with our Data Protection Officer</li>
              <li><strong>Nomination:</strong> Nominate another individual to exercise these rights in the event of death or incapacity</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, contact us at:{" "}
              <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Data Protection Officer: <span className="text-yellow-300">Abhishek Kashyap
Designation: Founder & CEO, Aarthsetu Technologies Pvt Ltd
Email: legal@trustivasetu.com
Phone: +91 82184 73534
Response Time: Within 30 days</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience.
              You can control cookie preferences through our cookie consent banner.
              Declining cookies may affect some features of the website.
              For more information, see our Cookie Policy{" "}
              
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against
              unauthorised access, alteration, disclosure, or destruction. However, no method of transmission
              over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of those sites. We encourage you to read their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect
              personal data from minors. If you believe we have collected data from a minor, please contact us
              immediately at <a href={`mailto:${EMAIL}`} className="text-lime-300 hover:underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by
              updating the &quot;Last updated&quot; date at the top of this page. Continued use of our platform
              constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">12. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000,
              the Digital Personal Data Protection Act, 2023, and applicable RBI guidelines.
              Any disputes shall be subject to the exclusive jurisdiction of courts in{" "}
              <span className="text-yellow-300">Moradabad, Uttar Pradesh</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">13. Contact Us</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm space-y-1">
              <p className="font-semibold text-white">{COMPANY}</p>
              <p>Trustiva Setu Division</p>
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
