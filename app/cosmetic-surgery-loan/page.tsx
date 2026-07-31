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
  title: "Cosmetic Surgery Loan in India | Aesthetic Procedure Financing | Trustiva Setu",
  description: "Apply for a cosmetic surgery loan through Trustiva Setu's lending partners. Finance aesthetic procedures with flexible EMI options, subject to lender approval.",
  alternates: {
    canonical: "https://trustivasetu.com/cosmetic-surgery-loan",
  },
  openGraph: {
    title: "Cosmetic Surgery Loan | Trustiva Setu",
    description: "Healthcare financing for cosmetic and aesthetic procedures.",
    url: "https://trustivasetu.com/cosmetic-surgery-loan",
    type: "website",
  },
};

export default function CosmeticSurgeryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="cosmetic-surgery" />
      <BreadcrumbSchema title="Cosmetic Surgery Loan in India | Aesthetic Procedure Financing | Trustiva Setu" slug="cosmetic-surgery-loan" />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero page="cosmetic-surgery" />
      <Treatments page="cosmetic-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="cosmetic-surgery" />
      <FAQ page="cosmetic-surgery" />
    </main>
  );
}
