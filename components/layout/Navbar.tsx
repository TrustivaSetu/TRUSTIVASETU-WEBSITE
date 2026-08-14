"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "For Clinics", href: "/for-clinics" },
  { label: "For Patients", href: "/for-patients" },
  { label: "Why We Win", href: "/why-we-win" },
  { label: "Join Us", href: "/join-us", external: true },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#07111f]/95 backdrop-blur-xl border-b border-white/10">
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

                <Link href="/resources" className="hover:text-lime-300 transition-colors">
                  Knowledge Center
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
