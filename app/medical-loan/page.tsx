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
  title: "Medical Loan in India | Instant Healthcare Financing | Trustiva Setu",
  description: "Apply for medical loans in India for surgeries, IVF, dental treatment, hair transplant and other healthcare expenses with Trustiva Setu.",
  alternates: {
    canonical: "https://trustivasetu.com/medical-loan",
  },
  openGraph: {
    title: "Medical Loan in India | Trustiva Setu",
    description: "Instant healthcare financing for planned medical treatments across India.",
    url: "https://trustivasetu.com/medical-loan",
    type: "website",
  },
};

export default function MedicalPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <FaqSchema page="medical" />
      <BreadcrumbSchema title="Medical Loan in India | Instant Healthcare Financing | Trustiva Setu" slug="medical-loan" />
      <OrganizationSchema />
      <Hero page="medical" />
      <Treatments page="medical" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <RelatedTreatments page="medical" />
      <FAQ page="medical" />
    </main>
  );
}
