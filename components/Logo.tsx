import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "full" | "icon" | "text" | "grayscale";

type LogoProps = {
  /** Variante del logotipo: "full" (completo), "icon" (solo icono), "text" (solo texto), "grayscale" (escala de grises) */
  variant?: LogoVariant;
  /** Ancho en px para aspect ratio */
  width?: number;
  /** Alto en px para aspect ratio */
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
  markOnly?: boolean;
};

const LOGO_CONFIG: Record<
  LogoVariant,
  { src: string; alt: string; defaultWidth: number; defaultHeight: number }
> = {
  full: {
    src: "/logos/FullLogo_Transparent.png",
    alt: "CÓMPUTO E IA DEL SUR",
    defaultWidth: 320,
    defaultHeight: 220,
  },
  icon: {
    src: "/logos/IconOnly_NoBuffer.png",
    alt: "CÓMPUTO E IA DEL SUR - Isotipo",
    defaultWidth: 80,
    defaultHeight: 80,
  },
  text: {
    src: "/logos/TextOnly_NoBuffer.png",
    alt: "CÓMPUTO E IA DEL SUR - Logotipo",
    defaultWidth: 200,
    defaultHeight: 50,
  },
  grayscale: {
    src: "/logos/Grayscale_NoBuffer.png",
    alt: "CÓMPUTO E IA DEL SUR - Monocromático",
    defaultWidth: 240,
    defaultHeight: 180,
  },
};

/**
 * Componente Logo: CÓMPUTO E IA DEL SUR.
 * Renderiza el logotipo recortado con quality={100}, priority={true} y proporciones nítidas h-16 md:h-20.
 */
export default function Logo({
  variant,
  markOnly = false,
  width,
  height,
  className = "",
  imageClassName = "",
  priority = true,
  quality = 100,
}: LogoProps) {
  const selectedVariant: LogoVariant = variant || (markOnly ? "icon" : "full");
  const config = LOGO_CONFIG[selectedVariant];

  const finalWidth = width ?? config.defaultWidth;
  const finalHeight = height ?? config.defaultHeight;

  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 bg-transparent transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="CÓMPUTO E IA DEL SUR - Inicio"
    >
      <Image
        src={config.src}
        alt={config.alt}
        width={finalWidth}
        height={finalHeight}
        priority={priority}
        quality={quality}
        className={`h-16 md:h-20 w-auto object-contain ${imageClassName}`}
      />
    </Link>
  );
}