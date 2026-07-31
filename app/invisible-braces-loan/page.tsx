import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "Invisible Braces in India | Healthcare Financing | Trustiva Setu",
  description: "Apply for a invisible braces through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
  alternates: {
    canonical: "https://trustivasetu.com/invisible-braces-loan",
  },
  openGraph: {
    title: "Invisible Braces | Trustiva Setu",
    description: "Healthcare financing for invisible braces.",
    url: "https://trustivasetu.com/invisible-braces-loan",
    type: "website",
  },
};

export default function InvisibleBracesPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero page="invisible-braces" />
      <Treatments page="invisible-braces" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="invisible-braces" />
    </main>
  );
}
