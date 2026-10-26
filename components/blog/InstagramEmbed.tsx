/**
 * A click-to-watch card for an Instagram post/reel.
 *
 * We do NOT use Instagram's native `embed.js` / `/embed/` iframe. For this post
 * (and any post whose stored poster frame is a different aspect ratio than the
 * video — here a 16:9 cover on a 4:5 reel) Instagram's own embed renderer ships a
 * broken layout: the poster is squashed into a 16:9 letterbox, the video overflows
 * its frame, the "View more on Instagram" bar floats over the media, and embed.js
 * mis-sizes the iframe (~511px vs ~730px of real content) so it clips. That's
 * Instagram-side and not fixable from here, so instead we render a lightweight
 * branded card that links out to the reel. No third-party iframe, no CSP surface,
 * no autoplay, and it matches the site's dark theme.
 */

// Shortcode -> locally hosted poster frame. Until the blog admin form grows a
// dedicated poster field, known posts are mapped here; unknown ones fall back to
// a gradient card.
const POSTERS: Record<string, string> = {
  DcvRq7gz7vu: "/blog/leads-processing-coming-soon.jpg",
};

function parse(raw: string): { permalink: string; shortcode: string } | null {
  try {
    const u = new URL(raw.trim());
    if (!/(^|\.)instagram\.com$/i.test(u.hostname)) return null;
    const m = u.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    if (!m) return null;
    return {
      permalink: `https://www.instagram.com/${m[1]}/${m[2]}/`,
      shortcode: m[2],
    };
  } catch {
    return null;
  }
}

export default function InstagramEmbed({ url }: { url: string }) {
  const parsed = parse(url);
  if (!parsed) return null;

  const poster = POSTERS[parsed.shortcode];

  return (
    <div className="mb-8 flex justify-center">
      <a
        href={parsed.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch this post on Instagram"
        className="group relative block w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1e33] to-[#0a1526] shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
      >
        <div className="relative aspect-video w-full">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt="Instagram reel preview"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#833ab4,transparent_55%),radial-gradient(circle_at_75%_80%,#fd1d1d,transparent_55%),radial-gradient(circle_at_60%_40%,#fcb045,transparent_60%)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

          {/* play glyph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                aria-hidden="true"
                className="ml-1"
              >
                <path d="M21 11.27a2 2 0 0 1 0 3.46L3 25.11A2 2 0 0 1 0 23.38V2.62A2 2 0 0 1 3 .89L21 11.27Z" fill="#111" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-5 py-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="#e5e7eb" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.5" stroke="#e5e7eb" strokeWidth="1.8" />
            <circle cx="17.5" cy="6.5" r="1.3" fill="#e5e7eb" />
          </svg>
          <span className="text-sm font-semibold text-white">Watch on Instagram</span>
          <span className="ml-auto text-xs text-gray-400 transition-colors group-hover:text-lime-300">
            @trustivasetu →
          </span>
        </div>
      </a>
    </div>
  );
}
