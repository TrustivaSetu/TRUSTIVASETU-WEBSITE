export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trustiva Setu",
    url: "https://www.trustivasetu.com",
    logo: "https://www.trustivasetu.com/logo.png",
    description:
      "Healthcare financing infrastructure platform connecting patients, clinics and lending partners across India.",
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
