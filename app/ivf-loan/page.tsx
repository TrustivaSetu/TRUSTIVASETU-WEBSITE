import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Treatments from "@/components/landing/Treatments";
import WhyTrustiva from "@/components/landing/WhyTrustiva";
import HowItWorks from "@/components/landing/HowItWorks";
import Eligibility from "@/components/landing/Eligibility";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "IVF Loan in India | Fertility Treatment Finance | Trustiva Setu",
  description:
    "Apply for an IVF loan with Trustiva Setu. Get instant healthcare financing for fertility treatments through our lending partners across India.",
  alternates: {
    canonical: "https://www.trustivasetu.com/ivf-loan",
  },
  openGraph: {
    title: "IVF Loan in India | Trustiva Setu",
    description:
      "Affordable financing for IVF and fertility treatments across India.",
    url: "https://www.trustivasetu.com/ivf-loan",
    type: "website",
  },
};

export default function IVFLoanPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
            <Hero page="ivf" />
      <Treatments page="ivf" />
      <WhyTrustiva />
      <HowItWorks />
      <Eligibility />
      <FAQ page="ivf" />
    </main>
  );
}
