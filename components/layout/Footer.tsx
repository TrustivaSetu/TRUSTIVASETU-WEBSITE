import TrackedLink from "@/components/analytics/TrackedLink";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-12 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* RBI / Loan Facilitation Disclaimer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10 text-xs text-gray-400 leading-6">
          <p className="font-semibold text-gray-300 mb-2">Important Disclaimer</p>
          <p>
            Trustiva Setu is a loan facilitation platform operated by Aarthsetu Technologies Private Limited.
            We are not a bank or Non-Banking Financial Company (NBFC). Loans are provided by our partner banks and NBFCs.
            Interest rates, processing fees and loan terms are determined solely by partner lenders and are subject to their policies.
            Loan approval is at the sole discretion of the lender. Zero interest (No Cost EMI) is subject to a subvention arrangement
            with partner clinics/hospitals — terms and conditions apply. EMI amounts shown on this website are indicative only;
            actual amounts may vary based on lender terms, applicable taxes and processing fees.
            Past performance does not guarantee future approval rates. All timelines (approval, disbursal) are indicative and
            subject to bank working hours, public holidays, weekends and festivals.
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-white mb-3">
              Aarthsetu Technologies Private Limited
            </h3>
            <p className="text-sm text-gray-400 leading-6 mb-3">
              Trustiva Setu Division — Building Healthcare Financing Infrastructure for India.
            </p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>CIN: U66190UP2026PTC247393</p>
              <p>Registered Office: Moradabad, Uttar Pradesh, India</p>
              <p>GSTIN: 09ABFCA5854R1ZU</p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-white mb-3">Connect With Us</p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/aarthsetu-technologies-private-limited-trustivasetu-30ba34426"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trustiva Setu on LinkedIn"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path
                      fill="#0A66C2"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46Z"
                    />
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/trustivasetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trustiva Setu on Instagram"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFDC80" />
                        <stop offset="25%" stopColor="#FCAF45" />
                        <stop offset="50%" stopColor="#F77737" />
                        <stop offset="75%" stopColor="#E1306C" />
                        <stop offset="100%" stopColor="#833AB4" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#instagram-gradient)"
                      d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm-.2 1.9A3.65 3.65 0 0 0 3.9 7.55v8.9a3.65 3.65 0 0 0 3.65 3.65h8.9a3.65 3.65 0 0 0 3.65-3.65v-8.9a3.65 3.65 0 0 0-3.65-3.65h-8.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.2-2.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                    />
                  </svg>
                  Instagram
                </a>

                <a
                  href="https://www.youtube.com/@AarthsetuCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aarthsetu Technologies on YouTube"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path
                      fill="#FF0000"
                      d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.75V8.25L16 12l-6.4 3.75Z"
                    />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <div className="space-y-2 text-sm">
              <a href="/about" className="block text-gray-400 hover:text-lime-300 transition-colors">About Us</a>
              <a href="/for-clinics" className="block text-gray-400 hover:text-lime-300 transition-colors">For Clinics</a>
              <a href="/for-patients" className="block text-gray-400 hover:text-lime-300 transition-colors">For Patients</a>
              <a href="/join-us" className="block text-gray-400 hover:text-lime-300 transition-colors">Careers</a>
            </div>
          </div>

          {/* Legal Links + Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="/privacy-policy" className="block text-gray-400 hover:text-lime-300 transition-colors">Privacy Policy</a>
              <a href="/terms" className="block text-gray-400 hover:text-lime-300 transition-colors">Terms &amp; Conditions</a>
              <a href="/disclaimer" className="block text-gray-400 hover:text-lime-300 transition-colors">Disclaimer</a>
              <a href="/refund-cancellation-policy" className="block text-gray-400 hover:text-lime-300 transition-colors">Refund &amp; Cancellation Policy</a>
            </div>
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>📧 <TrackedLink
                href="mailto:info@trustivasetu.com"
                event="email_click_info_footer"
                className="hover:text-lime-300"
              >
                info@trustivasetu.com
              </TrackedLink></p>
              <p>📧 <TrackedLink
                href="mailto:admin@trustivasetu.com"
                event="email_click_admin_footer"
                className="hover:text-lime-300"
              >
                admin@trustivasetu.com
              </TrackedLink></p>
              <p>📧 <TrackedLink
                href="mailto:legal@trustivasetu.com"
                event="email_click_legal_footer"
                className="hover:text-lime-300"
              >
                legal@trustivasetu.com
              </TrackedLink></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Aarthsetu Technologies Private Limited. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            <a href="/privacy-policy" className="hover:text-lime-300 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-lime-300 transition-colors">Terms &amp; Conditions</a>
            <span>·</span>
            <a href="/disclaimer" className="hover:text-lime-300 transition-colors">Disclaimer</a>
            <span>·</span>
            <a href="/refund-cancellation-policy" className="hover:text-lime-300 transition-colors">Refund &amp; Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
