export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trustiva Setu",
    url: "https://www.trustivasetu.com",
    logo: "https://www.trustivasetu.com/logo.png",
    description:
      "Healthcare financing platform helping patients access medical treatment through trusted lending partners.",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        availableLanguage: ["English", "Hindi"]
      }
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
