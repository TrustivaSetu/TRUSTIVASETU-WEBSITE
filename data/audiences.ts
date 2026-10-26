export interface AudienceContent {
  slug: "investors" | "nbfc" | "doctors";
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  shareHook: string;
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
    shareHook:
      "Building India's healthcare financing infrastructure — 1000+ clinics, multi-lender routing, one platform. Worth 2 minutes of your time:",
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
    shareHook:
      "A lending partnership worth exploring — faster approvals, wider reach, zero extra ops load on your end. Take a look:",
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
    shareHook:
      "Never let a patient delay treatment over cost again — instant, paperless EMI approval in 8–10 minutes. Here's how it works:",
  },
];

export function getAudienceBySlug(slug: string): AudienceContent | undefined {
  return audiences.find((a) => a.slug === slug);
}
