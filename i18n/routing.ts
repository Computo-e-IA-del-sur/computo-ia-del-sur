import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "zh"],
  defaultLocale: "es",
  // Required for static export: there is no proxy/middleware available
  // to negotiate the locale at request time, so every URL must always
  // carry an explicit locale prefix (/es, /en, /zh).
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
