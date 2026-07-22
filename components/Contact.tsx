"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import Reveal from "./Reveal";

// TODO(owner): create a free Formspree form at https://formspree.io and
// swap in the real endpoint (Settings → Integration → your form ID).
// Until then submissions will fail gracefully and fall back to the
// mailto link shown next to the form.
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const CONTACT_EMAIL = "contacto@computoeiadelsur.com";

const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const trustPoints = t.raw("trustPoints") as string[];

  return (
    <section id="contacto" className="py-32 px-6 bg-zinc-950 border-t border-white/10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-16 items-start">
        {/* Context column — reduces "form anxiety" with a direct, human alternative */}
        <Reveal>
          <p className="text-cyan-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("titleLine1")}<br />{t("titleLine2")}
          </h2>
          <p className="text-white/50 text-lg mb-8">{t("subtitle")}</p>

          <ul className="flex flex-col gap-3 mb-10">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-white/60">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 shrink-0 text-cyan-500"
                >
                  <path
                    d="M16.667 5L7.5 14.167 3.333 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <a
            href={CONTACT_EMAIL_HREF}
            className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-4 text-sm hover:border-cyan-500/50 transition-colors group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500/10 text-cyan-400 shrink-0">
              <Mail className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-xs text-white/40">{t("directEmailLabel")}</span>
              <span className="block font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {CONTACT_EMAIL}
              </span>
            </span>
          </a>
        </Reveal>

        {/* Form column */}
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10">
            {status === "sent" ? (
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-white mb-2">{t("successTitle")}</p>
                <p className="text-white/50 text-sm">{t("successBody")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-colors text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-colors text-sm"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder={t("subjectPlaceholder")}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-colors text-sm"
                />
                <textarea
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-colors resize-none text-sm"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-glow w-full py-4 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t("submitting") : t("submit")}
                </button>

                <p className="text-xs text-white/40 text-center">
                  {t.rich("consent", {
                    link: (chunks) => (
                      <a href="/privacidad" className="underline hover:text-cyan-400">
                        {chunks}
                      </a>
                    ),
                  })}
                </p>

                {status === "error" && (
                  <p className="text-sm text-red-400 text-center">
                    {t.rich("errorMessage", {
                      email: (chunks) => (
                        <a href={CONTACT_EMAIL_HREF} className="underline">
                          {chunks}
                        </a>
                      ),
                    })}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
