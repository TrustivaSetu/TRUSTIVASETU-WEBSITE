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
  title: "Dental Implant in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a dental implant through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/dental-implant-loan",
  },
  openGraph: {
    title: "Dental Implant | Trustiva Setu",
    description: "Healthcare financing for dental implant.",
    url: "https://trustivasetu.com/dental-implant-loan",
    type: "website",
  },
};

export default function DentalImplantPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="dental-implant" />
      <BreadcrumbSchema title="Dental Implant in India | Healthcare Financing | Trustiva Setu" slug="dental-implant-loan" />
      <OrganizationSchema />
      <Hero page="dental-implant" />
      <Treatments page="dental-implant" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="dental-implant" />
      <FAQ page="dental-implant" />
    </main>
  );
}
