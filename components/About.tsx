import { useTranslations } from "next-intl";
import { Lightbulb, HeartHandshake, Rocket, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type Value = {
  title: string;
  description: string;
};

// Structural, matches the order of About.values in messages/*.json.
const ICONS: LucideIcon[] = [Lightbulb, HeartHandshake, Rocket];

export default function About() {
  const t = useTranslations("About");
  const values = t.raw("values") as Value[];

  return (
    <section id="nosotros" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl mb-20">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            {t("title")}
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-4">{t("paragraph1")}</p>
          <p className="text-white/50 text-lg leading-relaxed">{t("paragraph2")}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 transition-colors duration-300 hover:border-orange-500/50">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/40">
                    {Icon && <Icon className="w-6 h-6" strokeWidth={1.75} />}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
