import type { Metadata } from "next";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Platform Training | Trustiva Setu",
  description:
    "Training modules for Trustiva Setu partners — a walkthrough of the healthcare financing platform, chapter by chapter.",
  robots: {
    index: false,
    follow: false,
  },
};

type TrainingVideo = {
  src: string;
  title: string;
  description: string;
};

const videos: TrainingVideo[] = [
  {
    src: "/videos/chapter-01.mp4",
    title: "Chapter 1: Platform Introduction",
    description:
      "A unified operating environment for healthcare finance workflows.",
  },
  {
    src: "/videos/chapter-02.mp4",
    title: "Chapter 2: Clinics, Sales & Reports",
    description:
      "Visibility into partners and performance, scoped to each role.",
  },
  {
    src: "/videos/chapter-03.mp4",
    title: "Chapter 3: Enquiries to Lead Conversion",
    description:
      "How a patient's journey enters the system for the first time.",
  },
  {
    src: "/videos/chapter-04.mp4",
    title: "Chapter 4: Application Processing",
    description:
      "What happens to an application once it is in the system and moving through review.",
  },
  {
    src: "/videos/chapter-05.mp4",
    title: "Chapter 5: Routing to Lenders",
    description:
      "Every active lender queried in parallel, no waiting in a queue.",
  },
  {
    src: "/videos/chapter-06.mp4",
    title: "Chapter 6: Approvals & Offers",
    description:
      "Reviewing lender decisions and presenting the options that come back.",
  },
  {
    src: "/videos/chapter-07.mp4",
    title: "Chapter 7: The Complete Timeline",
    description:
      "Application, approval and disbursal, each with its own tracked date.",
  },
  {
    src: "/videos/complete-hindi.mp4",
    title: "Complete Training (Hindi)",
    description: "The full training series in Hindi.",
  },
  {
    src: "/videos/channel-partner-dashboard.mp4",
    title: "Channel Partner Dashboard",
    description:
      "A quick look at the partner portal: leads, disbursals and reports.",
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <div className="pt-6 sm:pt-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 scroll-mt-24">
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lime-300 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Platform Training
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn the Trustiva Setu platform
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              A chapter-by-chapter walkthrough of the healthcare financing
              platform for clinics, sales teams and channel partners — from
              first enquiry to disbursal.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {videos.map((v) => (
              <div key={v.src}>
                <div className="bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl overflow-hidden shadow-2xl">
                  <VideoPlayer src={v.src} />
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">{v.title}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
