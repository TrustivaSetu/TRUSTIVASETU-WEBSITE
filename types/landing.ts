export interface HeroData {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
}

export interface Treatment {
  title: string;
  description: string;
}

export interface LandingPageData {
  hero: HeroData;
  treatments: Treatment[];
}
