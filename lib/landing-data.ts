export type LandingContent = {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  treatments: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const landingData = {
  medical: {
    title: "Medical Loan in India",
    description:
      "Instant healthcare financing for planned medical treatments across India.",
    heroTitle: "Medical Loans Made Simple",
    heroSubtitle:
      "Access healthcare financing through our trusted lending partners.",
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
      {
        title: "Eye Surgery",
        description: "Funding support for LASIK, cataract and vision correction.",
      },
      {
        title: "Orthopedic Surgery",
        description: "Medical financing for bone and joint procedures.",
      },
      {
        title: "General Surgery",
        description: "Support for planned surgical treatments across specialties.",
      },
      {
        title: "Other Treatments",
        description: "Healthcare financing for many other planned medical expenses.",
      },
    ],
    faqs: [
      {
        question: "What is a medical loan?",
        answer: "A medical loan helps finance eligible healthcare expenses. Loan approval, amount and repayment terms are decided by the lending partner.",
      },
      {
        question: "Who can apply for a medical loan?",
        answer: "Eligible salaried and self-employed applicants can apply, subject to the lending partner's credit assessment.",
      },
      {
        question: "What documents are required?",
        answer: "PAN, Aadhaar, address proof, income proof and other KYC documents may be required depending on the lender.",
      },
      {
        question: "How long does approval take?",
        answer: "Approval timelines depend on document verification and the lending partner's internal assessment process.",
      },
    ],
  },

  ivf: {
    title: "IVF Loan in India",
    description:
      "Affordable IVF and fertility treatment financing across India.",
    heroTitle: "IVF Treatment Financing",
    heroSubtitle:
      "Finance your fertility journey with trusted healthcare lenders.",
    treatments: [
      {
        title: "IVF Treatment",
        description: "Financing for complete IVF treatment cycles.",
      },
      {
        title: "IUI Treatment",
        description: "Affordable finance for IUI procedures.",
      },
      {
        title: "Egg Freezing",
        description: "Finance fertility preservation and egg freezing.",
      },
      {
        title: "Embryo Transfer",
        description: "Support for embryo transfer related expenses.",
      },
      {
        title: "Donor IVF",
        description: "Funding options for donor IVF programs.",
      },
      {
        title: "Fertility Preservation",
        description: "Healthcare finance for long-term fertility planning.",
      },
      {
        title: "ICSI Treatment",
        description: "Finance advanced fertility procedures like ICSI.",
      },
      {
        title: "Other Fertility Care",
        description: "Flexible financing for additional fertility treatments.",
      },
    ],

    faqs: [
      {
        question: "Can I apply for an IVF loan?",
        answer: "Eligible applicants can apply for financing for IVF and other fertility treatments through participating lending partners.",
      },
      {
        question: "Does the loan cover the full IVF treatment?",
        answer: "Coverage depends on the approved loan amount and the lending partner's policies.",
      },
      {
        question: "What documents are required?",
        answer: "PAN, Aadhaar, address proof, income proof and standard KYC documents may be required.",
      },
      {
        question: "How quickly is an IVF loan processed?",
        answer: "Processing time depends on document verification and the lending partner's assessment.",
      },
    ],

  },

  dental: {
    title: "Dental Loan in India",
    description:
      "Affordable dental treatment financing for implants, braces, aligners and smile makeover procedures.",
    heroTitle: "Dental Treatment Financing",
    heroSubtitle:
      "Finance your dental treatment through trusted lending partners.",
    treatments: [
      {
        title: "Dental Implants",
        description: "Finance single and full-mouth dental implant procedures.",
      },
      {
        title: "Invisible Aligners",
        description: "Affordable financing for clear aligner treatments.",
      },
      {
        title: "Braces",
        description: "Flexible payment options for orthodontic treatment.",
      },
      {
        title: "Root Canal Treatment",
        description: "Finance advanced restorative dental procedures.",
      },
      {
        title: "Smile Makeover",
        description: "Funding support for cosmetic dentistry treatments.",
      },
      {
        title: "Dental Crowns & Bridges",
        description: "Finance restorative dental care with easy repayments.",
      },
      {
        title: "Full Mouth Rehabilitation",
        description: "Funding for comprehensive dental restoration.",
      },
      {
        title: "Other Dental Treatments",
        description: "Finance a wide range of planned dental procedures.",
      },
    ],
    faqs: [
      {
        question: "Can I get a loan for dental treatment?",
        answer: "Eligible applicants can apply for financing for dental procedures through participating lending partners.",
      },
      {
        question: "Which dental treatments are eligible?",
        answer: "Eligibility depends on the treatment and the lending partner's policies.",
      },
      {
        question: "What documents are required?",
        answer: "PAN, Aadhaar, income proof and standard KYC documents may be required.",
      },
      {
        question: "How quickly can my application be processed?",
        answer: "Processing time depends on document verification and lender assessment.",
      },
    ],

  },
} satisfies Record<string, LandingContent>;
