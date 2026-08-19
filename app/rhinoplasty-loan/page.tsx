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
import ServiceSchema from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Rhinoplasty Loan in India | Healthcare Financing | Trustiva Setu",
  description:
    "Explore rhinoplasty loan and healthcare financing options in India through Trustiva Setu's lending partners. Approval and final terms depend on lender eligibility.",
  alternates: {
    canonical: "https://www.trustivasetu.com/rhinoplasty-loan",
  },
  openGraph: {
    title: "Rhinoplasty Loan in India | Trustiva Setu",
    description:
      "Explore healthcare financing options for eligible rhinoplasty procedures through Trustiva Setu's lending partners.",
    url: "https://www.trustivasetu.com/rhinoplasty-loan",
    type: "website",
  },
};

export default function RhinoplastyPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="rhinoplasty" />
      <BreadcrumbSchema title="Rhinoplasty in India | Healthcare Financing | Trustiva Setu" slug="rhinoplasty-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <ServiceSchema page="rhinoplasty" />
      <Hero page="rhinoplasty" />
      <Treatments page="rhinoplasty" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="rhinoplasty" />
      <FAQ page="rhinoplasty" />
    </main>
  );
}
