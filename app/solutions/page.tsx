import Link from "next/link";
import { CreditCard, Landmark, HeartHandshake } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Our Financing Solutions — Trustiva Setu",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <div className="pt-32 sm:pt-36">
        {/* SOLUTIONS */}

        <section
          id="solutions"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
        >
          <h2 className="text-4xl font-bold mb-10">
            Our Financing Solutions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
              <CreditCard className="text-lime-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Embedded Healthcare Finance</h3>
              <p className="text-gray-300">
                Allow hospitals and clinics to offer instant financing
directly at the point of care with seamless approvals.
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
              <Landmark className="text-lime-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Provider Financing Platform</h3>
              <p className="text-gray-300">
                Improve provider collections and patient conversion
without taking credit risk or operational burden.
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
              <HeartHandshake className="text-lime-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">Lender Integration Layer</h3>
              <p className="text-gray-300">
                Connect NBFCs, banks and lending partners with
verified healthcare demand through one unified system.
              </p>
            </div>
          </div>
        </section>

        {/* SEO INTERNAL LINKS */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-3xl font-bold mb-6">
            Explore Healthcare Financing Options
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link href="/medical-loan" className="text-lime-300 hover:underline">Medical Loan</Link>
            <Link href="/ivf-loan" className="text-lime-300 hover:underline">IVF Loan</Link>
            <Link href="/dental-loan" className="text-lime-300 hover:underline">Dental Loan</Link>
            <Link href="/hair-transplant-loan" className="text-lime-300 hover:underline">Hair Transplant Loan</Link>
            <Link href="/lasik-loan" className="text-lime-300 hover:underline">LASIK Loan</Link>
            <Link href="/cosmetic-surgery-loan" className="text-lime-300 hover:underline">Cosmetic Surgery Loan</Link>
            <Link href="/plastic-surgery-loan" className="text-lime-300 hover:underline">Plastic Surgery Loan</Link>
            <Link href="/knee-replacement-loan" className="text-lime-300 hover:underline">Knee Replacement Loan</Link>
            <Link href="/hip-replacement-loan" className="text-lime-300 hover:underline">Hip Replacement Loan</Link>
            <Link href="/spine-surgery-loan" className="text-lime-300 hover:underline">Spine Surgery Loan</Link>
            <Link href="/bariatric-surgery-loan" className="text-lime-300 hover:underline">Bariatric Surgery Loan</Link>
            <Link href="/egg-freezing-loan" className="text-lime-300 hover:underline">Egg Freezing Loan</Link>
            <Link href="/fertility-preservation-loan" className="text-lime-300 hover:underline">Fertility Preservation Loan</Link>
            <Link href="/dental-implant-loan" className="text-lime-300 hover:underline">Dental Implant Loan</Link>
            <Link href="/invisible-braces-loan" className="text-lime-300 hover:underline">Invisible Braces Loan</Link>
            <Link href="/rhinoplasty-loan" className="text-lime-300 hover:underline">Rhinoplasty Loan</Link>
            <Link href="/liposuction-loan" className="text-lime-300 hover:underline">Liposuction Loan</Link>
            <Link href="/gynecomastia-loan" className="text-lime-300 hover:underline">Gynecomastia Loan</Link>
            <Link href="/cataract-loan" className="text-lime-300 hover:underline">Cataract Surgery Loan</Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
