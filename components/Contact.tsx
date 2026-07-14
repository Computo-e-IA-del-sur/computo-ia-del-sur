"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

// TODO(owner): create a free Formspree form at https://formspree.io and
// swap in the real endpoint (Settings → Integration → your form ID).
// Until then submissions will fail gracefully and fall back to the
// mailto link shown next to the form.
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const CONTACT_EMAIL = "hola@computoeiadelsur.com";

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
    <section id="contacto" className="py-32 px-6 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-16 items-start">
        {/* Context column — reduces "form anxiety" with a direct, human alternative */}
        <div>
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
            {t("titleLine1")}<br />{t("titleLine2")}
          </h2>
          <p className="text-gray-600 text-lg mb-8">{t("subtitle")}</p>

          <ul className="flex flex-col gap-3 mb-10">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-gray-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 shrink-0 text-orange-500"
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
            className="inline-flex items-center gap-3 rounded-xl border border-gray-200 px-5 py-4 text-sm hover:border-orange-500 transition-colors group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-50 text-orange-500 shrink-0">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M3.75 7l8.25 6 8.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-xs text-gray-600">{t("directEmailLabel")}</span>
              <span className="block font-semibold text-black group-hover:text-orange-600 transition-colors">
                {CONTACT_EMAIL}
              </span>
            </span>
          </a>
        </div>

        {/* Form column */}
        <div className="rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] p-8 sm:p-10">
          {status === "sent" ? (
            <div className="text-center py-8">
              <p className="text-2xl font-bold text-black mb-2">{t("successTitle")}</p>
              <p className="text-gray-600 text-sm">{t("successBody")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t("namePlaceholder")}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-colors text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-colors text-sm"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={t("subjectPlaceholder")}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-colors text-sm"
              />
              <textarea
                name="message"
                placeholder={t("messagePlaceholder")}
                rows={5}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-colors resize-none text-sm"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t("submitting") : t("submit")}
              </button>

              <p className="text-xs text-gray-600 text-center">
                {t.rich("consent", {
                  link: (chunks) => (
                    <a href="/privacidad" className="underline hover:text-orange-500">
                      {chunks}
                    </a>
                  ),
                })}
              </p>

              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
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
      </div>
    </section>
  );
}
