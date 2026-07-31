import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Fertility Preservation in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a fertility preservation through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/fertility-preservation-loan",
  },
  openGraph: {
    title: "Fertility Preservation | Trustiva Setu",
    description: "Healthcare financing for fertility preservation.",
    url: "https://trustivasetu.com/fertility-preservation-loan",
    type: "website",
  },
};

export default function FertilityPreservationPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="fertility-preservation" />
      <Treatments page="fertility-preservation" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="fertility-preservation" />
    </main>
  );
}
