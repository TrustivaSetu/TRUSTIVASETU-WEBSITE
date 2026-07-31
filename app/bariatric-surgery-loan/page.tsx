import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

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
      <Hero page="bariatric-surgery" />
      <Treatments page="bariatric-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="bariatric-surgery" />
    </main>
  );
}
