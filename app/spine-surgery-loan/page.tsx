import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Spine Surgery in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a spine surgery through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/spine-surgery-loan",
  },
  openGraph: {
    title: "Spine Surgery | Trustiva Setu",
    description: "Healthcare financing for spine surgery.",
    url: "https://trustivasetu.com/spine-surgery-loan",
    type: "website",
  },
};

export default function SpineSurgeryPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="spine-surgery" />
      <Treatments page="spine-surgery" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="spine-surgery" />
    </main>
  );
}
