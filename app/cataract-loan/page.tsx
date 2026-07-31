import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Cataract Surgery Loan in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a cataract surgery loan with flexible EMI options through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/cataract-loan",
  },
  openGraph: {
    title: "Cataract Surgery Loan | Trustiva Setu",
    description: "Finance your cataract surgery with trusted healthcare lending partners.",
    url: "https://trustivasetu.com/cataract-loan",
    type: "website",
  },
};

export default function CataractPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="cataract" />
      <Treatments page="cataract" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="cataract" />
    </main>
  );
}
