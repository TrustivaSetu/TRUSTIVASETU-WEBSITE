import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Liposuction in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a liposuction through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/liposuction-loan",
  },
  openGraph: {
    title: "Liposuction | Trustiva Setu",
    description: "Healthcare financing for liposuction.",
    url: "https://trustivasetu.com/liposuction-loan",
    type: "website",
  },
};

export default function LiposuctionPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="liposuction" />
      <Treatments page="liposuction" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="liposuction" />
    </main>
  );
}
