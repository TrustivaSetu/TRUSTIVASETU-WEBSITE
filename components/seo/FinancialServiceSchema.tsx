export default function FinancialServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.trustivasetu.com/#financialservice",
    name: "Trustiva Setu",
    url: "https://www.trustivasetu.com",
    description:
      "Healthcare financing platform connecting patients with trusted lending partners for medical treatment financing.",
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    serviceType: [
      "Medical Loan",
      "Healthcare Financing",
      "IVF Loan",
      "Dental Loan",
      "Cosmetic Surgery Loan"
    ]
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
