import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen bg-black text-white flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        <span className="inline-block px-3 py-1 rounded-full border border-orange-500/40 text-orange-400 text-xs font-medium tracking-widest uppercase mb-8">
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
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-center"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-center"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
