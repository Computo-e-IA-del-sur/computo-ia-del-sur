import { useTranslations } from "next-intl";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";

type Project = {
  tag: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  emoji: string;
};

// Structural data (URLs aren't translatable content, so it lives outside
// messages/*.json). Keyed by project index — matches `Portfolio.projects`
// in each locale file.
// TODO: once "Mi Tren Ligero" is published on Google Play, swap this to:
//   0: "https://play.google.com/store/apps/details?id=com.computoeiadelsur.reportestrenligero"
// (package ID confirmed from the .aab; as of 2026-07-14 that URL still
// 404s — the app isn't live yet). Meanwhile this points at the EAS
// internal-distribution build page, which lets Android visitors install
// the APK directly. NOTE: this URL is tied to one specific build
// (f1068256-...) — generating a new EAS build later gets a new URL, so
// this needs updating each time until the app ships to Play Store.
const projectLinks: Record<number, string> = {
  0: "https://expo.dev/accounts/arturo.vr/projects/mi-tren-ligero/builds/f1068256-abe6-479f-9d04-9260c1fb9099",
};

export default function Portfolio() {
  const t = useTranslations("Portfolio");
  const projects = t.raw("projects") as Project[];

  return (
    <section id="portafolio" className="py-32 px-6 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const href = projectLinks[i] ?? "#contacto";
            const isExternal = href.startsWith("http");
            return (
              <Reveal key={p.title} delay={i * 0.1} className="group relative">
                {/* radial glow behind the whole card, blooms on hover */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2rem] bg-orange-500/0 blur-2xl transition-all duration-500 -z-10 group-hover:bg-orange-500/20"
                />
                <SpotlightCard
                  href={href}
                  external={isExternal}
                  ariaLabel={isExternal ? `${p.title} — ${t("openLabel")}` : p.title}
                  className="rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/40"
                >
                  {/* smartphone-outline mockup instead of a flat emoji tile */}
                  <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                    <div className="relative w-28 h-56 rounded-[1.75rem] border-4 border-zinc-700 bg-zinc-900 shadow-2xl flex flex-col items-center pt-3 transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="w-10 h-1.5 rounded-full bg-zinc-700 mb-4" />
                      <span className="text-5xl">{p.emoji}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {p.tag}
                      </span>
                      <span className="text-xs text-white/30">{p.status}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                      {isExternal && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-4 h-4 text-orange-400 -translate-y-2 translate-x-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                        >
                          <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          <Reveal delay={projects.length * 0.1}>
            <div className="animate-pulse rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center min-h-64 text-center p-8 hover:border-orange-500/40 transition-colors">
              <div>
                <p className="text-white/20 font-semibold text-lg">{t("empty.title")}</p>
                <p className="text-white/20 text-sm mt-2">{t("empty.subtitle")}</p>
                <a href="#contacto" className="inline-block mt-4 text-orange-500 text-sm hover:text-orange-400">
                  {t("empty.cta")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
