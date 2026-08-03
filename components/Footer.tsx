import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navbar");

  const quickLinks = [
    { label: nav("services"), href: "#servicios" },
    { label: nav("portfolio"), href: "#portafolio" },
    { label: nav("about"), href: "#nosotros" },
    { label: nav("contact"), href: "#contacto" },
  ];

  return (
    <footer className="relative bg-[#051015] text-[#94A3B8] pt-16 pb-12 px-6 border-t border-[#2DBEED]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-[#2DBEED]/10">
          <div>
            <p className="text-white font-mono text-sm font-bold tracking-widest uppercase mb-4 text-[#2DBEED]">
              CÓMPUTO E IA DEL SUR
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-xs font-mono">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-[#C9933B] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              {t("linksHeading")}
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[#2DBEED] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#C9933B] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              {t("legalHeading")}
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <a href="/privacidad" className="hover:text-[#2DBEED] transition-colors">
                  {t("privacyLink")}
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:text-[#2DBEED] transition-colors">
                  {t("termsLink")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[#C9933B] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              {t("contactHeading")}
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <a href="mailto:contacto@computoeiadelsur.com" className="hover:text-[#2DBEED] transition-colors">
                  contacto@computoeiadelsur.com
                </a>
              </li>
              <li className="text-[#94A3B8]/70">{t("location")}</li>
            </ul>
          </div>
        </div>

        {/* Separador y Copyright con IconOnly_NoBuffer.png pequeño w-10 h-10 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/IconOnly_NoBuffer.png"
              alt="CÓMPUTO E IA DEL SUR"
              width={40}
              height={40}
              quality={100}
              className="w-10 h-10 object-contain opacity-50 hover:opacity-100 transition-opacity"
            />
            <span className="text-slate-400">
              © {new Date().getFullYear()} CÓMPUTO E IA DEL SUR. {t("rights", { year: new Date().getFullYear() })}
            </span>
          </div>
          <p className="text-[#2DBEED]/80 font-mono tracking-widest uppercase text-xs">
            SWARM INTELLIGENCE ARCHITECTURE
          </p>
        </div>
      </div>
    </footer>
  );
}
