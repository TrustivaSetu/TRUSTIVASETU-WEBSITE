export interface Founder {
  slug: string;
  name: string;
  role: string;
  focus: string;               // one-line description (matches homepage copy style)
  expertise: string[];         // tag list (matches homepage copy style)
  phone: string;                 // e.g. "+918218473534" - used for tel: and wa.me links
  phoneDisplay: string;         // e.g. "82184 73534"
  email: string;
  experience?: string;
}

export const COMPANY = {
  name: "Trustiva Setu",
  website: "https://www.trustivasetu.com",
};

// Add a new team member by adding one object below.
// slug becomes the URL: /founders/<slug>
export const founders: Founder[] = [
  {
    slug: "abhishek",
    name: "Abhishek",
    role: "Founder & Strategic Vision Lead",
    focus:
      "Building India's healthcare financing infrastructure with lender-first execution.",
    expertise: [
      "Healthcare Finance Infrastructure",
      "Strategic Partnerships",
      "NBFC Ecosystem Development",
    ],
    phone: "+918218473534",
    phoneDisplay: "82184 73534",
    email: "abhishek.kashyap@trustivasetu.com",
    experience: "23+ Years experience in Pharma & Fintech",
  },
  {
    slug: "ajit",
    name: "Ajit",
    role: "Co-Founder & Growth Strategy Lead",
    focus:
      "Driving strategic partnerships, conversion systems and lender expansion.",
    expertise: ["Banking + Fintech", "Credit Infrastructure", "Lending Operations"],
    // TODO: confirm phone + email
    phone: "+91XXXXXXXXXX",
    phoneDisplay: "XXXXX XXXXX",
    email: "ajit@trustivasetu.com",
  },
  {
    slug: "manish",
    name: "Manish",
    role: "Strategic Advisor",
    focus:
      "Bringing deep banking, NBFC and financial infrastructure expertise to strengthen Trustiva's lender ecosystem and strategic growth.",
    expertise: [
      "ICICI Bank",
      "TATA Capital",
      "NBFC Strategy",
      "Lending Infrastructure",
      "Financial Advisory",
    ],
    // TODO: confirm phone + email
    phone: "+91XXXXXXXXXX",
    phoneDisplay: "XXXXX XXXXX",
    email: "manish@trustivasetu.com",
  },
  {
    slug: "dharmendra-kumar",
    name: "Dharmendra Kumar",
    role: "Regional Manager North",
    focus: "", // TODO: add a one-line focus statement, matching the style above
    expertise: [],
    phone: "+919758524344",
    phoneDisplay: "97585 24344",
    // TODO: confirm spelling - was typed as "dhramendra.kumar@..." originally
    email: "dharmendra.kumar@trustivasetu.com",
  },
];

export function getFounderBySlug(slug: string): Founder | undefined {
  return founders.find((f) => f.slug === slug);
}
