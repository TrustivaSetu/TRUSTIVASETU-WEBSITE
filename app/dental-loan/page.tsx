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
  title: "Dental Loan in India | Dental Treatment Financing | Trustiva Setu",
  description: "Dental loan and treatment financing in India for eligible procedures including dental implants, braces, aligners, root canal treatment, crowns, bridges and smile makeover procedures through trusted lending partners.",
  alternates: {
    canonical: "https://www.trustivasetu.com/dental-loan",
  },
  openGraph: {
    title: "Dental Loan in India | Trustiva Setu",
    description: "Get financing for dental treatment in India through trusted lending partners, including dental implants, braces, aligners, root canal treatment and other eligible procedures.",
    url: "https://www.trustivasetu.com/dental-loan",
    type: "website",
  },
};

export default function DentalPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="dental" />
      <BreadcrumbSchema title="Dental Loan in India | Dental Treatment Financing | Trustiva Setu" slug="dental-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <ServiceSchema page="dental" />
      <Hero page="dental" />
      <Treatments page="dental" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="dental" />
      <FAQ page="dental" />
    </main>
  );
}
