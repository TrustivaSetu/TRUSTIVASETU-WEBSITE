import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Knee Replacement Surgery in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a knee replacement surgery through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/knee-replacement-loan",
  },
  openGraph: {
    title: "Knee Replacement Surgery | Trustiva Setu",
    description: "Healthcare financing for knee replacement surgery.",
    url: "https://trustivasetu.com/knee-replacement-loan",
    type: "website",
  },
};

export default function KneeReplacementPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="knee-replacement" />
      <Treatments page="knee-replacement" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="knee-replacement" />
    </main>
  );
}
