import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbulb, HeartHandshake, Rocket, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type Value = {
  title: string;
  description: string;
};

const ICONS: LucideIcon[] = [Lightbulb, HeartHandshake, Rocket];

export default function About() {
  const t = useTranslations("About");
  const values = t.raw("values") as Value[];

  return (
    <section id="nosotros" className="relative py-28 md:py-32 px-6 bg-[#051015] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,42,53,1),rgba(5,16,21,1))] bg-swarm-grid overflow-hidden">
      {/* Marca de agua de fondo ultra sutil */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <Image
          src="/logos/Grayscale_NoBuffer.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2DBEED]/10 text-[#2DBEED] border border-[#2DBEED]/30 text-xs sm:text-sm tracking-widest uppercase mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2DBEED] animate-pulse" />
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2DBEED] to-[#C9933B]">
            {t("title")}
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-4">
            {t("paragraph1")}
          </p>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t("paragraph2")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                {/* Tarjetas Honeycomb (bg-[#0A1E27]/40 backdrop-blur-md border-[#2DBEED]/15 rounded-lg con hover #C9933B/50 y nodo de panal top-right) */}
                <div className="relative overflow-hidden bg-[#0A1E27]/40 backdrop-blur-md border border-[#2DBEED]/15 rounded-lg group transition-all duration-500 ease-out p-6 sm:p-8 hover:-translate-y-2 hover:bg-[#0A1E27]/60 hover:border-[#C9933B]/50 hover:shadow-[0_0_40px_rgba(201,147,59,0.15)]">
                  {/* Pseudo-elemento decorativo de nodo de panal de datos (top-right node) */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C9933B]/20 to-transparent border-t border-r border-[#C9933B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-12 h-12 bg-[#0E2A35]/80 border border-[#2DBEED]/30 flex items-center justify-center rounded-lg mb-6 text-[#2DBEED] transition-all duration-300 group-hover:border-[#C9933B]/60 group-hover:bg-[#C9933B]/10 group-hover:text-[#C9933B]">
                    {Icon && <Icon className="w-6 h-6" strokeWidth={1.75} />}
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
