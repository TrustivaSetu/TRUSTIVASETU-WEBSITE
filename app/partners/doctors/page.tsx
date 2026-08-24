import type { Metadata } from "next";
import VideoPlayer from "@/components/ui/VideoPlayer";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Dental Clinic & Doctor Financing | Patient EMI | Trustiva Setu",
  description:
    "Patient financing and EMI solutions for dental clinics, dentists, doctors and healthcare providers in India through participating lending partners.",
  alternates: {
    canonical: "https://www.trustivasetu.com/partners/doctors",
  },
  openGraph: {
    title: "Dental Clinic & Doctor Financing | Patient EMI | Trustiva Setu",
    description:
      "Patient financing and EMI solutions for dental clinics, dentists, doctors and healthcare providers in India.",
    url: "https://www.trustivasetu.com/partners/doctors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Clinic & Doctor Financing | Patient EMI | Trustiva Setu",
    description:
      "Patient financing and EMI solutions for dental clinics, dentists, doctors and healthcare providers in India.",
  },
};

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-4 py-16 sm:py-24">
      <BreadcrumbSchema
        title="Dental Clinic & Doctor Financing | Trustiva Setu"
        slug="partners/doctors"
      />

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          For Dental Clinics, Dentists &amp; Doctors
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold font-(--font-playfair) mb-4">
          Dental Clinic &amp; Doctor Patient Financing in India
        </h1>

        <p className="text-gray-300 leading-7 mb-10">
          Trustiva Setu helps dental clinics, dentists, doctors and healthcare
          providers offer eligible patients treatment financing and EMI
          options through participating lending partners.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-bold text-white">
              Dental Clinic Financing
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Help patients explore financing for eligible dental treatments
              including implants, braces, aligners and other planned care.
            </p>
            <a
              href="/dental-loan"
              className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
            >
              Dental Loan
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-bold text-white">
              Dental Implant Financing
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Patients can explore financing options for eligible single,
              multiple and full-mouth dental implant procedures.
            </p>
            <a
              href="/dental-implant-loan"
              className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
            >
              Dental Implant Loan
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-bold text-white">
              Doctor &amp; Clinic Partnership
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Doctors and healthcare providers can enquire about joining the
              Trustiva Setu provider partnership network.
            </p>
            <a
              href="/for-clinics#clinics"
              className="mt-4 inline-block text-sm font-semibold text-lime-300 hover:underline"
            >
              Partner With Us
            </a>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <VideoPlayer src="/videos/journey.mp4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-bold text-white mb-2">
              Patient Treatment Financing
            </h2>
            <p className="text-sm leading-6 text-gray-400">
              Offer eligible patients a digital financing journey for planned
              healthcare treatment, subject to lender eligibility, verification
              and approval.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-bold text-white mb-2">
              No Cost EMI for Eligible Patients
            </h2>
            <p className="text-sm leading-6 text-gray-400">
              Participating healthcare providers can help eligible patients
              access available EMI and financing options through the lender
              network.
            </p>
          </div>
        </div>

        <a
          href="/decks/doctors-clinics-deck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
        >
          View Clinic Overview
        </a>
      </div>
    </main>
  );
}
