import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-black text-white/30 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-white">{t("brand")}</p>
        <p>{t("rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
