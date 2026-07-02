const values = [
  { title: "Innovación", desc: "Usamos tecnología de vanguardia para resolver problemas reales." },
  { title: "Compromiso", desc: "Acompañamos al cliente desde la idea hasta el lanzamiento." },
  { title: "Agilidad", desc: "Entregas rápidas sin sacrificar calidad ni seguridad." },
];

export default function About() {
  return (
    <section id="nosotros" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
              Nosotros
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Somos un equipo de desarrolladores y especialistas en Inteligencia
              Artificial con sede en el sur de México. Creemos que la tecnología
              debe ser accesible para empresas de todos los tamaños.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Nuestro objetivo es construir productos digitales que generen
              impacto real: desde apps móviles hasta sistemas de IA que
              automatizan y optimizan procesos de negocio.
            </p>
          </div>

          <div className="flex flex-col gap-8 pt-14">
            {values.map((v, i) => (
              <div key={v.title} className="flex gap-6 items-start">
                <span className="text-orange-500 font-bold text-sm mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-black mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
