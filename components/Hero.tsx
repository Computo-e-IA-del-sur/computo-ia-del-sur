import Image from "next/image";
import { useTranslations } from "next-intl";
import HeroBackground from "./HeroBackground";
import Logo from "./Logo";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen bg-[#051015] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,42,53,1),rgba(5,16,21,1))] bg-swarm-grid text-[#E2E8F0] flex items-center px-6 overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      {/* Dynamic Canvas network */}
      <HeroBackground />

      {/* Marca de agua de la Abeja Gigante del logotipo detrás de la terminal */}
      <Image
        src="/logos/IconOnly_NoBuffer.png"
        alt=""
        width={600}
        height={600}
        priority
        quality={100}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-auto opacity-5 z-[-1] pointer-events-none blur-[2px] select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Grid de 2 Columnas amplio con gap-12 lg:gap-20 para maxima respiracion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna Izquierda: Mensaje Principal con Flexbox amplio */}
          <div className="flex flex-col items-start justify-center gap-6 lg:gap-8">
            
            {/* Pastilla Superior (Badge) sin roturas (w-fit whitespace-nowrap) */}
            <span className="inline-flex w-fit items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2DBEED]/10 text-[#2DBEED] border border-[#2DBEED]/30 text-xs sm:text-sm tracking-widest uppercase font-mono whitespace-nowrap shadow-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#2DBEED] animate-pulse" />
              {t("eyebrow")}
            </span>

            {/* Título Principal con leading-tight y alto impacto */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance max-w-2xl">
              <span className="text-slate-100">Construimos el </span>
              <span className="text-[#2DBEED]">futuro digital</span><br />
              <span className="text-[#C9933B]">de tu empresa.</span>
            </h1>

            {/* Párrafo descriptivo con max-w-lg, text-slate-300 y leading-relaxed para alta legibilidad */}
            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
              {t("subtitle")}
            </p>

            {/* Botones de Acción con whitespace-nowrap y flex-row con gap-4 sm:gap-6 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto pt-2">
              {/* Primary CTA (Ver Servicios) */}
              <a
                href="#servicios"
                className="btn-swarm-primary whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-center tracking-[0.2em] uppercase text-xs sm:text-sm font-bold shadow-lg"
              >
                {t("ctaPrimary")}
              </a>

              {/* Secondary CTA (Contacto) */}
              <a
                href="#contacto"
                className="btn-swarm-secondary whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-center tracking-[0.15em] uppercase text-xs sm:text-sm font-semibold"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Columna Derecha: Terminal "Queen Node" Descomprimida (p-8 sm:p-10) */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Esferas de luz sutiles de fondo (Aura Cyan & Gold) */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#2DBEED]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C9933B]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Contenedor Terminal Queen Node con p-8 sm:p-10 */}
            <div className="group relative rounded-xl border border-[#2DBEED]/30 bg-[#0A1E27]/40 backdrop-blur-md p-8 sm:p-10 shadow-[0_20px_50px_rgba(14,42,53,0.8)] overflow-hidden transition-all duration-500">
              {/* Pseudo-elemento decorativo de nodo de panal top-right */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C9933B]/20 to-transparent border-t border-r border-[#C9933B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Encabezado Estilo Terminal UNIX con Puntos de Control */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#2DBEED]/15">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#C9933B]" />
                  <span className="w-3 h-3 rounded-sm bg-[#2DBEED]" />
                  <span className="w-3 h-3 rounded-sm bg-[#0E2A35] border border-[#2DBEED]/20" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#2DBEED] uppercase whitespace-nowrap">
                  System Engine v2.4 • Queen Node Active
                </span>
              </div>

              {/* Contenido Visual Interactivo con space-y-6 */}
              <div className="space-y-6">
                {/* Ficha 1: Estatus de Modelo IA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 rounded-lg bg-[#0E2A35]/60 border border-[#2DBEED]/20 gap-4">
                  <div className="flex items-center gap-4">
                    <Logo variant="icon" width={44} height={44} priority quality={100} />
                    <div>
                      <p className="text-sm font-bold text-white">Inteligencia Artificial</p>
                      <p className="text-xs text-[#2DBEED] font-mono tracking-widest uppercase">Modelos Neuronales & Cloud</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#C9933B]/20 text-[#C9933B] border border-[#C9933B]/40 whitespace-nowrap">
                    99.4% ACCURACY
                  </span>
                </div>

                {/* Ficha 2: Métricas de Rendimiento */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-6 rounded-lg bg-[#0E2A35]/60 border border-[#2DBEED]/20">
                    <p className="text-xs text-[#94A3B8] mb-1.5 font-mono tracking-widest uppercase">Desarrollo Web & Apps</p>
                    <p className="text-xl font-extrabold text-[#2DBEED]">Multi-Plataforma</p>
                  </div>
                  <div className="p-5 sm:p-6 rounded-lg bg-[#0E2A35]/60 border border-[#2DBEED]/20">
                    <p className="text-xs text-[#94A3B8] mb-1.5 font-mono tracking-widest uppercase">Región Cobertura</p>
                    <p className="text-xl font-extrabold text-[#C9933B]">Sur de México</p>
                  </div>
                </div>

                {/* Ficha 3: Logs de Procesamiento con Parpadeo sutil animate-pulse */}
                <div className="p-5 sm:p-6 rounded-lg bg-[#06171b]/80 border border-[#2DBEED]/20 font-mono text-xs tracking-widest uppercase space-y-2.5">
                  <p className="text-[#2DBEED]">&gt; INITIALIZING AI ARCHITECTURE...</p>
                  <p className="text-[#2DBEED]">&gt; CONNECTING API & MOBILE NODES: <span className="text-[#C9933B] font-bold">READY</span></p>
                  <p className="text-[#2DBEED]">&gt; <span className="animate-pulse text-[#C9933B] font-mono font-bold">STATUS: COMPUTO E IA DEL SUR ONLINE</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
