"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import Reveal from "./Reveal";

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
    <section id="contacto" className="py-28 md:py-32 px-6 bg-[#051015] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,42,53,1),rgba(5,16,21,1))] bg-swarm-grid border-t border-[#2DBEED]/20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-16 items-start">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            {/* Avatar Corporativo / Icono Compacto usando IconOnly_NoBuffer.png */}
            <Logo variant="icon" width={48} height={48} />
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2DBEED]/10 text-[#2DBEED] border border-[#2DBEED]/30 text-xs sm:text-sm tracking-widest uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-[#2DBEED] animate-pulse" />
              {t("eyebrow")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2DBEED] to-[#C9933B]">
            {t("titleLine1")}<br />{t("titleLine2")}
          </h2>
          <p className="text-slate-400 text-lg mb-8">{t("subtitle")}</p>

          <ul className="flex flex-col gap-3.5 mb-10">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-slate-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 shrink-0 text-[#2DBEED]"
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
            className="inline-flex items-center gap-4 rounded-lg border border-[#2DBEED]/20 bg-[#0A1E27]/40 backdrop-blur-md px-5 py-4 text-sm hover:border-[#C9933B]/70 hover:shadow-[0_10px_30px_rgba(45,190,237,0.15)] transition-all group"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0E2A35] border border-[#2DBEED]/30 text-[#2DBEED] shrink-0">
              <Mail className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-xs text-slate-400 font-mono tracking-widest uppercase">{t("directEmailLabel")}</span>
              <span className="block font-semibold text-slate-100 group-hover:text-[#2DBEED] transition-colors font-mono">
                {CONTACT_EMAIL}
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Formulario Entorno HUD con Inputs bg-[#0E2A35]/30 border-b-2 border-b-[#2DBEED]/20 focus:border-b-[#C9933B] */}
          <div className="relative bg-[#0A1E27]/40 backdrop-blur-md border border-[#2DBEED]/15 rounded-lg p-6 sm:p-8 transition-all duration-500 ease-out shadow-2xl group hover:border-[#C9933B]/50 hover:shadow-[0_0_40px_rgba(201,147,59,0.15)] overflow-hidden">
            {/* Pseudo-elemento decorativo de nodo de panal de datos (top-right node) */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C9933B]/20 to-transparent border-t border-r border-[#C9933B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {status === "sent" ? (
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-[#2DBEED] mb-2">{t("successTitle")}</p>
                <p className="text-slate-400 text-sm font-mono">{t("successBody")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full bg-[#0E2A35]/30 border-b-2 border-transparent border-b-[#2DBEED]/20 focus:border-b-[#C9933B] focus:bg-[#0E2A35]/60 focus:ring-0 rounded-none transition-all placeholder:text-[#2DBEED]/30 text-slate-100 text-sm font-mono p-3.5 sm:p-4"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full bg-[#0E2A35]/30 border-b-2 border-transparent border-b-[#2DBEED]/20 focus:border-b-[#C9933B] focus:bg-[#0E2A35]/60 focus:ring-0 rounded-none transition-all placeholder:text-[#2DBEED]/30 text-slate-100 text-sm font-mono p-3.5 sm:p-4"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder={t("subjectPlaceholder")}
                  required
                  className="w-full bg-[#0E2A35]/30 border-b-2 border-transparent border-b-[#2DBEED]/20 focus:border-b-[#C9933B] focus:bg-[#0E2A35]/60 focus:ring-0 rounded-none transition-all placeholder:text-[#2DBEED]/30 text-slate-100 text-sm font-mono p-3.5 sm:p-4"
                />
                <textarea
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  required
                  className="w-full bg-[#0E2A35]/30 border-b-2 border-transparent border-b-[#2DBEED]/20 focus:border-b-[#C9933B] focus:bg-[#0E2A35]/60 focus:ring-0 rounded-none transition-all placeholder:text-[#2DBEED]/30 text-slate-100 text-sm font-mono p-3.5 sm:p-4 resize-none"
                />

                {/* Botón Principal Swarm Primary */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-swarm-primary w-full py-4 text-center tracking-[0.2em] uppercase text-xs sm:text-sm font-bold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "sending" ? t("submitting") : t("submit")}
                </button>

                <p className="text-xs text-slate-400 text-center font-mono tracking-widest uppercase">
                  {t.rich("consent", {
                    link: (chunks) => (
                      <a href="/privacidad" className="underline text-[#2DBEED] hover:text-[#C9933B]">
                        {chunks}
                      </a>
                    ),
                  })}
                </p>

                {status === "error" && (
                  <p className="text-sm text-red-400 text-center font-mono tracking-widest uppercase">
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
