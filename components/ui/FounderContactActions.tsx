"use client";

import type { Founder } from "@/data/founders";
import { COMPANY } from "@/data/founders";

function buildVCard(founder: Founder): string {
  const [firstName, ...rest] = founder.name.split(" ");
  const lastName = rest.join(" ");
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${founder.name}`,
    `ORG:${COMPANY.name}`,
    `TITLE:${founder.role}`,
    `TEL;TYPE=CELL:${founder.phone}`,
    `EMAIL:${founder.email}`,
    `URL:${COMPANY.website}`,
    founder.experience ? `NOTE:${founder.experience}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function FounderContactActions({ founder }: { founder: Founder }) {
  function handleSaveContact() {
    const vcard = buildVCard(founder);
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${founder.name.replace(/\s+/g, "_")}_TrustivaSetu.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  const profileUrl = `${COMPANY.website}/founders/${founder.slug}`;
  const shareText = encodeURIComponent(
    `${founder.name} - ${founder.role}, ${COMPANY.name}\n` +
      `Phone: ${founder.phoneDisplay}\n` +
      `Email: ${founder.email}\n\n` +
      `${profileUrl}`
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm mx-auto">
      <a
        href={`tel:${founder.phone}`}
        className="flex-1 text-center rounded-full px-5 py-3 bg-lime-300 text-[#07111f] font-semibold hover:bg-lime-200 transition"
      >
        Call
      </a>
      <a
        href={`mailto:${founder.email}`}
        className="flex-1 text-center rounded-full px-5 py-3 border border-lime-300/40 text-lime-300 font-semibold hover:bg-lime-300/10 transition"
      >
        Email
      </a>
      <button
        onClick={handleSaveContact}
        className="flex-1 text-center rounded-full px-5 py-3 border border-lime-300/40 text-lime-300 font-semibold hover:bg-lime-300/10 transition"
      >
        Save Contact
      </button>
      <a
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center rounded-full px-5 py-3 border border-lime-300/40 text-lime-300 font-semibold hover:bg-lime-300/10 transition"
      >
        Share
      </a>
    </div>
  );
}
