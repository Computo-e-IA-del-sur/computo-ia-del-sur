import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwarmBackground from "@/components/SwarmBackground";
import { ArrowLeft, Users, Terminal, Zap, Lightbulb } from "lucide-react";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Claude vs Claude Platform: ¿Por qué mi factura se disparó? | CÓMPUTO E IA DEL SUR",
  description: "Investigamos por qué usar Claude mediante línea de comandos (CLI) resulta mucho más caro que la suscripción a Claude Team. Diferencias entre suscripción y pago por token.",
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "zh" }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

import { getTranslations } from "next-intl/server";

export default async function ClaudeBlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BlogClaude");

  return (
    <div className="min-h-screen bg-[#051015] text-[#E2E8F0] flex flex-col relative selection:bg-[var(--primary-teal)]/30 selection:text-[var(--primary-teal)] overflow-x-hidden">
      <SwarmBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-40 md:pb-32 px-6 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Back Button */}
        <Link 
          href={`/${locale}/blog`} 
          className="inline-flex items-center gap-2 text-[var(--brand-gold)] hover:text-white transition-colors mb-8 font-mono text-xs tracking-wider uppercase"
        >
          <ArrowLeft size={16} />
          {t("backBtn")}
        </Link>

        {/* Header Hero */}
        <header className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(201,147,59,0.2)]">
            {t("headerTag")}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-8">
            {t("headerTitle1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97757] to-[#C9933B]">{t("headerTitle2")}</span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-mono text-sm border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-teal)] animate-pulse" />
              {t("author")}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-gold)]" />
              {t("date")}
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="bg-gradient-to-br from-[#1A100C]/80 to-[#051015] border border-[#D97757]/30 p-8 md:p-10 rounded-2xl mb-16 shadow-[0_0_40px_rgba(217,119,87,0.1)] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D97757] to-[var(--brand-gold)]" />
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Zap className="text-[#D97757]" /> {t("introTitle")}
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {t("introText")}
          </p>
        </section>

        {/* Diferencias */}
        <section className="space-y-6 text-slate-300 text-lg leading-relaxed mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t("diffTitle")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw("diffText1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("diffText2") }} />
        </section>

        {/* Esquemas */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Claude Team */}
          <div className="bg-[#0A1A22]/40 backdrop-blur-md rounded-2xl p-8 border border-[var(--primary-teal)]/30 hover:border-[var(--primary-teal)]/60 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary-teal)]/20 flex items-center justify-center mb-6">
              <Users className="text-[var(--primary-teal)] w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t("teamTitle")}</h3>
            <p className="text-slate-300 text-base leading-relaxed">{t("teamText")}</p>
          </div>

          {/* Claude Platform */}
          <div className="bg-[#1A100C]/40 backdrop-blur-md rounded-2xl p-8 border border-[#D97757]/30 hover:border-[#D97757]/60 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#D97757]/20 flex items-center justify-center mb-6">
              <Terminal className="text-[#D97757] w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t("platformTitle")}</h3>
            <p className="text-slate-300 text-base leading-relaxed">{t("platformText")}</p>
          </div>

        </section>

        {/* Gráfico de Costos */}
        <section className="mb-20 bg-[#050C10] border border-white/10 rounded-2xl p-8 md:p-10 shadow-inner">
          <h2 className="text-3xl font-bold text-white mb-4">{t("chartTitle")}</h2>
          <p className="text-slate-400 mb-10">{t("chartDesc")}</p>
          
          <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto font-mono text-sm">
            {/* Bar 1 */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-slate-300 shrink-0">{t("barTeam")}</div>
              <div className="flex-1 h-8 bg-[#0A1A22] rounded-r-md relative">
                <div className="absolute top-0 left-0 h-full bg-[var(--primary-teal)] rounded-r-md flex items-center px-3 font-bold text-[#051015]" style={{ width: "20%" }}>
                  $30
                </div>
              </div>
            </div>
            
            {/* Bar 2 */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-slate-300 shrink-0">{t("barApiLow")}</div>
              <div className="flex-1 h-8 bg-[#0A1A22] rounded-r-md relative">
                <div className="absolute top-0 left-0 h-full bg-[var(--brand-gold)] rounded-r-md flex items-center px-3 font-bold text-[#051015]" style={{ width: "10%" }}>
                  $15
                </div>
              </div>
            </div>

            {/* Bar 3 */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-slate-300 shrink-0">{t("barApiHigh")}</div>
              <div className="flex-1 h-8 bg-[#0A1A22] rounded-r-md relative">
                <div className="absolute top-0 left-0 h-full bg-[#D97757] rounded-r-md flex items-center justify-end px-3 font-bold text-white shadow-[0_0_15px_rgba(217,119,87,0.5)]" style={{ width: "100%" }}>
                  $300+
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recomendaciones y Conclusiones */}
        <section className="space-y-6 text-slate-300 text-lg leading-relaxed mb-16 border-t border-white/10 pt-16 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Lightbulb className="w-32 h-32 text-[#D97757]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">{t("conclusionTitle")}</h2>
          <p className="relative z-10">{t("conclusionText1")}</p>
          <p className="relative z-10">{t("conclusionText2")}</p>
        </section>

        {/* Fuentes APA */}
        <section className="bg-[#050C10] p-8 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest font-mono">Referencias (Formato APA)</h3>
          <ul className="space-y-4 text-sm text-slate-400 font-mono">
            <li className="pl-4 -indent-4">Anthropic. (2026). <em>Claude Team plan</em>. Claude Support Center. Recuperado de <a href="https://support.claude.com/" target="_blank" rel="noreferrer" className="text-[var(--brand-gold)] hover:underline break-all">https://support.claude.com/</a></li>
            <li className="pl-4 -indent-4">Anthropic. (2026). <em>Build with Claude - Pricing</em>. Anthropic API. Recuperado de <a href="https://www.anthropic.com/pricing#anthropic-api" target="_blank" rel="noreferrer" className="text-[var(--brand-gold)] hover:underline break-all">https://www.anthropic.com/pricing#anthropic-api</a></li>
            <li className="pl-4 -indent-4">CloudZero. (2026). <em>The Complete Guide to Anthropic Claude Pricing</em>. CloudZero Blog. Recuperado de <a href="https://www.cloudzero.com/blog/claude-pricing/" target="_blank" rel="noreferrer" className="text-[var(--brand-gold)] hover:underline break-all">https://www.cloudzero.com/blog/claude-pricing/</a></li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
