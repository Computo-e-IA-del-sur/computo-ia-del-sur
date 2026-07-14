import { useTranslations } from "next-intl";
import { BrainCircuit, Smartphone, Globe, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

// Icons are structural (order matches Services.items in messages/*.json),
// not translated content, so they live here rather than in the JSON.
const ICONS: LucideIcon[] = [BrainCircuit, Smartphone, Globe];

export default function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="servicios" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-10 overflow-hidden transition-colors duration-300 hover:border-orange-500/50">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-6 -right-2 text-[8rem] font-bold leading-none text-white/[0.04]"
                  >
                    {s.number}
                  </span>

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/40">
                      {Icon && <Icon className="w-6 h-6" strokeWidth={1.75} />}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">
                      {s.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
