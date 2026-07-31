import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Rhinoplasty in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a rhinoplasty through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/rhinoplasty-loan",
  },
  openGraph: {
    title: "Rhinoplasty | Trustiva Setu",
    description: "Healthcare financing for rhinoplasty.",
    url: "https://trustivasetu.com/rhinoplasty-loan",
    type: "website",
  },
};

export default function RhinoplastyPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="rhinoplasty" />
      <Treatments page="rhinoplasty" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="rhinoplasty" />
    </main>
  );
}
