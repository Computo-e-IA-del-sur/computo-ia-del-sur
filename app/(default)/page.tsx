import { redirect } from "next/navigation";

// The root `/` has no locale of its own — send visitors to the
// default locale. This page (and its layout) sit outside the
// `[locale]` segment on purpose, so this redirect works even
// though static export has no proxy/middleware to negotiate locales.
export default function RootPage() {
  redirect("/es");
}
