"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "trustiva_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (SSR or private mode) — don't show
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9997] bg-[#0b1628]/98 backdrop-blur-xl border-t border-lime-300/20 px-4 py-4 sm:py-5 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-300 leading-6">
          <span className="font-semibold text-white">🍪 We use cookies</span> to enhance your experience and analyse site performance.
          By continuing to use this site, you agree to our{" "}
          <a href="/privacy-policy" className="text-lime-300 underline hover:text-lime-200" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-lime-300 underline hover:text-lime-200" target="_blank" rel="noopener noreferrer">
            Terms &amp; Conditions
          </a>
          . We do not sell your data.
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none min-h-[44px] px-5 py-2 rounded-xl border border-white/20 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none min-h-[44px] px-6 py-2 rounded-xl bg-lime-300 text-black text-sm font-bold hover:bg-lime-200 transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
