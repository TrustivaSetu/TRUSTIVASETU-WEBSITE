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
  title: "Dental Loan in India | Dental Treatment Financing | Trustiva Setu",
  description: "Affordable dental treatment financing for implants, braces, aligners and smile makeover procedures.",
  alternates: {
    canonical: "https://trustivasetu.com/dental-loan",
  },
  openGraph: {
    title: "Dental Loan in India | Trustiva Setu",
    description: "Finance your dental treatment through trusted lending partners.",
    url: "https://trustivasetu.com/dental-loan",
    type: "website",
  },
};

export default function DentalPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="dental" />
      <BreadcrumbSchema title="Dental Loan in India | Dental Treatment Financing | Trustiva Setu" slug="dental-loan" />
      <OrganizationSchema />
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
