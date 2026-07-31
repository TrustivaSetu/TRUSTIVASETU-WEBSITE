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
  title: "Spine Surgery in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a spine surgery through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/spine-surgery-loan",
  },
  openGraph: {
    title: "Spine Surgery | Trustiva Setu",
    description: "Healthcare financing for spine surgery.",
    url: "https://trustivasetu.com/spine-surgery-loan",
    type: "website",
  },
};

export default function SpineSurgeryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="spine-surgery" />
      <BreadcrumbSchema title="Spine Surgery in India | Healthcare Financing | Trustiva Setu" slug="spine-surgery-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FinancialServiceSchema />
      <Hero page="spine-surgery" />
      <Treatments page="spine-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="spine-surgery" />
      <FAQ page="spine-surgery" />
    </main>
  );
}
