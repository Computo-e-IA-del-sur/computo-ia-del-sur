"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="py-32 px-6 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="mb-14">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
            {t("titleLine1")}<br />{t("titleLine2")}
          </h2>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        {sent ? (
          <div className="border border-gray-100 rounded-2xl p-12 text-center">
            <p className="text-2xl font-bold text-black mb-2">{t("successTitle")}</p>
            <p className="text-gray-500 text-sm">{t("successBody")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("namePlaceholder")}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <input
              type="text"
              placeholder={t("subjectPlaceholder")}
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm"
            />
            <textarea
              placeholder={t("messagePlaceholder")}
              rows={5}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none text-sm"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-black text-white font-semibold hover:bg-orange-500 transition-colors"
            >
              {t("submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
