"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("services"), href: "#servicios" },
    { label: t("portfolio"), href: "#portafolio" },
    { label: t("about"), href: "#nosotros" },
    { label: t("contact"), href: "#contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500 text-white font-bold text-sm tracking-tight select-none">
            CI
          </span>
          <span className="font-bold text-white text-base tracking-tight leading-tight">
            Computo e IA<br />
            <span className="text-white/40 text-xs font-normal">del Sur</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#contacto"
            className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            {t("cta")}
          </a>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={t("menuLabel")}
        >
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden px-6 pb-6 flex flex-col gap-5 bg-black border-t border-white/10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/70 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
}
