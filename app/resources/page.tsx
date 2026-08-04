import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare Finance Resources | Trustiva Setu",
  description:
    "Official guides and knowledge base covering RBI, ABDM, NABH, DPDP Act, IMA, ISAR, IADVL, Medical Loans and No Cost EMI.",
};

const resources = [
  {
    title: "RBI Digital Lending Guidelines",
    href: "/resources/rbi-digital-lending-guidelines",
  },
  {
    title: "ABDM",
    href: "/resources/abdm",
  },
  {
    title: "NABH",
    href: "/resources/nabh",
  },
  {
    title: "DPDP Act",
    href: "/resources/dpdp-act",
  },
  {
    title: "IMA",
    href: "/resources/ima",
  },
  {
    title: "ISAR",
    href: "/resources/isar",
  },
  {
    title: "IADVL",
    href: "/resources/iadvl",
  },
  {
    title: "Medical Loan Guide",
    href: "/resources/rbi-medical-loan",
  },
  {
    title: "No Cost EMI Guide",
    href: "/resources/no-cost-emi",
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        Trustiva Setu Knowledge Hub
      </h1>

      <p className="mb-10 text-gray-400">
        Explore healthcare finance regulations, treatment financing guides,
        digital health standards and patient education resources.
      </p>

      <div className="grid gap-4">
        {resources.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-gray-700 p-5 hover:border-blue-500 transition"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
