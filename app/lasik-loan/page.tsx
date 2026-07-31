import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";
import RelatedTreatments from "@/components/landing/RelatedTreatments";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

export const metadata: Metadata = {
  title: "LASIK Eye Surgery Loan in India | LASIK EMI & Healthcare Financing | Trustiva Setu",
  description: "Get financing for LASIK eye surgery with flexible EMI options through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/lasik-loan",
  },
  openGraph: {
    title: "LASIK Eye Surgery Loan | Trustiva Setu",
    description: "Finance your LASIK eye surgery with trusted healthcare lending partners.",
    url: "https://trustivasetu.com/lasik-loan",
    type: "website",
  },
};

export default function LasikPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="lasik" />
      <BreadcrumbSchema title="LASIK Eye Surgery Loan in India | LASIK EMI & Healthcare Financing | Trustiva Setu" slug="lasik-loan" />
      <OrganizationSchema />
      <Hero page="lasik" />
      <Treatments page="lasik" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="lasik" />
      <FAQ page="lasik" />
    </main>
  );
}
