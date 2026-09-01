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
          </section>
      </div>

      <Footer />
    </div>
  );
}
