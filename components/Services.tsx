import { useTranslations } from "next-intl";

type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

export default function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="servicios" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-gray-100 rounded-2xl overflow-hidden">
          {items.map((s, i) => (
            <div
              key={s.title}
              className={`p-10 ${i < items.length - 1 ? "md:border-r border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
            >
              <span className="text-4xl font-bold text-gray-100 block mb-8">
                {s.number}
              </span>
              <h3 className="text-xl font-bold text-black mb-4">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
