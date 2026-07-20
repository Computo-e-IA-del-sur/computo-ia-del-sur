import Link from "next/link";

type LogoProps = {
  /** Oculta el texto y muestra solo el ícono — para espacios reducidos (favicons, móvil). */
  markOnly?: boolean;
  className?: string;
};

/**
 * Componente Server Estático.
 * Diseño: Hexágono Neuronal (Concepto 2) adaptado al tema naranja actual de la web.
 */
export default function Logo({ markOnly = false, className = "" }: LogoProps) {
  const gradientId = "hex-neural-orange";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="computoeiadelsur - inicio"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" /> {/* Naranja brillante */}
            <stop offset="100%" stopColor="#ea580c" /> {/* Naranja profundo */}
          </linearGradient>
        </defs>

        {/* Perímetro del Hexágono */}
        <polygon
          points="20,4 34,12 34,28 20,36 6,28 6,12"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Conexiones Neuronales Internas (Líneas cruzadas) */}
        <line x1="6" y1="12" x2="34" y2="28" stroke={`url(#${gradientId})`} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="6" y1="28" x2="34" y2="12" stroke={`url(#${gradientId})`} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="20" y1="4" x2="20" y2="36" stroke={`url(#${gradientId})`} strokeWidth="1" strokeOpacity="0.4" />

        {/* Triángulo central para dar profundidad geométrica */}
        <polygon
          points="20,12 27,24 13,24"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Nodos Exteriores (Vértices) */}
        <circle cx="20" cy="4" r="2.5" fill={`url(#${gradientId})`} />
        <circle cx="34" cy="12" r="2.5" fill={`url(#${gradientId})`} />
        <circle cx="34" cy="28" r="2.5" fill={`url(#${gradientId})`} />
        <circle cx="20" cy="36" r="2.5" fill={`url(#${gradientId})`} />
        <circle cx="6" cy="28" r="2.5" fill={`url(#${gradientId})`} />
        <circle cx="6" cy="12" r="2.5" fill={`url(#${gradientId})`} />

        {/* Nodo Central (Núcleo) */}
        <circle cx="20" cy="20" r="3.5" fill={`url(#${gradientId})`} />
      </svg>

      {!markOnly && (
        <span className="leading-tight">
          {/* Texto en minúsculas como en el Concepto 2 */}
          <span className="block font-semibold text-[19px] tracking-tight text-white">
            computo<span className="text-[#fb923c]">eiadelsur</span>
          </span>
        </span>
      )}
    </Link>
  );
}
