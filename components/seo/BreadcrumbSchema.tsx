export default function BreadcrumbSchema({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trustivasetu.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://www.trustivasetu.com/${slug}`,
      },
    ],
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
