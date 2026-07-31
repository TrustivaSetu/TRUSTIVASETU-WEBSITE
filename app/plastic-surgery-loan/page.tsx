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
  title: "Plastic Surgery Loan in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a plastic surgery loan through Trustiva Setu's lending partners. Flexible healthcare financing for eligible reconstructive and plastic surgery procedures.",
  alternates: {
    canonical: "https://trustivasetu.com/plastic-surgery-loan",
  },
  openGraph: {
    title: "Plastic Surgery Loan | Trustiva Setu",
    description: "Finance eligible plastic surgery procedures with trusted lending partners.",
    url: "https://trustivasetu.com/plastic-surgery-loan",
    type: "website",
  },
};

export default function PlasticSurgeryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="plastic-surgery" />
      <BreadcrumbSchema title="Plastic Surgery Loan in India | Healthcare Financing | Trustiva Setu" slug="plastic-surgery-loan" />
      <OrganizationSchema />
      <Hero page="plastic-surgery" />
      <Treatments page="plastic-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="plastic-surgery" />
      <FAQ page="plastic-surgery" />
    </main>
  );
}
