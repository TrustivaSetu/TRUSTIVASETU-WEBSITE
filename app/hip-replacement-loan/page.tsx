import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Hip Replacement Surgery in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a hip replacement surgery through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/hip-replacement-loan",
  },
  openGraph: {
    title: "Hip Replacement Surgery | Trustiva Setu",
    description: "Healthcare financing for hip replacement surgery.",
    url: "https://trustivasetu.com/hip-replacement-loan",
    type: "website",
  },
};

export default function HipReplacementPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="hip-replacement" />
      <Treatments page="hip-replacement" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="hip-replacement" />
    </main>
  );
}
