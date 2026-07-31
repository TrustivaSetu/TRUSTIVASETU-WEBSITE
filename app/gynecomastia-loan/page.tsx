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
import FinancialServiceSchema from "@/components/seo/FinancialServiceSchema";

export const metadata: Metadata = {
  title: "Gynecomastia Surgery in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a gynecomastia surgery through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/gynecomastia-loan",
  },
  openGraph: {
    title: "Gynecomastia Surgery | Trustiva Setu",
    description: "Healthcare financing for gynecomastia surgery.",
    url: "https://trustivasetu.com/gynecomastia-loan",
    type: "website",
  },
};

export default function GynecomastiaPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="gynecomastia" />
      <BreadcrumbSchema title="Gynecomastia Surgery in India | Healthcare Financing | Trustiva Setu" slug="gynecomastia-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <Hero page="gynecomastia" />
      <Treatments page="gynecomastia" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="gynecomastia" />
      <FAQ page="gynecomastia" />
    </main>
  );
}
