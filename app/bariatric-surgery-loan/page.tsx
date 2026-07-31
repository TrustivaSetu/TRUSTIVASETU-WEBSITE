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
  title: "Bariatric Surgery Loan in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a bariatric surgery loan through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/bariatric-surgery-loan",
  },
  openGraph: {
    title: "Bariatric Surgery Loan | Trustiva Setu",
    description: "Healthcare financing for bariatric surgery loan.",
    url: "https://trustivasetu.com/bariatric-surgery-loan",
    type: "website",
  },
};

export default function BariatricSurgeryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="bariatric-surgery" />
      <BreadcrumbSchema title="Bariatric Surgery Loan in India | Healthcare Financing | Trustiva Setu" slug="bariatric-surgery-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero page="bariatric-surgery" />
      <Treatments page="bariatric-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="bariatric-surgery" />
      <FAQ page="bariatric-surgery" />
    </main>
  );
}
