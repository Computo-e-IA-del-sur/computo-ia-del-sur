import { useTranslations } from "next-intl";
import Logo from "./Logo";

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
    <footer className="bg-zinc-950 text-white/40 pt-16 pb-10 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          <div>
            <Logo />
            <p className="text-sm text-white/40 mt-4 max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">{t("linksHeading")}</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">{t("legalHeading")}</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="/privacidad" className="hover:text-white transition-colors">
                  {t("privacyLink")}
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:text-white transition-colors">
                  {t("termsLink")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">{t("contactHeading")}</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="mailto:contacto@computoeiadelsur.com" className="hover:text-white transition-colors">
                  contacto@computoeiadelsur.com
                </a>
              </li>
              <li className="text-white/30">{t("location")}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <p>{t("brand")}</p>
        </div>
      </div>
    </footer>
  );
}
