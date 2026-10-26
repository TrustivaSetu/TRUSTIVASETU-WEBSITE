import { landingData } from "@/lib/landing-data";

export default function ServiceSchema({
  page,
}: {
  page: keyof typeof landingData;
}) {
  const item = landingData[page];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.description,
    provider: {
      "@type": "FinancialService",
      name: "Trustiva Setu",
      url: "https://www.trustivasetu.com"
    },
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    serviceType: item.title
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
