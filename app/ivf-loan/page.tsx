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
  title: "IVF Loan in India | Fertility Treatment Financing | Trustiva Setu",
  description: "Affordable IVF and fertility treatment financing across India.",
  alternates: {
    canonical: "https://trustivasetu.com/ivf-loan",
  },
  openGraph: {
    title: "IVF Loan in India | Trustiva Setu",
    description: "Finance your fertility journey with trusted healthcare lenders.",
    url: "https://trustivasetu.com/ivf-loan",
    type: "website",
  },
};

export default function IvfPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="ivf" />
      <BreadcrumbSchema title="IVF Loan in India | Fertility Treatment Financing | Trustiva Setu" slug="ivf-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <ServiceSchema page="ivf" />
      <Hero page="ivf" />
      <Treatments page="ivf" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="ivf" />
      <FAQ page="ivf" />
    </main>
  );
}
