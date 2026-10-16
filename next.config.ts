import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_SERVER } from "next/constants";

// Which build directory to use. scripts/deploy-production.sh builds into
// .next-a / .next-b alternately (passing NEXT_BUILD_DIR) while the live server
// keeps serving, then records the new one in .next-active and restarts. The
// server reads .next-active itself, so a plain `pm2 restart` picks up the new
// build without --update-env (which would also reload the env from .env files).
// An ad-hoc `next build` or `next dev` still uses '.next'.
function resolveDistDir(phase: string): string {
  if (process.env.NEXT_BUILD_DIR) return process.env.NEXT_BUILD_DIR;
  if (phase !== PHASE_PRODUCTION_SERVER) return ".next";
  try {
    const active = fs.readFileSync(path.join(process.cwd(), ".next-active"), "utf8").trim();
    if (/^\.next(-[ab])?$/.test(active) && fs.existsSync(path.join(process.cwd(), active, "BUILD_ID"))) {
      return active;
    }
  } catch {}
  return ".next";
}

const nextConfig: NextConfig = {
poweredByHeader: false,
  // Don't generate AGENTS.md / CLAUDE.md in the repo root on `next dev`.
  agentRules: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clarity.ms https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              // LMS is no longer called from the browser — it goes through the
              // signed /api/lead proxy (server-to-server), so it's not listed here.
              "connect-src 'self' https://api.web3forms.com https://*.supabase.co https://*.clarity.ms https://c.bing.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com",
              "frame-src 'none'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

const config = (phase: string): NextConfig => ({ ...nextConfig, distDir: resolveDistDir(phase) });

export default config;
