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
  title: "Hair Transplant Loan in India | Easy EMI | Trustiva Setu",
  description: "Get a hair transplant loan with easy EMIs through Trustiva Setu. Fast approval, flexible repayment and trusted healthcare financing.",
  alternates: {
    canonical: "https://trustivasetu.com/hair-transplant-loan",
  },
  openGraph: {
    title: "Hair Transplant Loan | Trustiva Setu",
    description: "Finance your hair transplant with affordable monthly EMIs.",
    url: "https://trustivasetu.com/hair-transplant-loan",
    type: "website",
  },
};

export default function HairTransplantPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="hair-transplant" />
      <BreadcrumbSchema title="Hair Transplant Loan in India | Easy EMI | Trustiva Setu" slug="hair-transplant-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero page="hair-transplant" />
      <Treatments page="hair-transplant" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="hair-transplant" />
      <FAQ page="hair-transplant" />
    </main>
  );
}
