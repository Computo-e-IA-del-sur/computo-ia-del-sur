"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ChangeEvent } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  zh: "中文",
};

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={handleChange}
        aria-label={t("label")}
        className="bg-transparent border border-white/20 rounded-full px-3 py-1.5 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors cursor-pointer [&>option]:text-black"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
