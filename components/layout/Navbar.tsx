"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import sources from "@/data/knowledge/sources.json";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "For Clinics", href: "/for-clinics" },
  { label: "For Patients", href: "/for-patients" },
  { label: "Why We Win", href: "/why-we-win" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Join Us", href: "/join-us", external: true },
  { label: "Contact Us", href: "/contact" },
];

const knowledgeSources = sources.map((s) => ({
  id: s.id,
  label: `${s.id.toUpperCase()} Updates`,
  active: s.active === true,
}));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kcDesktopOpen, setKcDesktopOpen] = useState(false);
  const [kcMobileOpen, setKcMobileOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-40
          bg-[#07111f]/95 backdrop-blur-xl
          transform transition-all duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <div className="text-lg font-semibold text-white">Menu</div>

          <button onClick={() => setMenuOpen(false)} className="text-2xl text-white">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6 py-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className="text-white border-b border-white/10 pb-3 hover:text-lime-300 transition"
            >
              {item.label}
            </Link>
          ))}

          <div className="border-b border-white/10 pb-3">
            <button
              onClick={() => setKcMobileOpen((o) => !o)}
              className="w-full flex items-center justify-between text-white hover:text-lime-300 transition"
            >
              <span>Knowledge Center</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${kcMobileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {kcMobileOpen && (
              <div className="mt-4 flex flex-col gap-4 pl-4 text-base">
                <Link
                  href="/resources"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-lime-300 transition"
                >
                  All Updates
                </Link>
                {knowledgeSources.map((s) =>
                  s.active ? (
                    <Link
                      key={s.id}
                      href={`/resources?source=${s.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-lime-300 transition"
                    >
                      {s.label}
                    </Link>
                  ) : (
                    <div
                      key={s.id}
                      aria-disabled="true"
                      className="flex items-center justify-between gap-2 text-gray-500 cursor-not-allowed"
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-gray-500">
                        Coming Soon
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 left-0 right-0 z-50 bg-[#07111f]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/logo.png" alt="logo" width={56} height={56} />

            <div>
              <div className="text-lg md:text-2xl font-bold">Trustiva Setu</div>
              <p className="text-xs md:text-sm text-gray-300">
                Aarthsetu Technologies Pvt. Ltd.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="hover:text-lime-300 transition"
                  >
                    {item.label}
                  </Link>
                ))}

                <div
                  className="relative"
                  onMouseEnter={() => setKcDesktopOpen(true)}
                  onMouseLeave={() => setKcDesktopOpen(false)}
                >
                  <button
                    onClick={() => setKcDesktopOpen((o) => !o)}
                    className="flex items-center gap-1 hover:text-lime-300 transition-colors"
                  >
                    Knowledge Center
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${kcDesktopOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {kcDesktopOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#0b1628] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                      <Link
                        href="/resources"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/5 hover:text-lime-300 transition"
                      >
                        All Updates
                      </Link>
                      <div className="h-px bg-white/10 my-1" />
                      {knowledgeSources.map((s) =>
                        s.active ? (
                          <Link
                            key={s.id}
                            href={`/resources?source=${s.id}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-white/5 hover:text-lime-300 transition"
                          >
                            {s.label}
                          </Link>
                        ) : (
                          <div
                            key={s.id}
                            aria-disabled="true"
                            className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-500 cursor-not-allowed"
                          >
                            <span>{s.label}</span>
                            <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-gray-500">
                              Coming Soon
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
