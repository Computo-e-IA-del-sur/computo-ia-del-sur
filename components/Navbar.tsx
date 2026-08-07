"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("services"), href: `/${locale}#servicios` },
    { label: t("portfolio"), href: `/${locale}#portafolio` },
    { label: t("about"), href: `/${locale}#nosotros` },
    { label: "Blog", href: `/${locale}/blog` },
    { label: t("contact"), href: `/${locale}#contacto` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0E2A35]/95 backdrop-blur-md border-b border-[#2DBEED]/15 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-24 md:h-28 flex items-center justify-between py-4 md:py-6">
        {/* Logo principal con altura ampliada h-16 md:h-20 para maxima visibilidad */}
        <div className="flex items-center bg-transparent">
          <Logo variant="full" priority quality={100} />
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-xs xl:text-sm font-medium tracking-wide text-slate-200 hover:text-[#2DBEED] transition-colors font-mono"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          <LanguageSwitcher />
          <a
            href={`/${locale}#contacto`}
            className="btn-gold-primary px-5 xl:px-7 py-2.5 xl:py-3 text-center tracking-widest uppercase text-[10px] xl:text-xs font-semibold rounded-md shadow-lg"
          >
            {t("cta")}
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-slate-200 hover:text-[#2DBEED] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={t("menuLabel")}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5 rounded-full" />
          <div className="w-6 h-0.5 bg-current mb-1.5 rounded-full" />
          <div className="w-6 h-0.5 bg-current rounded-full" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden px-6 pb-8 flex flex-col gap-6 bg-[#0E2A35] border-t border-[#2DBEED]/20 shadow-2xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-link self-start text-base font-medium tracking-wide text-slate-200 hover:text-[#2DBEED] font-mono"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-4">
            <LanguageSwitcher />
            <a
              href={`/${locale}#contacto`}
              onClick={() => setOpen(false)}
              className="btn-gold-primary text-center py-3.5 tracking-widest uppercase text-xs font-semibold rounded-md shadow-lg"
            >
              {t("cta")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
