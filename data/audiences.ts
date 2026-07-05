export interface AudienceContent {
  slug: "investors" | "nbfc" | "doctors";
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  video: string;
  deck: string;
  ctaLabel: string;
}

export const audiences: AudienceContent[] = [
  {
    slug: "investors",
    label: "Investors",
    eyebrow: "For Investors",
    heading: "Trustiva Setu",
    description:
      "India's healthcare financing infrastructure layer — connecting clinics, lenders and patients through one embedded finance platform. Watch the overview below, or view the full pitch deck.",
    video: "/videos/explainer.mp4",
    deck: "/decks/investor-pitch-deck.pdf",
    ctaLabel: "View Investor Deck",
  },
  {
    slug: "nbfc",
    label: "NBFC & Lending Partners",
    eyebrow: "For NBFC & Lending Partners",
    heading: "Partner With Trustiva Setu",
    description:
      "Multi-lender routing, faster approvals and a pan-India clinic network — built for banking and NBFC ecosystem partners. Watch how the workflow operates, or view the full partnership deck.",
    video: "/videos/lms.mp4",
    deck: "/decks/nbfc-partnership-deck.pdf",
    ctaLabel: "View Partnership Deck",
  },
  {
    slug: "doctors",
    label: "Clinics & Doctors",
    eyebrow: "For Clinics & Doctors",
    heading: "Offer Instant Patient Financing",
    description:
      "Help your patients start treatment without upfront cost worries — instant, paperless EMI approvals through Trustiva Setu's lender network. Watch the full patient journey below, or view the clinic overview.",
    video: "/videos/journey.mp4",
    deck: "/decks/doctors-clinics-deck.pdf",
    ctaLabel: "View Clinic Overview",
  },
];

export function getAudienceBySlug(slug: string): AudienceContent | undefined {
  return audiences.find((a) => a.slug === slug);
}
