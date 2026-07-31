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
import WebSiteSchema from "@/components/seo/WebSiteSchema";

export const metadata: Metadata = {
  title: "Fertility Preservation in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a fertility preservation through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/fertility-preservation-loan",
  },
  openGraph: {
    title: "Fertility Preservation | Trustiva Setu",
    description: "Healthcare financing for fertility preservation.",
    url: "https://trustivasetu.com/fertility-preservation-loan",
    type: "website",
  },
};

export default function FertilityPreservationPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="fertility-preservation" />
      <BreadcrumbSchema title="Fertility Preservation in India | Healthcare Financing | Trustiva Setu" slug="fertility-preservation-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero page="fertility-preservation" />
      <Treatments page="fertility-preservation" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="fertility-preservation" />
      <FAQ page="fertility-preservation" />
    </main>
  );
}
