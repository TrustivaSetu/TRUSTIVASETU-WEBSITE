"use client";

import type { Founder } from "@/data/founders";

export default function FounderContactActions({ founder }: { founder: Founder }) {
  return (
    <div className="mt-8 w-full max-w-sm mx-auto">
      <a
        href="mailto:info@trustivasetu.com"
        className="block text-center rounded-full px-5 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
      >
        Contact Trustiva Setu
      </a>
    </div>
  );
}
