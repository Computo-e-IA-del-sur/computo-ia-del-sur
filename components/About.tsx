import { useTranslations } from "next-intl";

type Value = {
  title: string;
  description: string;
};

export default function About() {
  const t = useTranslations("About");
  const values = t.raw("values") as Value[];

  return (
    <section id="nosotros" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8">
              {t("title")}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">{t("paragraph1")}</p>
            <p className="text-gray-500 leading-relaxed">{t("paragraph2")}</p>
          </div>

          <div className="flex flex-col gap-8 pt-14">
            {values.map((v, i) => (
              <div key={v.title} className="flex gap-6 items-start">
                <span className="text-orange-500 font-bold text-sm mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-black mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
