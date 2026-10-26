import { LandingPageData } from "@/types/landing";

export const medicalLoanData: LandingPageData = {
  hero: {
    badge: "Healthcare Financing Platform",
    title: "Medical Loans Made",
    highlight: "Simple & Accessible",
    description:
      "Finance planned healthcare expenses including IVF, Dental, Hair Transplant, Cosmetic Surgery and other medical treatments through Trustiva Setu's lending partner network.",
    primaryCta: "Apply for Financing",
    primaryHref: "/",
    secondaryCta: "Partner With Us",
    secondaryHref: "/partners/doctors",
  },

  treatments: [
    {
      title: "IVF & Fertility",
      description: "Finance fertility treatments with flexible repayment options.",
    },
    {
      title: "Dental Treatment",
      description: "Support for implants, aligners, smile makeover and more.",
    },
    {
      title: "Hair Transplant",
      description: "Affordable financing for advanced hair restoration procedures.",
    },
    {
      title: "Cosmetic Surgery",
      description: "Finance elective cosmetic and aesthetic procedures.",
    },
  ],
};
