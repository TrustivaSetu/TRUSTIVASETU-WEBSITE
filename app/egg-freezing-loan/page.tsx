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
  title: "Egg Freezing in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a egg freezing through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/egg-freezing-loan",
  },
  openGraph: {
    title: "Egg Freezing | Trustiva Setu",
    description: "Healthcare financing for egg freezing.",
    url: "https://trustivasetu.com/egg-freezing-loan",
    type: "website",
  },
};

export default function EggFreezingPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="egg-freezing" />
      <BreadcrumbSchema title="Egg Freezing in India | Healthcare Financing | Trustiva Setu" slug="egg-freezing-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <Hero page="egg-freezing" />
      <Treatments page="egg-freezing" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="egg-freezing" />
      <FAQ page="egg-freezing" />
    </main>
  );
}
