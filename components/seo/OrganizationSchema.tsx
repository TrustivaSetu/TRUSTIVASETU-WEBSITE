export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.trustivasetu.com/#organization",
        name: "Trustiva Setu",
        alternateName: "TrustivaSetu",
        url: "https://www.trustivasetu.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.trustivasetu.com/logo.png"
        },
        description:
          "Healthcare financing infrastructure platform connecting patients, clinics and lending partners across India.",
        email: "info@trustivasetu.com",
        sameAs: []
      },
      {
        "@type": "WebSite",
        "@id": "https://www.trustivasetu.com/#website",
        url: "https://www.trustivasetu.com",
        name: "Trustiva Setu",
        publisher: {
          "@id": "https://www.trustivasetu.com/#organization"
        },
        inLanguage: "en-IN"
      },
      {
        "@type": "FinancialService",
        "@id": "https://www.trustivasetu.com/#financialservice",
        name: "Trustiva Setu",
        url: "https://www.trustivasetu.com",
        areaServed: "IN",
        serviceType: [
          "Medical Loans",
          "Healthcare Financing",
          "Clinic Financing",
          "EMI Solutions"
        ],
        provider: {
          "@id": "https://www.trustivasetu.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
