import Link from "next/link";

type LogoProps = {
  /** Oculta el texto y muestra solo el ícono — para espacios reducidos (favicons, móvil). */
  markOnly?: boolean;
  className?: string;
  light?: boolean;
};

/**
 * Componente Logo: Computo e IA del Sur.
 * Concepto: "El Vector del Sur" — Convergencia entre dirección, tecnología y redes inteligentes.
 */
export default function Logo({ markOnly = false, className = "", light = false }: LogoProps) {
  const gradientId = "brand-vector-gradient";
  const glowFilterId = "brand-glow-filter";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Computo e IA del Sur - inicio">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            {/* Gradiente principal en tonos naranjas premium */}
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Marco de Brújula Tecnológica (Vector Sur) - rgba actualizado a tono naranja oscuro (234, 88, 12) para modo claro */}
        <path
          d="M20 2L37 16L20 38L3 16Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={light ? "rgba(234, 88, 12, 0.05)" : "rgba(255, 255, 255, 0.03)"}
        />

        {/* Conexiones Neuronales Secundarias */}
        <path
          d="M20 2V38M3 16H37"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Nodos de Procesamiento (Naranja sólido) */}
        <circle cx="20" cy="2" r="2" fill="#F97316" />
        <circle cx="37" cy="16" r="2" fill="#F97316" />
        <circle cx="3" cy="16" r="2" fill="#F97316" />

        {/* Nodo Sur (Énfasis en Dirección con Glow Naranja) */}
        <circle cx="20" cy="38" r="3" fill="#EA580C" filter={`url(#${glowFilterId})`} />
        
        {/* Cambiado a blanco para generar mayor contraste sobre el naranja */}
        <circle cx="20" cy="38" r="1.2" fill="#FFFFFF" />

        {/* Núcleo de IA Central */}
        <circle cx="20" cy="16" r="4.5" fill={`url(#${gradientId})`} filter={`url(#${glowFilterId})`} />
        <path d="M18 16L20 14L22 16L20 18Z" fill="white" />
      </svg>

      {!markOnly && (
        <span className="leading-tight select-none">
          <span className={`block font-semibold text-[20px] tracking-tight ${light ? "text-slate-900" : "text-white"}`}>
            Computo e IA <span className="text-orange-500">del Sur</span>
          </span>
        </span>
      )}
    </Link>
  );
}