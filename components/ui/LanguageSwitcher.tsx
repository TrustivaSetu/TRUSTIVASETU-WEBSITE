"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "trustiva_language";

const languages = [
  { code: "en", native: "English" },
  { code: "hi", native: "हिन्दी" },
  { code: "bn", native: "বাংলা" },
  { code: "te", native: "తెలుగు" },
  { code: "mr", native: "मराठी" },
  { code: "ta", native: "தமிழ்" },
  { code: "ur", native: "اردو" },
  { code: "gu", native: "ગુજરાતી" },
  { code: "kn", native: "ಕನ್ನಡ" },
  { code: "or", native: "ଓଡ଼ିଆ" },
  { code: "ml", native: "മലയാളം" },
  { code: "pa", native: "ਪੰਜਾਬੀ" },
  { code: "as", native: "অসমীয়া" },
  { code: "sa", native: "संस्कृतम्" },
  { code: "ne", native: "नेपाली" },
  { code: "mai", native: "मैथिली" },
  { code: "kok", native: "कोंकणी" },
];

// Wait for Google Translate to inject .goog-te-combo into the DOM
function waitForCombo(): Promise<HTMLSelectElement> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (existing) { resolve(existing); return; }

    const observer = new MutationObserver(() => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) { observer.disconnect(); resolve(combo); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Give up after 12 seconds — widget failed to load
    setTimeout(() => { observer.disconnect(); reject(new Error("timeout")); }, 12000);
  });
}

// Translate to a language code using the hidden combo Google Translate injects.
// Called AFTER React hydration so React doesn't overwrite the translated DOM.
async function applyTranslation(code: string) {
  try {
    const combo = await waitForCombo();
    combo.value = code;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
  } catch {
    // Widget never loaded — nothing to do
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  // On mount: read saved language and restore translation
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(saved);
    if (saved && saved !== "en") {
      applyTranslation(saved);
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  function selectLanguage(code: string) {
    setSelected(code);
    setOpen(false);

    if (code === "en") {
      localStorage.removeItem(STORAGE_KEY);
      // Reload resets Google Translate (no cookie to restore)
      window.location.reload();
      return;
    }

    localStorage.setItem(STORAGE_KEY, code);
    applyTranslation(code);
  }

  const currentLang = languages.find((l) => l.code === selected);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lime-300/30 transition-all text-gray-300 hover:text-lime-300"
        title="Select language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-xs font-medium hidden sm:inline">
          {currentLang?.native.slice(0, 6) || "EN"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-[#0b1628] border border-lime-300/20 rounded-2xl shadow-2xl z-[9999] overflow-hidden">
          <div className="max-h-72 overflow-y-auto scrollbar-thin">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${
                  selected === lang.code
                    ? "text-lime-300 bg-lime-300/5"
                    : "text-gray-300"
                }`}
              >
                <span>{lang.native}</span>
                {selected === lang.code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-lime-300 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
