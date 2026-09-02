"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_ID = "instagram-embed-js";
const SCRIPT_SRC = "https://www.instagram.com/embed.js";

/** Strip query/hash and normalise to a trailing-slash permalink. */
function toPermalink(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (!/(^|\.)instagram\.com$/i.test(u.hostname)) return null;
    const path = u.pathname.endsWith("/") ? u.pathname : `${u.pathname}/`;
    return `${u.protocol}//www.instagram.com${path}`;
  } catch {
    return null;
  }
}

export default function InstagramEmbed({ url }: { url: string }) {
  const permalink = toPermalink(url);

  useEffect(() => {
    if (!permalink) return;

    const run = () => window.instgrm?.Embeds?.process();

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      run();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = SCRIPT_SRC;
    script.onload = run;
    document.body.appendChild(script);
  }, [permalink]);

  if (!permalink) return null;

  return (
    <div className="mb-8 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          margin: 0,
          maxWidth: 540,
          width: "100%",
          minWidth: 0,
        }}
      >
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", padding: 16, color: "#111" }}
        >
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  );
}
