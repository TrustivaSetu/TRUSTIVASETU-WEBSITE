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
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  <span aria-hidden="true">in</span>
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/trustivasetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trustiva Setu on Instagram"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-300"
                >
                  <span aria-hidden="true">◎</span>
                  Instagram
                </a>

                <a
                  href="https://www.youtube.com/@AarthsetuCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aarthsetu Technologies on YouTube"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                >
                  <span aria-hidden="true">▶</span>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
