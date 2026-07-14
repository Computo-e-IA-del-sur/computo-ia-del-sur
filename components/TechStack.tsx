import { useTranslations } from "next-intl";

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Expo",
];

/**
 * Honest social proof: the real stack we build with, not fabricated client
 * logos. Once there are real client/press logos to show, swap this strip
 * for those — same slot, same treatment (see accessibility/CRO notes).
 */
export default function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <div className="bg-zinc-950 border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-white/30 shrink-0">
          {t("heading")}
        </p>
        <ul className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
          {STACK.map((name) => (
            <li
              key={name}
              className="text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
