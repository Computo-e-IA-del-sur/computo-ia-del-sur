export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        <span className="inline-block px-3 py-1 rounded-full border border-orange-500/40 text-orange-400 text-xs font-medium tracking-widest uppercase mb-8">
          Tecnología · Inteligencia Artificial · Sur de México
        </span>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
          Construimos el<br />
          futuro digital<br />
          <span className="text-orange-500">de tu empresa.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed">
          Somos un equipo especializado en Inteligencia Artificial, aplicaciones
          móviles y sistemas web. Convertimos ideas en productos reales.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#servicios"
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-center"
          >
            Ver servicios
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-center"
          >
            Hablar con nosotros →
          </a>
        </div>
      </div>
    </section>
  );
}
