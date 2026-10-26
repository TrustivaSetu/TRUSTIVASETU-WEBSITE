export const metadata = {
  title: "Healthcare Finance Knowledge Center — Trustiva Setu",
  description:
    "Curated regulatory updates for healthcare financing in India — RBI digital lending guidelines, ABDM, NABH accreditation, CDSCO and IADVL news, all in one place.",
  alternates: {
    canonical: "https://www.trustivasetu.com/resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
