import { useTranslations } from "next-intl";
import SpotlightCard from "./SpotlightCard";

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
// TODO: replace with the real "Mi Tren Ligero" link (Play Store / App
// Store / web app). Until then it points at #contacto instead of a dead
// "#" link, so it's still a useful click rather than a no-op.
const projectLinks: Record<number, string> = {
  0: "#contacto",
};

export default function Portfolio() {
  const t = useTranslations("Portfolio");
  const projects = t.raw("projects") as Project[];

  return (
    <section id="portafolio" className="py-32 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const href = projectLinks[i] ?? "#contacto";
            const isExternal = href.startsWith("http");
            return (
            <SpotlightCard
              key={p.title}
              href={href}
              external={isExternal}
              ariaLabel={isExternal ? `${p.title} — ${t("openLabel")}` : p.title}
              className="rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/40"
            >
              <div className="h-52 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-6xl">
                {p.emoji}
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
            );
          })}

          <div className="rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center min-h-64 text-center p-8 hover:border-orange-500/30 transition-colors">
            <div>
              <p className="text-white/20 font-semibold text-lg">{t("empty.title")}</p>
              <p className="text-white/20 text-sm mt-2">{t("empty.subtitle")}</p>
              <a href="#contacto" className="inline-block mt-4 text-orange-500 text-sm hover:text-orange-400">
                {t("empty.cta")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
