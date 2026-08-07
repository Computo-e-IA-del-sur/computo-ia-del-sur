import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwarmBackground from "@/components/SwarmBackground";
import { ArrowLeft, CheckCircle2, XCircle, Cloud, Server, ShieldCheck, Zap, Laptop, Building2 } from "lucide-react";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "Todo sobre Supabase: Versiones y Diferencias | CÓMPUTO E IA DEL SUR",
  description: "Descubre qué es Supabase, la alternativa Open Source a Firebase. Analizamos sus versiones (Free, Pro, Team, Enterprise) y las ventajas de Autohospedarlo.",
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "zh" }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

import { getTranslations } from "next-intl/server";

export default async function SupabaseBlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BlogSupabase");

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
          <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-teal)]/10 text-[var(--primary-teal)] border border-[var(--primary-teal)]/30 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(45,190,237,0.2)]">
            {t("headerTag")}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-8">
            {t("headerTitle1")}<span className="text-[#3ECF8E]">Supabase</span>{t("headerTitle2")}
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

        {/* Resumen Ejecutivo Destacado */}
        <section className="bg-gradient-to-br from-[#0A1E27]/80 to-[#051015] border border-[var(--primary-teal)]/30 p-8 md:p-10 rounded-2xl mb-16 shadow-[0_0_40px_rgba(45,190,237,0.1)] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--primary-teal)] to-[var(--brand-gold)]" />
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Zap className="text-[var(--primary-teal)]" /> {t("introTitle")}
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {t("introText")}
          </p>
        </section>

        {/* ¿Qué es Supabase? */}
        <section className="space-y-6 text-slate-300 text-lg leading-relaxed mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t("whatIsTitle")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw("whatIsText1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("whatIsText2") }} />
        </section>

        {/* Arquitectura y Gráfico Mermaid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t("archTitle")}</h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-8">
            {t("archText")}
          </p>
          
          <div className="bg-[#050C10] border border-white/10 rounded-2xl p-6 md:p-10 shadow-inner overflow-x-auto relative group">
            <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-mono text-slate-500">
              {t("mermaidTag")}
            </div>
            <MermaidDiagram chart={`graph LR
                Envoy["Envoy API Gateway"] 
                GoTrue["GoTrue (Auth)"] 
                PostgREST["PostgREST (Auto-API)"] 
                Realtime["Realtime (WebSockets)"] 
                Storage["Storage (S3 API)"] 
                PgMeta["postgres-meta (DB mgmt)"] 
                Functions["Edge Functions (Deno)"] 
                PgGraphQL["pg_graphql"] 
                Postgres[("Postgres (Database)")] 
                Envoy --> GoTrue
                Envoy --> PostgREST
                Envoy --> Realtime
                Envoy --> Storage
                Envoy --> PgMeta
                Envoy --> Functions
                Envoy --> PgGraphQL
                GoTrue --> Postgres
                PostgREST --> Postgres
                Realtime --> Postgres
                Storage --> Postgres
                PgMeta --> Postgres
                Functions --> Postgres
                PgGraphQL --> Postgres`} />
          </div>
        </section>

        {/* Planes */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">{t("plansTitle")}</h2>
          <p className="text-slate-300 text-lg mb-10">
            {t("plansText")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Free */}
            <div className="bg-[#0A1A22]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-[var(--brand-gold)]/30 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <p className="text-3xl font-black text-[var(--brand-gold)] mb-4">$0 <span className="text-sm font-normal text-slate-400">/mo</span></p>
              <p className="text-xs text-slate-400 mb-6 min-h-[60px]">{t("planFreeDesc")}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0" /> {t("planFreeF1")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0" /> {t("planFreeF2")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0" /> {t("planFreeF3")}</li>
                <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0" /> {t("planFreeF4")}</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-[#0A1A22]/60 backdrop-blur-md rounded-2xl p-6 border border-[var(--primary-teal)]/50 shadow-[0_0_30px_rgba(45,190,237,0.1)] relative transition-all hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary-teal)] text-[#051015] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">{t("planProTag")}</div>
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <p className="text-3xl font-black text-[var(--primary-teal)] mb-4">$25 <span className="text-sm font-normal text-slate-400">/mo</span></p>
              <p className="text-xs text-slate-400 mb-6 min-h-[60px]">{t("planProDesc")}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[var(--primary-teal)] shrink-0" /> {t("planProF1")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[var(--primary-teal)] shrink-0" /> {t("planProF2")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[var(--primary-teal)] shrink-0" /> {t("planProF3")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[var(--primary-teal)] shrink-0" /> {t("planProF4")}</li>
              </ul>
            </div>

            {/* Team */}
            <div className="bg-[#0A1A22]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Team</h3>
              <p className="text-3xl font-black text-white mb-4">$599 <span className="text-sm font-normal text-slate-400">/mo</span></p>
              <p className="text-xs text-slate-400 mb-6 min-h-[60px]">{t("planTeamDesc")}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0" /> {t("planTeamF1")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0" /> {t("planTeamF2")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0" /> {t("planTeamF3")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-white shrink-0" /> {t("planTeamF4")}</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A1A22] backdrop-blur-md rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-2xl font-black text-slate-300 mb-4 py-1">{t("planEntPrice")}</p>
              <p className="text-xs text-slate-400 mb-6 min-h-[60px]">{t("planEntDesc")}</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-slate-400 shrink-0" /> {t("planEntF1")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-slate-400 shrink-0" /> {t("planEntF2")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-slate-400 shrink-0" /> {t("planEntF3")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-slate-400 shrink-0" /> {t("planEntF4")}</li>
              </ul>
            </div>
            
          </div>
        </section>

        {/* Tabla Comparativa Exhaustiva */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">{t("tableTitle")}</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10 shadow-2xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0A1A22] text-white border-b border-white/10 uppercase font-mono tracking-wider text-xs">
                <tr>
                  <th className="p-4">{t("tableCol1")}</th>
                  <th className="p-4 bg-white/5">Free</th>
                  <th className="p-4 bg-[var(--primary-teal)]/10 text-[var(--primary-teal)]">Pro</th>
                  <th className="p-4 bg-white/5">Team</th>
                  <th className="p-4 bg-white/5">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#051015]/50">
                
                {/* Fila 1 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{t("tableRow1")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow1C1")}</td>
                  <td className="p-4 bg-[var(--primary-teal)]/[0.05]">{t("tableRow1C2")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow1C3")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow1C4")}</td>
                </tr>

                {/* Fila 2 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{t("tableRow2")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow2C1")}</td>
                  <td className="p-4 bg-[var(--primary-teal)]/[0.05]">{t("tableRow2C2")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow2C3")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow2C4")}</td>
                </tr>

                {/* Fila 3 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{t("tableRow3")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow3C1")}</td>
                  <td className="p-4 bg-[var(--primary-teal)]/[0.05]">{t("tableRow3C2")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow3C3")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow3C4")}</td>
                </tr>

                {/* Fila 4 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{t("tableRow4")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow4C1")}</td>
                  <td className="p-4 bg-[var(--primary-teal)]/[0.05]">{t("tableRow4C2")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow4C3")}</td>
                  <td className="p-4 bg-white/[0.02]">{t("tableRow4C4")}</td>
                </tr>

                {/* Fila 5 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{t("tableRow5")}</td>
                  <td className="p-4 bg-white/[0.02] text-slate-500">{t("tableRow5C1")}</td>
                  <td className="p-4 bg-[var(--primary-teal)]/[0.05] text-[var(--primary-teal)] font-medium">{t("tableRow5C2")}</td>
                  <td className="p-4 bg-white/[0.02] text-[var(--brand-gold)] font-medium">{t("tableRow5C3")}</td>
                  <td className="p-4 bg-white/[0.02] text-[var(--brand-gold)] font-medium">{t("tableRow5C4")}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </section>
        {/* Modalidades de Despliegue (Ventajas y Desventajas) */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">{t("deployTitle")}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Gestionada */}
            <div className="bg-[#1A1A1A]/50 border border-[var(--primary-teal)]/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Cloud className="text-[var(--primary-teal)] w-8 h-8" />
                <h3 className="text-xl font-bold text-white">{t("managedTitle")}</h3>
              </div>
              <p className="text-sm text-slate-300 mb-6">{t("managedDesc")}</p>
              
              <div className="mb-6">
                <h4 className="text-[var(--primary-teal)] font-bold text-xs uppercase tracking-wider mb-3">{t("managedPros")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("managedPro1")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("managedPro2")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("managedPro3")}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3">{t("managedCons")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("managedCon1")}</li>
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("managedCon2")}</li>
                </ul>
              </div>
            </div>

            {/* Local CLI */}
            <div className="bg-[#1A1A1A]/50 border border-slate-600 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Laptop className="text-slate-300 w-8 h-8" />
                <h3 className="text-xl font-bold text-white">{t("localTitle")}</h3>
              </div>
              <p className="text-sm text-slate-300 mb-6">{t("localDesc")}</p>
              
              <div className="mb-6">
                <h4 className="text-slate-300 font-bold text-xs uppercase tracking-wider mb-3">{t("localPros")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("localPro1")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("localPro2")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("localPro3")}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3">{t("localCons")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("localCon1")}</li>
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("localCon2")}</li>
                </ul>
              </div>
            </div>

            {/* Self Hosted */}
            <div className="bg-[#12272E]/50 border border-[var(--brand-gold)]/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-gold)]/10 blur-2xl rounded-full" />
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Building2 className="text-[var(--brand-gold)] w-8 h-8" />
                <h3 className="text-xl font-bold text-white">{t("selfTitle")}</h3>
              </div>
              <p className="text-sm text-slate-300 mb-6">{t("selfDesc")}</p>
              
              <div className="mb-6">
                <h4 className="text-[var(--brand-gold)] font-bold text-xs uppercase tracking-wider mb-3">{t("selfPros")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("selfPro1")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("selfPro2")}</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> {t("selfPro3")}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3">{t("selfCons")}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("selfCon1")}</li>
                  <li className="flex items-start gap-2"><XCircle size={16} className="text-red-400 shrink-0 mt-0.5" /> {t("selfCon2")}</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Recomendaciones y Conclusiones */}
        <section className="space-y-6 text-slate-300 text-lg leading-relaxed mb-16 border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t("conclusionTitle")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw("conclusionText1") }} />
          <p>
            {t("conclusionText2")}
          </p>
        </section>

        {/* Fuentes */}
        <section className="bg-[#050C10] p-8 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest font-mono">Fuentes Utilizadas</h3>
          <ul className="space-y-3 text-sm text-slate-400 font-mono">
            <li><a href="https://supabase.com/pricing" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">Supabase Pricing & Fees</a> - Sitio Oficial (Acceso: Ago 2026)</li>
            <li><a href="https://supabase.com/docs/guides/platform/billing-on-supabase" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">About Billing</a> - Documentación Oficial</li>
            <li><a href="https://supabase.com/docs/guides/getting-started/architecture" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">Supabase Architecture</a> - Documentación Oficial</li>
            <li><a href="https://supabase.com/docs/guides/self-hosting" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">Self-Hosting</a> - Documentación Oficial</li>
            <li><a href="https://supabase.com/docs/guides/local-development" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">Local Development & CLI</a> - Documentación Oficial</li>
            <li><a href="https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/" target="_blank" rel="noreferrer" className="text-[var(--primary-teal)] hover:underline">Supabase Pricing 2026 Guide (JetAdmin)</a></li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
