import { useTranslations } from "next-intl";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white flex items-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <span className="inline-flex flex-wrap items-center justify-center min-w-0 px-4 py-2 rounded-2xl sm:rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-[10px] sm:text-xs md:text-sm tracking-wider uppercase text-center break-words [overflow-wrap:anywhere] max-w-full mb-8">
          {t("eyebrow")}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
          {t("titleLine1")}<br />
          {t("titleLine2")}<br />
          <span className="text-orange-500">{t("titleHighlight")}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#servicios"
            className="btn-glow px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 text-center"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#contacto"
            className="btn-glow-ghost px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 text-center"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
