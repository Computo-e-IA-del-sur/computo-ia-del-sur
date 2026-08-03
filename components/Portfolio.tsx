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

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.computoeiadelsur.reportestrenligero";

const projectLinks: Record<number, string> = {
  0: PLAY_STORE_URL,
};

const playStoreProjects = new Set<number>([0]);

export default function Portfolio() {
  const t = useTranslations("Portfolio");
  const projects = t.raw("projects") as Project[];

  return (
    <section id="portafolio" className="py-28 md:py-32 px-6 bg-[#051015] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,42,53,1),rgba(5,16,21,1))] bg-swarm-grid text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2DBEED]/10 text-[#2DBEED] border border-[#2DBEED]/30 text-xs sm:text-sm tracking-widest uppercase mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2DBEED] animate-pulse" />
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2DBEED] to-[#C9933B]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const href = projectLinks[i] ?? "#contacto";
            const isExternal = href.startsWith("http");
            const onPlayStore = playStoreProjects.has(i);
            return (
              <Reveal key={p.title} delay={i * 0.1} className="group relative">
                {/* Glow en cian marca detrás de la tarjeta al hacer hover */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2rem] bg-[#2DBEED]/0 blur-2xl transition-all duration-500 -z-10 group-hover:bg-[#2DBEED]/20"
                />
                <SpotlightCard
                  href={href}
                  external={isExternal}
                  ariaLabel={isExternal ? `${p.title} — ${t("openLabel")}` : p.title}
                  className="relative overflow-hidden bg-[#0A1E27]/40 backdrop-blur-md border border-[#2DBEED]/15 rounded-lg group transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#0A1E27]/60 hover:border-[#C9933B]/50 hover:shadow-[0_0_40px_rgba(201,147,59,0.15)]"
                >
                  {/* Pseudo-elemento decorativo de nodo de panal de datos (top-right node) */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C9933B]/20 to-transparent border-t border-r border-[#C9933B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-[#0E2A35] to-[#0A1E27] overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2DBEED]/10 to-transparent" />
                    <div className="relative w-28 h-56 rounded-2xl border-4 border-[#2DBEED]/30 bg-[#0E2A35] shadow-2xl flex flex-col items-center pt-3 transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="w-10 h-1.5 rounded-full bg-[#2DBEED]/40 mb-4" />
                      {onPlayStore ? (
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0A1E27] to-[#0E2A35] ring-1 ring-[#2DBEED]/30 shadow-lg flex items-center justify-center">
                          <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" aria-hidden="true">
                            <path
                              d="M15 7h18a6 6 0 0 1 6 6v21a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V13a6 6 0 0 1 6-6Z"
                              fill="#E2E8F0"
                            />
                            <rect x="14" y="12" width="20" height="10" rx="3" fill="#2DBEED" />
                            <circle cx="17" cy="29" r="2.4" fill="#2DBEED" />
                            <circle cx="31" cy="29" r="2.4" fill="#2DBEED" />
                            <rect x="15" y="34" width="18" height="3" rx="1.5" fill="#0E2A35" />
                            <path
                              d="M16 38l-3 4M32 38l3 4"
                              stroke="#E2E8F0"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <span className="text-5xl">{p.emoji}</span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2DBEED]/10 text-[#2DBEED] border border-[#2DBEED]/20 font-mono tracking-widest uppercase">
                        {p.tag}
                      </span>
                      {onPlayStore ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#C9933B]/15 text-[#C9933B] border border-[#C9933B]/30 font-mono tracking-widest uppercase">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#C9933B] opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9933B]" />
                          </span>
                          {p.status}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">{p.status}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-slate-100">{p.title}</h3>
                      {isExternal && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-4 h-4 text-[#2DBEED] -translate-y-2 translate-x-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
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
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-[#0E2A35] text-slate-300 border border-[#2DBEED]/20 font-mono tracking-widest uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {onPlayStore && (
                      <span className="mt-6 btn-swarm-primary px-6 py-3 text-center tracking-[0.2em] uppercase text-xs font-mono inline-flex items-center justify-center gap-2 shadow-lg">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-4 h-4"
                        >
                          <path
                            d="M12 3v11m0 0l-4-4m4 4l4-4M5 21h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {t("downloadPlayStore")}
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          <Reveal delay={projects.length * 0.1}>
            <div className="animate-pulse bg-[#0A1E27]/40 backdrop-blur-md border-2 border-dashed border-[#2DBEED]/20 rounded-lg flex items-center justify-center min-h-64 text-center p-8 hover:border-[#C9933B]/50 transition-colors">
              <div>
                <p className="text-slate-300 font-semibold text-lg">{t("empty.title")}</p>
                <p className="text-slate-400 text-sm mt-2">{t("empty.subtitle")}</p>
                <a href="#contacto" className="inline-block mt-4 text-[#2DBEED] text-sm font-medium font-mono tracking-widest uppercase hover:text-[#C9933B]">
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
