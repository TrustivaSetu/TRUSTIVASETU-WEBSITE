import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "About Us — Trustiva Setu",
  description:
    "Trustiva Setu is the healthcare financing infrastructure division of Aarthsetu Technologies Private Limited, connecting clinics, lenders and patients through India's fastest No Cost EMI platform.",
  alternates: {
    canonical: "https://www.trustivasetu.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <WebSiteSchema />
      <BreadcrumbSchema title="About Us — Trustiva Setu" slug="about" />
      <Navbar />

      <div className="pt-6 sm:pt-8">
        {/* ABOUT */}

        <section
          id="about"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-14 scroll-mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About Trustiva Setu
          </h2>

          <p className="text-gray-300 text-lg leading-8">
            Trustiva is the healthcare financing infrastructure division of
Aarthsetu Technologies Private Limited.

We are building the backbone that powers affordable healthcare access
by enabling financial institutions, hospitals, healthcare providers
and digital partners to work together through one unified financing ecosystem.

Our mission is simple:

"No patient should delay treatment because of financial barriers."

We don't just provide loans—we create the infrastructure layer
that powers healthcare affordability at scale.
          </p>

          <div className="mt-12 rounded-3xl border border-lime-300/20 bg-white/5 p-6 sm:p-8 max-w-3xl">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Our Team
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Meet the People Behind Trustiva Setu
            </h3>
            <p className="text-gray-300 text-base leading-7 mb-6">
              Trustiva Setu is built by a team spanning lending, healthcare and
              technology — working to connect patients, clinics and lending
              partners into one financing infrastructure.
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-[#07111f] transition hover:bg-lime-200"
            >
              Meet the Team <span aria-hidden="true">→</span>
            </Link>
          </div>
          </section>
      </div>

      <Footer />
    </div>
  );
}
